'use client'

import { Homepage } from '@/components/Homepage'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { SearchFilters } from '@/components/SearchFilters'
import FeaturedRestaurants from '@/components/FeaturedRestaurants'

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <SearchFilters />
      <Homepage />
      <FeaturedRestaurants />
      <Footer />
    </div>
  )
}

