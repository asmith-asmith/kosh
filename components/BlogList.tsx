"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface BlogPost {
  slug: string;
  title: string;
  date: string;
}

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/blog", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      setPosts(data)
    }
    fetchPosts()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`}>
          <div className="border p-4 rounded hover:shadow-lg transition">
            <h3 className="font-bold">{post.title}</h3>
            <p className="text-sm text-gray-500">{post.date}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}