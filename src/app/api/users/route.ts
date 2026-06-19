import { ZodError } from "zod"
import userService, { type RawUser } from "@/services/userService"
import { successPaginated, failure, protect, paginationSchema } from "@/utils/apiHelpers"
import type { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const [error] = await protect("admin")
    if (error) return error

    const searchParams = Object.fromEntries(req.nextUrl.searchParams)
    const paginationInput = paginationSchema.parse(searchParams)

    const [users, pagination] = await userService.rawList(paginationInput)
    return successPaginated<RawUser>(users, pagination)
  } catch (error) {
    if (error instanceof ZodError) return failure(400, "Invalid body")

    console.error(`Error in GET /api/users:`, error)
    failure(500, "Internal server error")
  }
}
