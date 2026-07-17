import { cookies } from "next/headers"
import { adminAuth } from "@/firebase/admin"
import userService, { User, RawUser } from "@/services/userService"
import type { AuthUser } from "@/types/user"

/**
 * Load-test bypass for forged session cookies. Returns the studentId if the cookie
 * is a valid mock session, else null (caller falls through to real verification).
 *   dev:  mock-session:<studentId>            (no secret, convenience)
 *   prod: mock-session:<studentId>:<secret>   AND <secret> === MOCK_SESSION_SECRET
 * The secret is the whole gate: unset => prod bypass off; set => only holders of the
 * secret can forge. Never set MOCK_SESSION_SECRET on the real production deployment.
 */
export function resolveMockStudentId(
  sessionCookie: string,
  env: { NODE_ENV?: string; MOCK_SESSION_SECRET?: string }
): string | null {
  if (!sessionCookie.startsWith("mock-session:")) return null
  const rest = sessionCookie.slice("mock-session:".length)
  if (env.NODE_ENV === "development") return rest.split(":")[0] || null
  if (env.MOCK_SESSION_SECRET) {
    const [studentId, provided] = rest.split(":")
    if (provided === env.MOCK_SESSION_SECRET && studentId) return studentId
  }
  return null
}

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

    const mockId = resolveMockStudentId(sessionCookie, process.env)
    if (mockId) return mockId

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
