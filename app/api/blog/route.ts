import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// import jwt from "jsonwebtoken"
// async function verifyToken(token: string) {
//   try {
//     return jwt.verify(token, process.env.JWT_SECRET!)
//   } catch (error) {
//     return null
//   }
// }
export async function GET(req: NextRequest) {
  console.log("GET /api/blog")
  // const token = req.headers.get("Authorization")?.split(" ")[1]
  // if (!token) {
  //   return NextResponse.json({ error: "No token provided" }, { status: 401 })
  // }
  // const decoded = await verifyToken(token)
  // if (!decoded) {
  //   return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  // }

  const { data, error } = await supabase
    .from('blog_posts_1')
    .select('*')
    .eq('is_published', 'true')
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}