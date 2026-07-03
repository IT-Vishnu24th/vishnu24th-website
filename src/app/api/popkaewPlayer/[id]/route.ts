import { NextRequest, NextResponse } from "next/server"
import popkaewPlayerService from "@/services/popKaewPlayerServices"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const player = await popkaewPlayerService.getById(id)

    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 })
    }

    return NextResponse.json({
      id,
      name: player.name,
      vesselName: player.vessel,
      popkaewscore: player.popkaewscore,
      lastClickAt: player.lastClickAt?.toDate().toISOString() ?? null,
    })
  } catch (error) {
    console.error("Get player error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
