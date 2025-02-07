import BlogPost from "@/components/BlogPost"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div>
      <Header />
      <BlogPost slug={params.slug} />
      <Footer />
    </div>
  )
  return 
}

