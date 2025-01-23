"use client"

import { useState, useEffect } from "react"

interface BlogPostProps {
  slug: string;
}

export default function BlogPost({ slug }: BlogPostProps) {
  const [post, setPost] = useState<{ title: string; date: string; content: string } | null>(null)

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
    <div>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-500">{post.date}</p>
      <div className="mt-4" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  )
}