import { NextRequest, NextResponse } from "next/server"

import wasteSortPlayerService from "@/services/wasteSortPlayerService"

export async function GET() {
  const players = await wasteSortPlayerService.list()
  return NextResponse.json({ players })
}
