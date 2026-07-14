import z, { ZodError } from "zod"
import stageService, { type StagePerformance } from "@/services/stageService"
import { failure, parseBody, protectRaw, success } from "@/utils/apiHelpers"
import { AppErrorCode } from "@/types/appErrorCode"
import type { NextRequest } from "next/server"
import { multiLangSchema } from "@/types/util"

export async function GET() {
  try {
    const stages = await stageService.list()
    return success<StagePerformance[]>(stages)
  } catch (error) {
    console.error(`Error in GET /api/stage:`, error)
    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}

const createStagePayload = z.object({
  name: multiLangSchema(z.string()),
  description: multiLangSchema(z.string()),
  status: z.enum(["complete", "live", "upcoming", "delayed"]),
  duration: z.int(),
  start: z.iso.datetime().pipe(z.coerce.date()),
  end: z.iso.datetime().pipe(z.coerce.date()),
})

export async function POST(req: NextRequest) {
  try {
    const [error] = await protectRaw("admin")
    if (error) return error

    const [parseErr, payload] = await parseBody(req, createStagePayload)
    if (parseErr) return parseErr

    const stage = await stageService.create(payload)
    return success<string>(stage)
  } catch (error) {
    if (error instanceof ZodError) return failure(400, AppErrorCode.INVALID_BODY, "Invalid body")

    console.error(`Error in POST /api/stage:`, error)
    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}
