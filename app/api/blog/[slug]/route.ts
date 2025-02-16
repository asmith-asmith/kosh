import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  let data, error;

  if (params.slug === "latest-post") {
    ({ data, error } = await supabase.from("blog_posts_1").select("*").order("created_at", { ascending: false }).limit(1).single());
  } else {
    ({ data, error } = await supabase.from("blog_posts_1").select("*").eq("slug", params.slug).single());
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
