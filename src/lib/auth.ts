import { cookies } from "next/headers"
import { adminAuth } from "@/firebase/admin"
import { User } from "@/types/user"
import userService from "@/services/userService"

/**
 * Retrieves the currently authenticated user from the session cookie.
 * This helper is server-only (React Server Components, API route handlers, Server Actions).
 */
export async function getAuthenticatedUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")?.value

    if (!sessionCookie) {
      return null
    }

    // FIXME: check revocation false for now
    const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, false)
    const email = decodedToken.email

    if (!email) {
      return null
    }

    const studentId = email.split("@")[0]
    const user = await userService.getById(studentId)
    return user
  } catch {
    return null
  }
}
