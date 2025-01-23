import { supabase } from '@/lib/supabase'

export interface Restaurant {
  name: string
  location: string
  cuisine: string
  price: string
  imageUrl: string
  distinction?: string
}

export const restaurantService = {
  
  async fetchRestaurants(): Promise<Restaurant[]> {

    const { data, error } = await supabase
      .from('restaurants_1')
      .select('*')
      

    if (error) {
      console.error('Error fetching restaurants:', error)
      console.log("Error");
      return []
    }

    return data || []
  },
  
  fetchRestaurantById: async (id: string) => {
    const { data, error } = await supabase
      .from('restaurants_1')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching restaurant:', error)
      return null
    }

    return data
  }
} 


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