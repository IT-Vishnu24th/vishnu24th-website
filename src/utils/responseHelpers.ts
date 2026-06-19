import { NextResponse } from "next/server"
import { getAuthenticatedUser } from "@/lib/auth"
import type { ApiSuccess, ApiFailure } from "@/types/apiResponse"
import type { User, UserRole } from "@/types/user"

export const success = <T>(data: T) =>
  NextResponse.json({ data } satisfies ApiSuccess<T>, { status: 200 })

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
