import { cookies } from "next/headers"
import { adminAuth } from "@/firebase/admin"
<<<<<<< HEAD
import userService, { User, RawUser } from "@/services/userService"

/**
 * Extracts and verifies the student ID directly from the session cookie.
 */
async function getAuthenticatedStudentId(): Promise<string | null> {
=======
import userService, { User } from "@/services/userService"

/**
 * Retrieves the currently authenticated user from the session cookie.
 * This helper is server-only (React Server Components, API route handlers, Server Actions).
 */
export async function getAuthenticatedUser(): Promise<User | null> {
>>>>>>> d327aee (add phase endpoints)
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")?.value

    if (!sessionCookie) {
      return null
    }

    // FIXME: check revocation false for now
    const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, false)
<<<<<<< HEAD
    return decodedToken.email?.split("@")[0] || null
=======
    const email = decodedToken.email

    if (!email) {
      return null
    }

    const studentId = email.split("@")[0]
    const user = await userService.getById(studentId)
    return user
>>>>>>> d327aee (add phase endpoints)
  } catch {
    return null
  }
}
<<<<<<< HEAD

/**
 * Retrieves the fully resolved user record (including resolving group references)
 * from the session cookie.
 */
export async function getAuthenticatedUser(): Promise<User | null> {
  const studentId = await getAuthenticatedStudentId()
  if (!studentId) return null
  return userService.getById(studentId)
}

/**
 * Retrieves the raw user record (without resolving nested group objects)
 * from the session cookie.
 */
export async function getAuthenticatedRawUser(): Promise<RawUser | null> {
  const studentId = await getAuthenticatedStudentId()
  if (!studentId) return null
  return userService.getRawById(studentId)
}
=======
>>>>>>> d327aee (add phase endpoints)
