'use client'

import { Footer } from '@/components/footer'
import RestaurantDetails from '@/components/restaurant-details'
import { Header } from '@/components/header'

export default function RestaurantPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <RestaurantDetails id={params.id} />
      <Footer />
    </div>
  )
}