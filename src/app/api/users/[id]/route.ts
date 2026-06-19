import { GrpcStatus } from "firebase-admin/firestore"
import z, { ZodError } from "zod"
import userService, { User } from "@/services/userService"
import { success, failure, protect } from "@/utils/apiHelpers"
import type { NextRequest } from "next/server"

const updateUserPayload = z
  .object({
    role: z.enum(["admin", "staff", "participant"]).optional(),
  })
  .refine((schema) => Object.keys(schema).length > 0, "Payload may not be empty")

export async function PATCH(req: NextRequest, { params }: RouteContext<"/api/users/[id]">) {
  const { id } = await params
  try {
    const [error] = await protect("admin")
    if (error) return error

    const payload = updateUserPayload.parse(await req.json())

    const updated = await userService.update(id, payload)
    return success<User>(updated)
  } catch (error) {
    if (error instanceof ZodError) return failure(400, "Invalid body")
    if (error instanceof Error && "code" in error && error.code === GrpcStatus.NOT_FOUND)
      return failure(404, "Not found")

    console.error(`Error in PATCH /api/users/${id}:`, error)
    return failure(500, "Internal server error")
  }
}
