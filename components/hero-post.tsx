import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface HeroPostProps {
  title: string
  excerpt: string
  coverImage: string
  date: string
  author: {
    name: string
    picture: string
  }
  slug: string
}

export function HeroPost() {
  const [post, setPost] = useState<HeroPostProps | null>(null)

  useEffect(() => {
    async function fetchPost() {
      const response = await fetch('/api/blog/latest-post')
      const data = await response.json()
      setPost(data)
    }

    fetchPost()
  }, [])

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <section className="mb-16">
      <div className="mb-8 md:mb-16 relative">
        <div className="relative aspect-[2/1] w-full">
          <Image
            src={post.coverImage || '/static/filler-large.jpg'}
            alt={`Cover Image for ${post.title}`}
            className="object-cover object-center rounded-lg"
            fill
            priority
          />
          <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 text-white w-full">
            <h3 className="text-4xl lg:text-5xl leading-tight">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h3>
            <div className="flex items-center mt-2">
              <Image
                src={'/static/babeten.png'}
                className="rounded-full mr-4"
                alt={"Babeten Staff"}
                width={48}
                height={48}
              />
              <div className="text-xl font-semibold">{"Babeten Staff"}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <div className="mb-4 md:mb-0 text-lg">
            {post.date}
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{post.excerpt}</p>
        </div>
      </div>
    </section>
  )
}