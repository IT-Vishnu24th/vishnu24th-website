import { NextResponse } from "next/server"

import popkaewVesselService from "@/services/popkaewVesselService"

export async function GET() {
  const leaderboard = await popkaewVesselService.leaderboard()

  return NextResponse.json({
    success: true,
    leaderboard,
  })
}
