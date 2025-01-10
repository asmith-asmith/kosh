import { Header } from '@/components/header'
import { SearchFilters } from '@/components/search-filters'
import { RestaurantCard } from '@/components/restaurant-card'
import { Button } from '@/components/ui/button'

export default function Page() {
  const restaurants = [
    {
      name: "Runner & Stone",
      location: "Brooklyn, USA",
      cuisine: "Contemporary",
      price: "$$",
      imageUrl: "/placeholder.svg",
      rating: 4.5,
    },
    {
      name: "Shalom Japan",
      location: "Brooklyn, USA",
      cuisine: "Fusion",
      price: "$$",
      imageUrl: "/placeholder.svg",
      rating: 4.8,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <SearchFilters />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">
            New York City and surroundings: 201-250 of 358 date spots
          </h1>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              ←
            </Button>
            <Button variant="outline" size="icon">
              →
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
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

