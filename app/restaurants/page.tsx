import Hero from "@/components/Hero"
import FeaturedRestaurants from "@/components/FeaturedRestaurants"
import { RestaurantList } from "@/components/RestaurantList"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <RestaurantList />
      {/* <FeaturedRestaurants /> */}
    </main>
  )
}