import { GrpcStatus } from "firebase-admin/firestore"
import z, { ZodError } from "zod"

import phaseService, { phase } from "@/services/phaseService"
import { success, failure, protect } from "@/utils/apiHelpers"

import type { NextRequest } from "next/server"

export async function GET(
  req: NextRequest,
  { params }: RouteContext<"/api/phase/[id]">
) {
  const { id } = await params

  try {
    const phase = await phaseService.getPhase(id)

    if (!phase) return failure(404, "Not found")

    return success<phase>(phase)
  } catch (error) {
    console.error(`Error in GET /api/phases/${id}:`, error)
    return failure(500, "Internal server error")
  }
}

const updatePhasePayload = z.object({
  enabled: z.boolean(),
})

export async function PUT(
  req: NextRequest,
  { params }: RouteContext<"/api/phase/[id]">
) {
  const { id } = await params

  try {
    const [error] = await protect("admin")
    if (error) return error

    const payload = updatePhasePayload.parse(await req.json())

    const phase = await phaseService.setPhase(
      id,
      payload.enabled
    )

    return success<phase>(phase)
  } catch (error) {
    if (error instanceof ZodError)
      return failure(400, "Invalid body")

    if (
      error instanceof Error &&
      "code" in error &&
      error.code === GrpcStatus.NOT_FOUND
    ) {
      return failure(404, "Not found")
    }

    console.error(`Error in PUT /api/phases/${id}:`, error)
    return failure(500, "Internal server error")
  }
}