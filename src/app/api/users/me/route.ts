import { GrpcStatus } from "firebase-admin/firestore"
import z, { ZodError } from "zod"
import userService, { User } from "@/services/userService"
import { success, failure, protect, parseBody } from "@/utils/apiHelpers"
import { AppErrorCode } from "@/types/appErrorCode"
import type { NextRequest } from "next/server"

export async function GET() {
  try {
    const [error, user] = await protect()
    if (error) return error

    return success<User>(user)
  } catch (error) {
    console.error("Error in GET /api/users/me:", error)
    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}

const updateUserPayload = z
  .object({
    prefLanguage: z.enum(["en", "th"]),
    // one-way: accepting cannot be undone via the API
    yarnAccepted: z.literal(true),
  })
  .partial()
  .refine((schema) => Object.keys(schema).length > 0, "Payload may not be empty")

export async function PATCH(req: NextRequest) {
  try {
    const [error, user] = await protect()
    if (error) return error

    const [parseErr, payload] = await parseBody(req, updateUserPayload)
    if (parseErr) return parseErr

    const updated = await userService.update(user.id, payload)
    return success<User>(updated)
  } catch (error) {
    if (error instanceof ZodError) return failure(400, AppErrorCode.INVALID_BODY, "Invalid body")
    if (error instanceof Error && "code" in error && error.code === GrpcStatus.NOT_FOUND)
      return failure(404, AppErrorCode.USER_NOT_FOUND, "Not found")

    console.error("Error in PATCH /api/users/me:", error)
    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}
