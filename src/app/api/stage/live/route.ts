import { GrpcStatus } from "firebase-admin/firestore"
import z, { ZodError } from "zod"
import stageService from "@/services/stageService"
import { failure, parseBody, protectRaw, success } from "@/utils/apiHelpers"
import { AppErrorCode } from "@/types/appErrorCode"
import type { NextRequest } from "next/server"

const setLiveStagePayload = z.object({
  id: z.string(),
})

export async function PUT(req: NextRequest) {
  try {
    const [error] = await protectRaw("admin")
    if (error) return error

    const [parseErr, payload] = await parseBody(req, setLiveStagePayload)
    if (parseErr) return parseErr

    await stageService.setSoleLive(payload.id)
    return success<boolean>(true)
  } catch (error) {
    if (error instanceof ZodError) return failure(400, AppErrorCode.INVALID_BODY, "Invalid body")
    if (error instanceof Error && "code" in error && error.code === GrpcStatus.NOT_FOUND)
      return failure(404, AppErrorCode.STAGE_NOT_FOUND, "Not found")

    console.error("Error in PUT /api/stage/live:", error)
    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}
