import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/firebase/admin"
import { popkaewPlayer } from "@/types/popkaewPlayer"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params
    const playerDoc = await adminDb.collection("popkaewPlayer").doc(id).get()

    if (!playerDoc.exists) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 })
    }

    const data = playerDoc.data() as popkaewPlayer

    return NextResponse.json({
      id: playerDoc.id,
      name: data.name,
      vesselName: data.vessel,
      popkaewscore: data.popkaewscore,
      lastClickAt: data.lastClickAt?.toDate().toISOString() ?? null,
    })
  } catch (error) {
    console.error("Get player error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
