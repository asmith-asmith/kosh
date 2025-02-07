export type Restaurant = {
    id: string
    name: string
    location: string
    cuisine: string
    price_range: string
    description: string
    created_at: string
    image_url: string
    distinction?: string
  }
  
  export type Image = {
    id: string
    restaurant_id: string
    url: string
    created_at: string
  }
  
  export type Database = {
    public: {
      tables: {
        restaurants: {
          Row: Restaurant
          Insert: Omit<Restaurant, "id" | "created_at">
          Update: Partial<Omit<Restaurant, "id" | "created_at">>
        }
        images: {
          Row: Image
          Insert: Omit<Image, "id" | "created_at">
          Update: Partial<Omit<Image, "id" | "created_at">>
        }
      }
    }
  }
  
  