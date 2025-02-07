import BlogList from "@/components/BlogList"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { Search } from "lucide-react"

export default function Blog() {
  return (
    <div>
      <Header />
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-12">
          <h1 className="text-5xl font-bold mb-6">Magazine</h1>
          <p className="text-xl text-gray-600 mb-8">Discover stories, interviews, and guides from the culinary world</p>
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <BlogList />
      <Footer />
    </div>
  )
}