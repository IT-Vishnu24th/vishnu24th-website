import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/firebase/admin"
import { popkaewPlayer } from "@/types/popkaewPlayer"
import popkaewPlayerService from "@/services/popKaewPlayerServices"
import userService, { RawUser } from "@/services/userService"
import { User } from "@/types/user"

import { Timestamp } from "firebase-admin/firestore"
import { success, failure, protectRaw } from "@/utils/apiHelpers"

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

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params
    const checkPlayer = await popkaewPlayerService.getById(id)

    if (checkPlayer) {
      return NextResponse.json({ Message: "Document already exists" })
    }
    const Player = await userService.getById(id)

    if (Player == null) {
      return NextResponse.json({ error: "Player not found in User DataBase" }, { status: 404 })
    }
    const newPlayer: User = Player as User
    const newPopkaewPlayer: popkaewPlayer = {
      name: newPlayer.name.en.firstName,
      vessel: newPlayer.group.vesselName.en,
      popkaewscore: 0,
      lastClickAt: Timestamp.now(),
    }
    console.log(newPopkaewPlayer)
    const create = await popkaewPlayerService.create(id, newPopkaewPlayer)
    create
    return NextResponse.json({ Message: "Add user Successfully" })
  } catch (error) {
    console.error(error)

    return failure(500, "Internal server error")
  }
}
