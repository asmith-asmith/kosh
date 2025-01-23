import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import jwt from "jsonwebtoken"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  const token = jwt.sign({ userId: data.user.id }, process.env.JWT_SECRET!, { expiresIn: "1h" })

  return NextResponse.json({ token })
}