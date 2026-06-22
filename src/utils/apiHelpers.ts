import { NextResponse } from "next/server"
import z from "zod"
import { getAuthenticatedUser } from "@/lib/auth"
import type {
  ApiSuccess,
  ApiPaginatedSuccess,
  ApiFailure,
  PaginationMeta,
} from "@/types/apiResponse"
import type { User, UserRole } from "@/types/user"

export const success = <T>(data: T) =>
  NextResponse.json({ data } satisfies ApiSuccess<T>, { status: 200 })

export const successPaginated = <T>(data: T[], pagination: PaginationMeta) =>
  NextResponse.json({ data, pagination } satisfies ApiPaginatedSuccess<T>, { status: 200 })

export const failure = (status: number, message: string) =>
  NextResponse.json({ message } satisfies ApiFailure, { status })

export type ProtectResult = [error: NextResponse, null] | [null, user: User]
export const protect = async (role?: UserRole): Promise<ProtectResult> => {
  const user = await getAuthenticatedUser()
  if (!user) return [failure(401, "Not logged in"), null]
  if (role) {
    if (user.role !== "admin" && user.role !== role) {
      return [failure(403, "Forbidden"), null]
    }
  }
  return [null, user]
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
