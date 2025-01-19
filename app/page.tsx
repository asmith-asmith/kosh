'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Header } from '@/components/header'
import { SearchFilters } from '@/components/search-filters'
import { RestaurantCard } from '@/components/restaurant-card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { restaurantService, Restaurant } from '@/services/restaurantService'



export default function Page() {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('name')
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const itemsPerPage = 6

  useEffect(() => {
    const loadRestaurants = async () => {
      console.log("heree loadRestaurants");
      const data = await restaurantService.fetchRestaurants()
      console.log("heree loadRestaurants  ", data);
      setRestaurants(data)
    }
    loadRestaurants()
  }, [])

  const sortedRestaurants = [...restaurants].sort((a, b) => {
    if (sortBy === 'name') {
      return (a as any).name.localeCompare((b as any).name)
    } else if (sortBy === 'price') {
      return (a as any).price.length - (b as any).price.length
    }
    return 0
  })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentRestaurants = sortedRestaurants.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(restaurants.length / itemsPerPage)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <SearchFilters />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">
            New York City and surroundings: {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, restaurants.length)} of {restaurants.length} restaurants
          </h1>
          <div className="flex items-center gap-4">
            <Select onValueChange={(value) => setSortBy(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                ←
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                →
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.name}
              {...restaurant}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

