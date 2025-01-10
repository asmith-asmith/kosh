'use client'

import { useState } from 'react'
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

const allRestaurants = [
  {
    name: "Runner & Stone",
    location: "Brooklyn, USA",
    cuisine: "Contemporary",
    price: "$$",
    imageUrl: "/placeholder.svg",
  },
  {
    name: "Shalom Japan",
    location: "Brooklyn, USA",
    cuisine: "Fusion",
    price: "$$",
    imageUrl: "/placeholder.svg",
    distinction: "Kosh Star",
  },
  {
    name: "Le Bernardin",
    location: "Manhattan, USA",
    cuisine: "Seafood",
    price: "$$$$",
    imageUrl: "/placeholder.svg",
    distinction: "Three Kosh Stars",
  },
  {
    name: "Eleven Madison Park",
    location: "Manhattan, USA",
    cuisine: "American",
    price: "$$$$",
    imageUrl: "/placeholder.svg",
    distinction: "Three Kosh Stars",
  },
  {
    name: "Masa",
    location: "Manhattan, USA",
    cuisine: "Japanese",
    price: "$$$$",
    imageUrl: "/placeholder.svg",
    distinction: "Three Kosh Stars",
  },
  {
    name: "Per Se",
    location: "Manhattan, USA",
    cuisine: "French",
    price: "$$$$",
    imageUrl: "/placeholder.svg",
    distinction: "Three Kosh Stars",
  },
  {
    name: "Blue Hill at Stone Barns",
    location: "Pocantico Hills, USA",
    cuisine: "American",
    price: "$$$",
    imageUrl: "/placeholder.svg",
    distinction: "Two Kosh Stars",
  },
  {
    name: "Daniel",
    location: "Manhattan, USA",
    cuisine: "French",
    price: "$$$$",
    imageUrl: "/placeholder.svg",
    distinction: "Two Kosh Stars",
  },
]

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('name')
  const itemsPerPage = 6

  const sortedRestaurants = [...allRestaurants].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name)
    } else if (sortBy === 'price') {
      return a.price.length - b.price.length
    }
    return 0
  })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentRestaurants = sortedRestaurants.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(allRestaurants.length / itemsPerPage)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <SearchFilters />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">
            New York City and surroundings: {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, allRestaurants.length)} of {allRestaurants.length} restaurants
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

