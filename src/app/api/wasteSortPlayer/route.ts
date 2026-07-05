import { NextRequest, NextResponse } from "next/server"

import wasteSortPlayerService from "@/services/wasteSortPlayerService"

export async function GET() {
  const players = await wasteSortPlayerService.list()
  return NextResponse.json({ players })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { uid, name, group } = body ?? {}

  if (!uid || !name || !group) {
    return NextResponse.json({ error: "uid, name, and group are required" }, { status: 400 })
  }

  try {
    const player = await wasteSortPlayerService.createNewPlayer(uid, { name, group })
    return NextResponse.json({ player }, { status: 201 })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create player" },
      { status: 400 }
    )
  }
}
