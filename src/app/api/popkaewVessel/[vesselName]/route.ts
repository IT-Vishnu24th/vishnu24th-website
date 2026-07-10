import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/firebase/admin"
import { popkaewVessel } from "@/types/popkaewVessel"

export async function GET(req: NextRequest, { params }: { params: { vesselName: string } }) {
  try {
    const { vesselName } = await params
    const vesselDoc = await adminDb.collection("popkaewVessel").doc(vesselName).get()

    if (!vesselDoc.exists) {
      return NextResponse.json({ error: "popkaewVessel not found" }, { status: 404 })
    }

    const data = vesselDoc.data() as popkaewVessel

    return NextResponse.json({
      vesselName: data.vesselName,
      popkaewscore: data.popkaewscore,
      group: data.group,
    })
  } catch (error) {
    console.error("Get popkaewVessel error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
