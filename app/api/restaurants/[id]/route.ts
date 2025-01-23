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

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  // const token = req.headers.get("Authorization")?.split(" ")[1]
  // if (!token) {
  //   return NextResponse.json({ error: "No token provided" }, { status: 401 })
  // }
  // const decoded = await verifyToken(token)
  // if (!decoded) {
  //   return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  // }

  const { data, error } = await supabase.from("restaurants_1").select("*").eq("id", params.id).single()

  console.log("data ", data);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

