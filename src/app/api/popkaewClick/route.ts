import { NextRequest, NextResponse } from "next/server"
import { click } from "@/services/popkaewClickService"

export async function POST(req: NextRequest) {
  try {
    const { playerId } = await req.json()

    if (!playerId) {
      return NextResponse.json({ error: "playerId is required" }, { status: 400 })
    }

    const result = await click(playerId)

    return NextResponse.json(result)
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
