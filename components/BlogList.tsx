"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock } from "lucide-react"

interface BlogPost {
  tags: string[]
  excerpt: string
  readTime: string
  category: string
  thumbnail_url: string
  slug: string;
  title: string;
  date: string;
}

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      // const token = localStorage.getItem("token")
      // const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {}
      console.log("fetching posts")
      const response = await fetch("/api/blog")
      console.log(response)
      const data = await response.json()
      setPosts(data)
    }
    fetchPosts()
  }, [])

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Latest Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: BlogPost) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative aspect-[16/9]">
                <Image
                  src={post.thumbnail_url || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="uppercase tracking-wider">{post.category}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime} min</span>
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
                <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
                <div className="flex gap-2 mt-4">
                    {Array.isArray(post.tags) && post.tags.slice(0, 3).map((tag: string) => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                      {tag}
                    </span>
                    ))}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}