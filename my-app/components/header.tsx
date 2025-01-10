import Link from 'next/link'
import Image from 'next/image'
import { Menu, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/dater-logo.svg"
              alt="Dater"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Button variant="destructive">Restaurants</Button>
          <Link href="/events" className="text-gray-600 hover:text-gray-900">
            Events
          </Link>
          <Link href="/matches" className="text-gray-600 hover:text-gray-900">
            Matches
          </Link>
          <Link href="/favorites" className="text-gray-600 hover:text-gray-900">
            Favorites
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

