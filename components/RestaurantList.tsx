'use client'

import { useState, useEffect } from 'react'
import { RestaurantCard } from '@/components/RestaurantCard'
import { Pagination } from '@/components/pagination'
import { SortSelect } from '@/components/sort-select'
import { Restaurant } from '@/services/restaurantService'
import { SearchFilters } from './SearchFilters'

export function RestaurantList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('name')
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const itemsPerPage = 6

  useEffect(() => {
    const loadRestaurants = async () => {
      const response = await fetch('/api/restaurants')
      const data = await response.json()
      console.log("data ", data)
      setRestaurants(data)
    }
    loadRestaurants()
  }, [])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const totalPages = Math.ceil(restaurants.length / itemsPerPage)

  const sortedRestaurants = [...restaurants].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    if (sortBy === 'rating') return (b.distinction?.length || 0) - (a.distinction?.length || 0)
    if (sortBy === 'reviews') return b.name.localeCompare(a.name) // Placeholder, replace with actual review count when available
    return 0
  })

  const currentRestaurants = sortedRestaurants.slice(indexOfFirstItem, indexOfLastItem)

  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <SearchFilters />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl">
              {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, restaurants.length)} of {restaurants.length} restaurants
          </h1>
          <div className="flex items-center gap-4">
            <SortSelect value={sortBy} onValueChange={setSortBy} />
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.name}
              image_url={restaurant.image_url}
              id={restaurant.name.toLowerCase().replace(/\s+/g, '-')}
              {...restaurant}
            />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>
    </>
  )
} 