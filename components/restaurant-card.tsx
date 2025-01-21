import Image from 'next/image'
import Link from 'next/link'
import { Heart, ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface RestaurantCardProps {
  id: string
  name: string
  location: string
  cuisine: string
  price: string
  imageUrl: string
  distinction?: string
}

export function RestaurantCard({
  id,
  name,
  location,
  cuisine,
  price,
  imageUrl,
  distinction,
}: RestaurantCardProps) {
  // Log all restaurant data
  console.log('Restaurant Data:', {
    id,
    name,
    location,
    cuisine, 
    price,
    imageUrl,
    distinction
  })

  return (
    <Link href={`/restaurants/${id}`}>
      <Card className="overflow-hidden transition-transform hover:scale-[1.02]">
        <div className="relative aspect-square">
          <Image
            src={imageUrl || '/filler.png'}
            alt={name}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full bg-white"
              onClick={(e) => e.preventDefault()}
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full bg-white"
              onClick={(e) => e.preventDefault()}
            >
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
          {distinction && (
            <div className="mt-2 text-red-600">
              {distinction}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
