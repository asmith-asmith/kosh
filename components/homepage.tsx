'use client'

import { SearchFilters } from '@/components/SearchFilters'
import { HeroPost } from '@/components/hero-post'

export function Homepage() {
  return (
    <>
      <main className="container mx-auto px-4 py-8 flex-grow">
        <HeroPost />
      </main>
    </>
  )
} 