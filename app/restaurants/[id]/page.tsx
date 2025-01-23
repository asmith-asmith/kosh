'use client'

import { Footer } from '@/components/Footer'
import RestaurantDetails from '@/components/RestaurantDetails'
import { Header } from '@/components/Header'

export default function RestaurantPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <RestaurantDetails id={params.id} />
      <Footer />
    </div>
  )
}