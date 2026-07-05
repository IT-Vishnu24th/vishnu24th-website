import { NextRequest, NextResponse } from "next/server"

import wasteSortPlayerService from "@/services/wasteSortPlayerService"

type RouteParams = { params: Promise<{ uid: string }> }

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { uid } = await params
  const player = await wasteSortPlayerService.getById(uid)

  if (!player) {
    return NextResponse.json({ error: "Player not found" }, { status: 404 })
  }

  return NextResponse.json({ player })
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const { uid } = await params
  const body = await req.json()

  const player = await wasteSortPlayerService.update(uid, body)

  if (!player) {
    return NextResponse.json({ error: "Player not found" }, { status: 404 })
  }

  return NextResponse.json({ player })
}

// DELETE /api/wasteSortPlayer/[uid]
export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const { uid } = await params
  await wasteSortPlayerService.delete(uid)
  return NextResponse.json({ ok: true })
}
