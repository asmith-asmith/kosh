"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, MapPin, Phone, Globe, Clock, Share2, Heart, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface Restaurant {
  id: string
  name: string
  distinction?: string
  cuisine?: string
  price?: string
  image_url?: string
  location?: string
  description?: string
  address?: string
  hours?: string
  phone?: string
  website?: string
  images?: string[]
  isNew?: boolean
}

export default function RestaurantDetails({ id }: { id: string }) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const fetchRestaurant = async () => {
      const response = await fetch(`/api/restaurants/${id}`)
      const data = await response.json()
      setRestaurant(data)
    }
    fetchRestaurant()
  }, [id])

  if (!restaurant) return <div>Loading...</div>

  const images = restaurant.images?.length ? restaurant.images : [restaurant.image_url || "/placeholder.svg"]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900">
              BABETEN Guide Restaurants
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/usa" className="hover:text-gray-900">
              USA
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/usa/florida" className="hover:text-gray-900">
              Florida
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/usa/florida/miami" className="hover:text-gray-900">
              Miami Restaurants
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900">{restaurant.name}</span>
          </nav>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative h-[60vh] bg-gray-100">
        <Image
          src={images[currentImageIndex] || "/filler1.webp"}
          alt={`${restaurant.name} - Image ${currentImageIndex + 1}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />

        {/* Gallery Navigation */}
        <div className="absolute inset-x-0 bottom-0 flex justify-between items-center p-4">
          <Button
            variant="secondary"
            size="icon"
            onClick={previousImage}
            className="rounded-full bg-white/80 hover:bg-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-white text-sm">
            {currentImageIndex + 1} / {images.length}
          </span>
          <Button
            variant="secondary"
            size="icon"
            onClick={nextImage}
            className="rounded-full bg-white/80 hover:bg-white"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="secondary" size="icon" className="rounded-full bg-white/80 hover:bg-white">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" className="rounded-full bg-white/80 hover:bg-white">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {restaurant.isNew && (
                  <Badge variant="destructive" className="rounded-sm">
                    NEW
                  </Badge>
                )}
                <h1 className="text-4xl font-bold">{restaurant.name}</h1>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span>{restaurant.cuisine}</span>
                <span>•</span>
                <span>{restaurant.price}</span>
              </div>
              {/* Right Column */}
              <div className="space-y-4">
                {restaurant.address && (
                    <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                        <h3 className="font-medium">Address</h3>
                        <p className="text-gray-600">{restaurant.address}</p>
                    </div>
                    </div>
                )}

                {restaurant.hours && (
                    <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                        <h3 className="font-medium">Opening Hours</h3>
                        <p className="text-gray-600">{restaurant.hours}</p>
                    </div>
                    </div>
                )}

                {restaurant.phone && (
                    <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                        <h3 className="font-medium">Phone</h3>
                        <a href={`tel:${restaurant.phone}`} className="text-gray-600 hover:text-gray-900">
                        {restaurant.phone}
                        </a>
                    </div>
                    </div>
                )}

                {restaurant.website && (
                    <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                        <h3 className="font-medium">Website</h3>
                        <a
                        href={restaurant.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900"
                        >
                        Visit website
                        </a>
                    </div>
                    </div>
                )}
              </div>
            </div>

            {/* Reservation Card */}
            <Card className="w-[300px] shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Reserve a table</h3>
                <Button className="w-full bg-black text-white hover:bg-gray-900">Book</Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">About</h2>
                <p className="text-gray-600 leading-relaxed">{restaurant.description}</p>
              </div>

              {restaurant.distinction && (
                <div>
                  <h2 className="text-lg font-semibold mb-2">MICHELIN Guide</h2>
                  <p className="text-red-600">{restaurant.distinction}</p>
                </div>
              )}
            </div>

            
          </div>
        </div>
      </div>
    </div>
  )
}

