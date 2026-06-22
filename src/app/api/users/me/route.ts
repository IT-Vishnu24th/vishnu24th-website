import { GrpcStatus } from "firebase-admin/firestore"
import z, { ZodError } from "zod"
import userService, { User } from "@/services/userService"
import { success, failure, protect } from "@/utils/apiHelpers"
import type { NextRequest } from "next/server"

export async function GET() {
  try {
    const [error, user] = await protect()
    if (error) return error

    return success<User>(user)
  } catch (error) {
    console.error("Error in GET /api/users/me:", error)
    return failure(500, "Internal server error")
  }
}

const updateUserPayload = z
  .object({
    prefLanguage: z.enum(["en", "th"]),
  })
  .partial()
  .refine((schema) => Object.keys(schema).length > 0, "Payload may not be empty")

export async function PATCH(req: NextRequest) {
  try {
    const [error, user] = await protect()
    if (error) return error

    const payload = updateUserPayload.parse(await req.json())

    const updated = await userService.update(user.id, payload)
    return success<User>(updated)
  } catch (error) {
    if (error instanceof ZodError) return failure(400, "Invalid body")
    if (error instanceof Error && "code" in error && error.code === GrpcStatus.NOT_FOUND)
      return failure(404, "Not found")

    console.error("Error in PATCH /api/users/me:", error)
    return failure(500, "Internal server error")
  }
}
