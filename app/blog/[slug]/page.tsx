import BlogPost from "@/components/BlogPost"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogPost slug={params.slug} />
}

