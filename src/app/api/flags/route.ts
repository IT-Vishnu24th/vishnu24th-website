import { GrpcStatus } from "firebase-admin/firestore"
import z, { ZodError } from "zod"
import featureFlagsService, { FeatureFlag } from "@/services/featureFlagService"
import { success, failure, protectRaw, parseBody } from "@/utils/apiHelpers"
import type { NextRequest } from "next/server"
import { multiLangSchema } from "@/types/util"

export async function GET() {
  try {
    const flags = await featureFlagsService.listFlags()
    return success<FeatureFlag[]>(flags)
  } catch (error) {
    console.error(`Error in GET /api/flags:`, error)
    return failure(500, "Internal server error")
  }
}

const createFeatureFlagsPayload = z.object({
  id: z.string().min(1),
  name: multiLangSchema(z.string()),
  enabled: z.boolean().default(false),
})

export async function POST(req: NextRequest) {
  try {
    const [error] = await protectRaw("admin")
    if (error) return error

    const [parseErr, payload] = await parseBody(req, createFeatureFlagsPayload)
    if (parseErr) return parseErr

    const featureFlag = await featureFlagsService.createFlag(payload)
    return success<FeatureFlag>(featureFlag)
  } catch (error) {
    if (error instanceof ZodError) return failure(400, "Invalid body")
    if (error instanceof Error && "code" in error && error.code === GrpcStatus.ALREADY_EXISTS)
      return failure(409, "Conflict")

    console.error(`Error in POST /api/flags:`, error)
    return failure(500, "Internal server error")
  }
}

const updateFeatureFlagsPayload = z.record(z.string(), z.boolean())

export async function PATCH(req: NextRequest) {
  try {
    const [error] = await protectRaw("admin")
    if (error) return error

    const [parseErr, payload] = await parseBody(req, updateFeatureFlagsPayload)
    if (parseErr) return parseErr

    await featureFlagsService.updateFlags(payload)
    return success<boolean>(true)
  } catch (error) {
    if (error instanceof ZodError) return failure(400, "Invalid body")
    if (error instanceof Error && "code" in error && error.code === GrpcStatus.NOT_FOUND)
      return failure(404, "Not found")

    console.error(`Error in PATCH /api/flags:`, error)
    return failure(500, "Internal server error")
  }
}
