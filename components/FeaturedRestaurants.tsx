"use client"

import { useState, useEffect } from "react"
import { RestaurantCard } from '@/components/RestaurantCard'
import { Restaurant } from '@/types/supabase'

export default function FeaturedRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  useEffect(() => {
    const fetchRestaurants = async () => {
      // const token = localStorage.getItem("token")
      const response = await fetch("/api/restaurants", {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      const data: Restaurant[] = await response.json()
      setRestaurants(data.filter((restaurant) => restaurant).slice(0, 3))
    }
    fetchRestaurants()
  }, [])

  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mt-8 mb-4">Featured Restaurants</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.name}
            {...restaurant}
          />
        ))}
      </div>
    </main>
  )
}