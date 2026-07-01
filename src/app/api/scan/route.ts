import scanService from "@/services/scanService"
import { ScanPostResponse } from "@/types/scan"
import { protectRaw, success, failure } from "@/utils/apiHelpers"

export async function POST(request: Request) {
  try {
    const [error, user] = await protectRaw("participant")
    if (error) return error

    const { clubId } = await request.json()
    if (!clubId) {
      return failure(400, "Missing club ID")
    }

    if (!user.group) {
      return failure(404, "User group not found")
    }

    const result = await scanService.scan(user.id, user.group, clubId)
    if (!result.success) {
      if (result.error === "club-not-found") {
        return failure(404, "Club not found")
      }
      if (result.error === "group-not-found") {
        return failure(404, "User group not found")
      }
      if (result.error === "already-scanned") {
        return failure(409, "You have already scanned this club")
      }
      return failure(500, "Internal server error")
    }

    return success<ScanPostResponse>({
      createdAt: result.createdAt,
      club: result.club,
      score: result.score,
    })
  } catch (error) {
    console.error("Club scan error:", error)
    return failure(500, "Internal server error")
  }
}
