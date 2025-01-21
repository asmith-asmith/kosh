"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

// Define the type for a restaurant
interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  featured: boolean;
}

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
      console.log("data ", data);
      setRestaurants(data.filter((restaurant) => restaurant.featured))
    }
    fetchRestaurants()
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mt-8 mb-4">Featured Restaurants</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {restaurants.map((restaurant) => (
          <Link key={restaurant.id} href={`/restaurants/${restaurant.id}`}>
            <div className="border p-4 rounded hover:shadow-lg transition">
              <h3 className="font-bold">{restaurant.name}</h3>
              <p>{restaurant.cuisine}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}