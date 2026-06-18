import { GrpcStatus } from "firebase-admin/firestore"
import z, { ZodError } from "zod"
import { getAuthenticatedUser } from "@/lib/auth"
import userService from "@/services/userService"
import { success, failure } from "@/utils/responseHelpers"
import type { NextRequest } from "next/server"
import type { User } from "@/types/user"

// protected: user
export async function GET() {
  try {
    const user = await getAuthenticatedUser()
    if (!user) return failure(401, "Not logged in")

    return success<User>(user)
  } catch (error) {
    console.error("Error in GET /api/users/me:", error)
    return failure(500, "Internal server error")
  }
}

const updateUserPayload = z
  .object({
    prefLanguage: z.enum(["en", "th"]).optional(),
  })
  .refine((schema) => Object.keys(schema).length > 0, "Payload may not be empty")

// protected: user
export async function PATCH(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) return failure(401, "Not logged in")

    const payload = updateUserPayload.parse(await req.json())

    const updated = await userService.update(user.id, payload)
    if (!updated) throw new Error("Invalid user")
    return success<User>(updated)
  } catch (error) {
    if (error instanceof ZodError) return failure(400, "Invalid body")
    if (error instanceof Error && "code" in error && error.code === GrpcStatus.NOT_FOUND)
      return failure(404, "Not found")

    console.error("Error in PATCH /api/users/me:", error)
    return failure(500, "Internal server error")
  }
}
