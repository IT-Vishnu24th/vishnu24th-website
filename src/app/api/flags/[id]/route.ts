import { GrpcStatus } from "firebase-admin/firestore"
import z, { ZodError } from "zod"
import featureFlagsService from "@/services/featureFlagService"
import { success, failure, protect } from "@/utils/apiHelpers"
import type { NextRequest } from "next/server"
import type { FeatureFlag } from "@/types/featureFlag"

export async function GET(req: NextRequest, { params }: RouteContext<"/api/flags/[id]">) {
  const { id } = await params
  try {
    const featureFlag = await featureFlagsService.getFlag(id)
    if (!featureFlag) return failure(404, "Not found")
    return success<FeatureFlag>(featureFlag)
  } catch (error) {
    console.error(`Error in GET /api/flags/${id}:`, error)
    return failure(500, "Internal server error")
  }
}

const updateFeatureFlagPayload = z.object({
  enabled: z.boolean(),
})

export async function PUT(req: NextRequest, { params }: RouteContext<"/api/flags/[id]">) {
  const { id } = await params
  try {
    const [error] = await protect("admin")
    if (error) return error

    const payload = updateFeatureFlagPayload.parse(await req.json())

    const featureFlag = await featureFlagsService.setFlag(id, payload.enabled)
    return success<FeatureFlag>(featureFlag)
  } catch (error) {
    if (error instanceof ZodError) return failure(400, "Invalid body")
    if (error instanceof Error && "code" in error && error.code === GrpcStatus.NOT_FOUND)
      return failure(404, "Not found")

    console.error(`Error in PUT /api/flags/${id}:`, error)
    return failure(500, "Internal server error")
  }
}
