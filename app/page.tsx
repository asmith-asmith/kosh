'use client'

import { Homepage } from '@/components/homepage'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <Homepage />
      <Footer />
    </div>
  )
}

