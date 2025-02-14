"use client"

import { useState, useEffect } from "react"
// import Link from "next/link"
import Image from "next/image"
// import { marked } from 'marked';
import ReactMarkdown from "react-markdown";
import { Facebook, Twitter, Mail, Clock, Calendar } from "lucide-react"


interface BlogPostProps {
  slug: string;
}

export default function BlogPost({ slug }: BlogPostProps) {
  const [post, setPost] = useState<{
    tags: string[];
    thumbnail_url: string;
    title: string;
    date: string;
    content: string 
} | null>(null)
  console.log("fetching post BlogPost.tsx")
  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/blog/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()

      setPost(data)
    }
    fetchPost()
  }, [slug])

  if (!post) return <div>Loading...</div>

  return (
    <article className="max-w-[1200px] mx-auto px-4 py-8">
      {/* Category and Meta */}
      <div className="flex items-center gap-6 text-gray-600 mb-8">
        {/* <div className="uppercase tracking-wider">{post.category}</div> */}
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {/* <span>{post.readTime} minutes</span> */}
          <span>x minutes</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
            <time>
            {new Date(post.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
            </time>
        </div>
      </div>

      {/* Share buttons */}
      <div className="fixed left-8 top-1/3 flex flex-col gap-4">
        <button className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50">
          <Facebook className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50">
          <Twitter className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50">
          <Mail className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold leading-tight mb-6">{post.title}</h1>
        {/* <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p> */}

        {/* Tags */}
        <div className="flex gap-2 mb-8">
          {post.tags?.map((tag: string) => (
            <span key={tag} className="px-4 py-1 rounded-full bg-gray-100 text-sm text-gray-600">
              {tag}
            </span>
          ))}
        </div>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] mb-8">
          <Image
            src={post.thumbnail_url || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        {/* Article Content */}
        {/* <div dangerouslySetInnerHTML={{ <ReactMarkdown children={post.content} /> }} /> */}
        <div className="prose max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        {/* Related Content Sidebar */}
        {/* <aside className="fixed right-8 top-1/3 w-80">
          {post.related_restaurants?.map((restaurant: any) => (
            <Link
              key={restaurant.id}
              href={`/restaurants/${restaurant.id}`}
              className="block p-4 mb-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[4/3] mb-3">
                <Image
                  src={restaurant.image_url || "/placeholder.svg"}
                  alt={restaurant.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <h3 className="font-bold mb-1">{restaurant.name}</h3>
              <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
            </Link>
          ))}
        </aside> */}
      </div>
    </article>
  )
}