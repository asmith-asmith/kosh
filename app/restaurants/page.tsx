// import FeaturedRestaurants from "@/components/FeaturedRestaurants"
import { RestaurantList } from "@/components/RestaurantList"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      {/* <FeaturedRestaurants /> */}
      <RestaurantList />
      <Footer />
    </div>
  )
}