import { NextResponse, type NextRequest } from "next/server"
import z from "zod"
import { getAuthenticatedUser, getAuthenticatedRawUser } from "@/lib/auth"
import type {
  ApiSuccess,
  ApiPaginatedSuccess,
  ApiFailure,
  PaginationMeta,
} from "@/types/apiResponse"
import { AppErrorCode } from "@/types/appErrorCode"
import type { User, UserRole } from "@/types/user"
import type { RawUser } from "@/services/userService"

export const success = <T>(data: T) =>
  NextResponse.json({ data } satisfies ApiSuccess<T>, { status: 200 })

export const successPaginated = <T>(data: T[], pagination: PaginationMeta) =>
  NextResponse.json({ data, pagination } satisfies ApiPaginatedSuccess<T>, { status: 200 })

export const failure = (status: number, code: AppErrorCode, message: string) =>
  NextResponse.json({ code, message } satisfies ApiFailure, { status })

type MiddlewareResult<T> = [error: NextResponse, null] | [null, result: T]

export type ProtectResult = MiddlewareResult<User>
export const protect = async (role?: UserRole): Promise<ProtectResult> => {
  const user = await getAuthenticatedUser()
  if (!user) return [failure(401, AppErrorCode.UNAUTHORIZED, "Not logged in"), null]
  if (role) {
    if (user.role !== "admin" && user.role !== role) {
      return [failure(403, AppErrorCode.FORBIDDEN, "Forbidden"), null]
    }
  }
  return [null, user]
}

export type ProtectRawResult = MiddlewareResult<RawUser>
export const protectRaw = async (role?: UserRole): Promise<ProtectRawResult> => {
  const user = await getAuthenticatedRawUser()
  if (!user) return [failure(401, AppErrorCode.UNAUTHORIZED, "Not logged in"), null]
  if (role) {
    if (user.role !== "admin" && user.role !== role) {
      return [failure(403, AppErrorCode.FORBIDDEN, "Forbidden"), null]
    }
  }
  return [null, user]
}

export const parseBody = async <T>(
  req: NextRequest,
  schema: z.ZodType<T>
): Promise<MiddlewareResult<T>> => {
  try {
    const payload = schema.parse(await req.json())
    return [null, payload]
  } catch {
    return [failure(400, AppErrorCode.INVALID_BODY, "Invalid body"), null]
  }
}

export const paginationSchema = z.object({
  page: z.coerce.number().int().catch(0),
  limit: z.coerce.number().int().optional().catch(undefined),
})

export type PaginationInput = z.infer<typeof paginationSchema>

export const makePaginationMeta = (
  total: number,
  count: number,
  page: number,
  limit: number
): PaginationMeta => ({
  total,
  count,
  page,
  next: page * limit + count < total ? page + 1 : null,
  prev: page > 0 ? page - 1 : null,
})
