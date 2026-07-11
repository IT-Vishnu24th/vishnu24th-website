import { NextRequest } from "next/server"
import { popkaewPlayer } from "@/types/popkaewPlayer"
import popkaewPlayerService from "@/services/popKaewPlayerServices"
import userService from "@/services/userService"
import { User } from "@/types/user"

import { Timestamp } from "firebase-admin/firestore"
import { success, failure, protectRaw } from "@/utils/apiHelpers"
import { AppErrorCode } from "@/types/appErrorCode"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const [error] = await protectRaw("participant")
    if (error) return error

    const { id } = await params
    const player = await popkaewPlayerService.getById(id)

    if (!player) {
      return failure(404, AppErrorCode.PLAYER_NOT_FOUND, "Player not found")
    }

    return success({
      id,
      name: player.name,
      vesselName: player.vessel,
      popkaewscore: player.popkaewscore,
      lastClickAt: player.lastClickAt?.toDate().toISOString() ?? null,
    })
  } catch (error) {
    console.error("Get player error:", error)
    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const checkPlayer = await popkaewPlayerService.getById(id)

    if (checkPlayer) {
      return success({ message: "Document already exists" })
    }

    const player = await userService.getById(id)
    if (player == null) {
      return failure(404, AppErrorCode.USER_NOT_FOUND, "Player not found in User DataBase")
    }

    const newPlayer: User = player as User
    const newPopkaewPlayer: popkaewPlayer = {
      name: newPlayer.name.en.firstName,
      vessel: newPlayer.group.vesselName.en,
      popkaewscore: 0,
      lastClickAt: Timestamp.now(),
    }

    await popkaewPlayerService.create(id, newPopkaewPlayer)
    return success({ message: "Add user Successfully" })
  } catch (error) {
    console.error(error)
    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}
