import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import z from "zod"
import { adminAuth } from "@/firebase/admin"
import userService from "@/services/userService"

const STUDENT_EMAIL_PATTERN = /^6[89]\d{6}21@student\.chula\.ac\.th$/
const SESSION_EXPIRES_IN_MS = 1000 * 60 * 60 * 24 * 7 // 7 days

const sessionPayloadSchema = z.object({
  idToken: z.string(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parseResult = sessionPayloadSchema.safeParse(body)

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "missing-id-token", message: "Missing ID token" },
        { status: 400 }
      )
    }

    const { idToken } = parseResult.data

    // Verify ID token
    let studentId = ""
    let isMock = false

    const hasMockConfig = process.env.NODE_ENV === "development" && !!process.env.MOCK_AUTH_USER

    if (hasMockConfig && idToken === "mock-id-token") {
      studentId = process.env.MOCK_AUTH_USER!
      isMock = true
    } else {
      const decodedToken = await adminAuth.verifyIdToken(idToken)
      const email = decodedToken.email
      if (!email) {
        return NextResponse.json(
          { error: "email-not-provided", message: "No email found" },
          { status: 400 }
        )
      }

      if (hasMockConfig) {
        studentId = process.env.MOCK_AUTH_USER!
        isMock = true
      } else {
        // Validate email 68 or 69 and ends with 21
        if (!STUDENT_EMAIL_PATTERN.test(email)) {
          return NextResponse.json(
            { error: "invalid-email-domain", message: "This email is not a valid student account" },
            { status: 403 }
          )
        }
        studentId = email.split("@")[0]
      }
    }

    // Check if user in firestore
    const user = await userService.getRawById(studentId)
    if (!user) {
      return NextResponse.json(
        { error: "profile-not-found", message: "User does not exist" },
        { status: 404 }
      )
    }

    // Create session cookie
    let sessionCookie: string
    if (isMock) {
      sessionCookie = `mock-session:${studentId}`
    } else {
      sessionCookie = await adminAuth.createSessionCookie(idToken, {
        expiresIn: SESSION_EXPIRES_IN_MS,
      })
    }

    const cookieStore = await cookies()
    cookieStore.set("session", sessionCookie, {
      maxAge: SESSION_EXPIRES_IN_MS / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "lax",
      path: "/",
    })

    return NextResponse.json({ message: "Sign in successfully" }, { status: 200 })
  } catch (error) {
    const code = (error as { code?: string })?.code

    if (code?.startsWith("auth/")) {
      return NextResponse.json(
        { error: "invalid-id-token", message: "Invalid ID token" },
        { status: 401 }
      )
    }

    console.error("Session creation error:", error)

    return NextResponse.json(
      { error: "internal-server-error", message: "Sign in failed" },
      { status: 500 }
    )
  }
}
