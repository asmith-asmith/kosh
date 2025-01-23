import { NextResponse } from "next/server"

console.log("HERERERERER")

export async function GET() {
  return NextResponse.json({ message: "Hello from the kosh backend!" })
}