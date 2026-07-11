import { NextRequest } from "next/server"
import userService from "@/services/userService"
import { User } from "@/types/user"
import { success, failure } from "@/utils/apiHelpers"
import wasteSortPlayerService, { wasteSortPlayer } from "@/services/wasteSortPlayerService"
import { AppErrorCode } from "@/types/appErrorCode"

type RouteParams = { params: Promise<{ uid: string }> }

export async function GET(_req: NextRequest, { params }: RouteParams) {
  try {
    const { uid } = await params
    const player = await wasteSortPlayerService.getById(uid)

    if (!player) {
      return failure(404, AppErrorCode.PLAYER_NOT_FOUND, "Player not found")
    }

    return success({
      name: player.name,
      playCount: player.playCount,
      vesselName: player.vesselName,
      group: player.group,
      sustainScore: player.sustainScore,
      playsToday: player.playsToday,
      lastPlayDate: player.lastPlayDate,
    })
  } catch (error) {
    console.error("Get player error:", error)
    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const { uid } = await params
  const body = await req.json()

  const player = await wasteSortPlayerService.update(uid, body)

  if (!player) {
    return failure(404, AppErrorCode.PLAYER_NOT_FOUND, "Player not found")
  }

  return success({ player })
}

// DELETE /api/wasteSortPlayer/[uid]
export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const { uid } = await params
  await wasteSortPlayerService.delete(uid)
  return success({ ok: true })
}

export async function POST(req: NextRequest, { params }: RouteParams) {
  try {
    const { uid } = await params
    const checkPlayer = await wasteSortPlayerService.getById(uid)

    if (checkPlayer) {
      return success({ message: "Document already exists" })
    }

    const player = await userService.getById(uid)
    if (player == null) {
      return failure(404, AppErrorCode.USER_NOT_FOUND, "Player not found in User DataBase")
    }

    const newPlayer: User = player as User
    const newWasteSortPlayer: wasteSortPlayer = {
      name: newPlayer.name.en.firstName,
      playCount: 0,
      vesselName: newPlayer.group.vesselName,
      group: newPlayer.group,
      sustainScore: 0,
      playsToday: 0,
      lastPlayDate: "",
    }

    await wasteSortPlayerService.create(uid, newWasteSortPlayer)
    return success({ message: "Add wasteSortPlayer Successfully" })
  } catch (error) {
    console.error(error)
    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}
