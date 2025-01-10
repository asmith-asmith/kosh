import Image from 'next/image'
import { Heart, ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface RestaurantCardProps {
  name: string
  location: string
  cuisine: string
  price: string
  imageUrl: string
  rating: number
}

export function RestaurantCard({
  name,
  location,
  cuisine,
  price,
  imageUrl,
  rating,
}: RestaurantCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <Button size="icon" variant="secondary" className="rounded-full bg-white">
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" className="rounded-full bg-white">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-1">{name}</h3>
        <div className="text-sm text-gray-600">
          <p>{location}</p>
          <div className="flex justify-between items-center mt-1">
            <span>{cuisine}</span>
            <span>{price}</span>
          </div>
        </div>
        {rating && (
          <div className="mt-2 text-yellow-500">
            Rating: {rating.toFixed(1)} ⭐
          </div>
        )}
      </CardContent>
    </Card>
  )
}

