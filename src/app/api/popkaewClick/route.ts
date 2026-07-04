import { NextRequest } from "next/server"
import { click } from "@/services/popkaewClickService"
import { success, failure, protectRaw } from "@/utils/apiHelpers"

export async function POST(_req: NextRequest) {
  try {
    const [error, user] = await protectRaw("participant")
    if (error) return error

    const playerId = user.id

    const result = await click(playerId)

    return success(result)
  } catch (error) {
    if (error instanceof Error && error.message === "Player not found") {
      return failure(404, "Player not found")
    }

    console.error(error)

    return failure(500, "Internal server error")
  }
}
