import Link from 'next/link'
import Image from 'next/image'

interface HeroPostProps {
  title?: string
  excerpt?: string
  coverImage?: string
  date?: string
  author?: {
    name: string
    picture: string
  }
  slug?: string
}

export function HeroPost({
  title = "Latest from our Blog",
  excerpt = "Discover the latest culinary trends, restaurant reviews, and food stories.",
  coverImage = "/static/filler-large.jpg",
  date = "March 16, 2024",
  author = {
    name: "Food Explorer",
    picture: "/images/default-author.jpg"
  },
  slug = "latest-post"
}: HeroPostProps) {
  return (
    <section className="mb-16">
      <div className="mb-8 md:mb-16">
        <div className="relative aspect-[2/1] w-full">
          <Image
            src={coverImage}
            alt={`Cover Image for ${title}`}
            className="object-cover object-center rounded-lg"
            fill
            priority
          />
        </div>
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            <Link href={`/blog/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            {date}
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          <div className="flex items-center">
            <Image
              src={author.picture}
              className="rounded-full mr-4"
              alt={author.name}
              width={48}
              height={48}
            />
            <div className="text-xl font-semibold">{author.name}</div>
          </div>
        </div>
      </div>
    </section>
  )
} 