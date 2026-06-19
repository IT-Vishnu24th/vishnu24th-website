import { GrpcStatus } from "firebase-admin/firestore"
import z, { ZodError } from "zod"
import { getAuthenticatedUser } from "@/lib/auth"
import featureFlagsService from "@/services/featureFlagService"
import { success, failure } from "@/utils/responseHelpers"
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

// protected: admin
export async function PUT(req: NextRequest, { params }: RouteContext<"/api/flags/[id]">) {
  const { id } = await params
  try {
    const user = await getAuthenticatedUser()
    if (!user) return failure(401, "Not logged in")
    if (user.role !== "admin") return failure(403, "Forbidden")

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
