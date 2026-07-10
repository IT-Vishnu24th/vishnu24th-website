import { NextRequest, NextResponse } from "next/server"
import userService, { RawUser } from "@/services/userService"
import { User } from "@/types/user"
import { success, failure, protectRaw } from "@/utils/apiHelpers"
import wasteSortPlayerService, { wasteSortPlayer } from "@/services/wasteSortPlayerService"
import { Timestamp } from "firebase-admin/firestore"
import { Group } from "@/types/group"
import { adminDb } from "@/firebase/admin"

type RouteParams = { params: Promise<{ uid: string }> }

export async function GET(_req: NextRequest, { params }: RouteParams) {
  try {
    const { uid } = await params
    const playerDoc = await adminDb.collection("wasteSortPlayer").doc(uid).get()

    if (!playerDoc.exists) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 })
    }
    const data = playerDoc.data() as wasteSortPlayer
    return NextResponse.json({
      name: data.name,
      playCount: data.playCount,
      vesselName: data.vesselName,
      group: data.group,
      sustainScore: data.sustainScore,
      playsToday: data.playsToday,
      lastPlayDate: data.lastPlayDate,
    })
  } catch (error) {
    console.error("Get player error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
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

export async function POST(req: NextRequest, { params }: { params: { uid: string } }) {
  try {
    const { uid } = await params
    const checkPlayer = await wasteSortPlayerService.getById(uid)

    if (checkPlayer) {
      return NextResponse.json({ Message: "Document already exists" })
    }

    const wasteSortPlayer = await userService.getById(uid)

    if (wasteSortPlayer == null) {
      return NextResponse.json({ error: "Player not found in User DataBase" }, { status: 404 })
    }
    const newPlayer: User = wasteSortPlayer as User

    const newWasteSortPlayer: wasteSortPlayer = {
      name: newPlayer.name.en.firstName,
      playCount: 0,
      vesselName: newPlayer.group.vesselName,
      group: newPlayer.group,
      sustainScore: 0,
      playsToday: 0,
      lastPlayDate: "",
    }
    console.log(newWasteSortPlayer)
    const create = await wasteSortPlayerService.create(uid, newWasteSortPlayer)
    create
    return NextResponse.json({ Message: "Add wasteSortPlayer Successfully" })
  } catch (error) {
    console.error(error)

    return failure(500, "Internal server error")
  }
}
