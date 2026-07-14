import { GrpcStatus } from "firebase-admin/firestore"
import z, { ZodError } from "zod"
import stageService, { type StagePerformance } from "@/services/stageService"
import { failure, parseBody, protectRaw, success } from "@/utils/apiHelpers"
import { AppErrorCode } from "@/types/appErrorCode"
import type { NextRequest } from "next/server"
import { multiLangSchema } from "@/types/util"

export async function GET(req: NextRequest, { params }: RouteContext<"/api/stage/[id]">) {
  const { id } = await params
  try {
    const stage = await stageService.getById(id)
    if (!stage) return failure(404, AppErrorCode.STAGE_NOT_FOUND, "Not found")
    return success<StagePerformance>(stage)
  } catch (error) {
    console.error(`Error in GET /api/stage/${id}:`, error)
    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}

const updateStagePayload = z
  .object({
    name: multiLangSchema(z.string()),
    description: multiLangSchema(z.string()),
    status: z.enum(["complete", "live", "upcoming", "delayed"]),
    duration: z.int(),
    start: z.iso.datetime().pipe(z.coerce.date()),
    end: z.iso.datetime().pipe(z.coerce.date()),
  })
  .partial()

export async function PATCH(req: NextRequest, { params }: RouteContext<"/api/stage/[id]">) {
  const { id } = await params
  try {
    const [error] = await protectRaw("admin")
    if (error) return error

    const [parseErr, payload] = await parseBody(req, updateStagePayload)
    if (parseErr) return parseErr

    const stage = await stageService.update(id, payload)
    return success<StagePerformance>(stage)
  } catch (error) {
    if (error instanceof ZodError) return failure(400, AppErrorCode.INVALID_BODY, "Invalid body")
    if (error instanceof Error && "code" in error && error.code === GrpcStatus.NOT_FOUND)
      return failure(404, AppErrorCode.STAGE_NOT_FOUND, "Not found")

    console.error(`Error in PATCH /api/stage/${id}:`, error)
    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}

export async function DELETE(req: NextRequest, { params }: RouteContext<"/api/stage/[id]">) {
  const { id } = await params
  try {
    const [error] = await protectRaw("admin")
    if (error) return error

    await stageService.delete(id)
    return success<boolean>(true)
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === GrpcStatus.NOT_FOUND)
      return failure(404, AppErrorCode.STAGE_NOT_FOUND, "Not found")

    console.error(`Error in DELETE /api/stage/${id}:`, error)
    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}
