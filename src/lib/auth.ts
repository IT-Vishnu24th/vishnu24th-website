import { cookies } from "next/headers"
import { adminAuth } from "@/firebase/admin"
import userService, { User, RawUser } from "@/services/userService"
import type { AuthUser } from "@/types/user"

/**
 * Extracts and verifies the student ID directly from the session cookie.
 */
async function getAuthenticatedStudentId(): Promise<string | null> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")?.value

    if (!sessionCookie) {
      return null
    }

    if (process.env.NODE_ENV === "development" && sessionCookie.startsWith("mock-session:")) {
      return sessionCookie.replace("mock-session:", "")
    }

    // FIXME: check revocation false for now
    const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, false)
    return decodedToken.email?.split("@")[0] || null
  } catch {
    return null
  }
}

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

/**
 * Retrieves the minimal user identity (id, role, group, prefLanguage) for the
 * client-side AuthProvider.  Avoids sending unnecessary data to the browser.
 */
export async function getAuthUser(): Promise<AuthUser | null> {
  const raw = await getAuthenticatedRawUser()
  if (!raw) return null
  return {
    id: raw.id,
    name: raw.name,
    role: raw.role,
    prefLanguage: raw.prefLanguage,
    yarnAccepted: raw.yarnAccepted ?? false,
  }
}
