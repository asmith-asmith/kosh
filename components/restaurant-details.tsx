import { useState, useEffect } from "react"

import Image from 'next/image'
import { Heart, ImageIcon, MapPin, Clock, Phone, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import pic from 'static/filler.png'

// Define the type for restaurant data
interface Restaurant {
  name: string;
  distinction?: string;
  cuisine?: string;
  price?: string;
  location?: string;
  description?: string;
  address?: string;
  hours?: string;
  phone?: string;
  website?: string;
  images?: string[];
}

export default function RestaurantDetails({ id }: { id: string }) {
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
    useEffect(() => {
        const fetchRestaurant = async () => {
          const token = localStorage.getItem("token")
          const response = await fetch(`/api/restaurants/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          const data = await response.json()
          setRestaurant(data)
        }
        fetchRestaurant()
    }, [id])
    
    if (!restaurant) return <div>Loading...</div>
  
    return (
        <div className="max-w-4xl mx-auto p-4">
        <div className="relative aspect-[16/9] mb-6">
            <Image
            src={'/static/wae93m1afid41.webp'}
            alt={restaurant.name}
            fill
            className="object-cover rounded-lg"
            />
            <div className="absolute top-4 right-4 flex gap-2">
            <Button size="icon" variant="secondary" className="rounded-full bg-white">
                <ImageIcon className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full bg-white">
                <Heart className="h-4 w-4" />
            </Button>
            </div>
        </div>

        <div className="space-y-6">
            <div>
            <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
            {restaurant.distinction && (
                <div className="text-red-600 font-semibold mb-2">
                {restaurant.distinction}
                </div>
            )}
            <div className="flex items-center gap-4 text-gray-600">
                <span>{restaurant.cuisine}</span>
                <span>•</span>
                <span>{restaurant.price}</span>
                <span>•</span>
                <span>{restaurant.location}</span>
            </div>
            </div>

            {restaurant.description && (
            <p className="text-gray-700 leading-relaxed">
                {restaurant.description}
            </p>
            )}

            <Card>
            <CardContent className="p-6 space-y-4">
                {restaurant.address && (
                <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span>{restaurant.address}</span>
                </div>
                )}
                {restaurant.hours && (
                <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <span>{restaurant.hours}</span>
                </div>
                )}
                {restaurant.phone && (
                <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <span>{restaurant.phone}</span>
                </div>
                )}
                {restaurant.website && (
                <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-gray-500" />
                    <a href={restaurant.website} target="_blank" rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline">
                    Visit Website
                    </a>
                </div>
                )}
            </CardContent>
            </Card>

            {restaurant.images && restaurant.images.length > 0 && (
            <div>
                <h2 className="text-xl font-semibold mb-4">Photo Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {restaurant.images.map((image, index) => (
                    <div key={index} className="relative aspect-square">
                    <Image
                        src={image || '/filler.png'}
                        alt={`${restaurant.name} photo ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                    />
                    </div>
                ))}
                </div>
            </div>
            )}
        </div>
        </div>
    )
} 