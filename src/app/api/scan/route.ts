import { NextRequest } from "next/server"
import z from "zod"
import scanService from "@/services/scanService"
import { ScanResponse } from "@/types/scan"
import { protectRaw, success, failure, parseBody } from "@/utils/apiHelpers"

const scanPayloadSchema = z.object({
  clubId: z.string(),
})

export async function POST(req: NextRequest) {
  try {
    const [error, user] = await protectRaw("participant")
    if (error) return error

    const [parseErr, payload] = await parseBody(req, scanPayloadSchema)
    if (parseErr) return parseErr

    const { clubId } = payload

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

    return success<ScanResponse>({
      createdAt: result.createdAt,
      club: result.club,
      score: result.score,
    })
  } catch (error) {
    console.error("Club scan error:", error)
    return failure(500, "Internal server error")
  }
}
