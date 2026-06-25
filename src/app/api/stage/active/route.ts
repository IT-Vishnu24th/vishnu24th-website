import { GrpcStatus } from "firebase-admin/firestore"
import z, { ZodError } from "zod"
import stageService from "@/services/stageService"
import { failure, parseBody, protectRaw, success } from "@/utils/apiHelpers"
import type { NextRequest } from "next/server"

const setActiveStagePayload = z.object({
  id: z.string(),
})

export async function PUT(req: NextRequest) {
  try {
    const [error] = await protectRaw("admin")
    if (error) return error

    const [parseErr, payload] = await parseBody(req, setActiveStagePayload)
    if (parseErr) return parseErr

    await stageService.setSoleActive(payload.id)
    return success<boolean>(true)
  } catch (error) {
    if (error instanceof ZodError) return failure(400, "Invalid body")
    if (error instanceof Error && "code" in error && error.code === GrpcStatus.NOT_FOUND)
      return failure(404, "Not found")

    console.error("Error in PUT /api/stage/active:", error)
    return failure(500, "Internal server error")
  }
}
