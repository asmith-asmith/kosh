'use client'

// import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const filters = [
  { id: 'all', label: 'All', active: true },
  { id: 'distinction', label: 'Distinction', icon: '⭐' },
  { id: 'green-star', label: 'Green Star', icon: '🌱' },
  { id: 'hotels', label: 'In KOSH Hotels', icon: '🏨' },
  { id: 'booking', label: 'Online booking', icon: '📅' },
  { id: 'days', label: 'Days open', icon: '📆' },
  { id: 'cuisine', label: 'Cuisine', icon: '🍽️' },
  { id: 'services', label: 'Services / Facilities', icon: '🏪' },
  { id: 'price', label: 'Price', icon: '💰' },
]

export function SearchFilters() {
  return (
    <div className="container mx-auto px-4 py-4 space-y-4">
      <div className="relative">
        <Input
          type="search"
          placeholder="eg. New York City, New York State, USA"
          className="w-full pl-10 pr-10"
          
        />
        {/* <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 -translate-y-1/2"
        > */}
          {/* <X className="h-4 w-4" /> */}
        {/* </Button> */}
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={filter.active ? "destructive" : "outline"}
            className="whitespace-nowrap"
          >
            {filter.icon && <span className="mr-2">{filter.icon}</span>}
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

