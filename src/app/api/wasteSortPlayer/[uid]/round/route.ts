import { NextRequest, NextResponse } from "next/server"

import wasteSortPlayerService, { MAX_PLAYS_PER_DAY } from "@/services/wasteSortPlayerService"

type RouteParams = { params: Promise<{ uid: string }> }

// GET /api/wasteSortPlayer/[uid]/round
// Check how many rounds the player has left today, without playing one.
export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { uid } = await params
  const player = await wasteSortPlayerService.getById(uid)

  if (!player) {
    return NextResponse.json({ error: "Player not found" }, { status: 404 })
  }

  const playsToday = await wasteSortPlayerService.getPlaysToday(uid)

  return NextResponse.json({
    playsToday,
    maxPlaysPerDay: MAX_PLAYS_PER_DAY,
    playsRemaining: Math.max(0, MAX_PLAYS_PER_DAY - playsToday),
    canPlay: playsToday < MAX_PLAYS_PER_DAY,
  })
}

export async function POST(req: NextRequest, { params }: RouteParams) {
  const { uid } = await params
  const body = await req.json()
  const score = Number(body?.score)

  if (!Number.isFinite(score)) {
    return NextResponse.json({ error: "score must be a number" }, { status: 400 })
  }

  try {
    const player = await wasteSortPlayerService.recordRound(uid, score)

    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 })
    }

    return NextResponse.json({ player })
  } catch (err) {
    if (err instanceof Error && err.message === "DAILY_LIMIT_REACHED") {
      return NextResponse.json(
        {
          error: "DAILY_LIMIT_REACHED",
          message: `Already played ${MAX_PLAYS_PER_DAY} times today`,
        },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to record round" },
      { status: 400 }
    )
  }
}
