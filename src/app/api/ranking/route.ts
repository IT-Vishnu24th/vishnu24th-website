import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { adminAuth } from "@/firebase/admin"
import groupService from "@/services/groupService"
import userService from "@/services/userService"
import featureFlagsService from "@/services/featureFlagService"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")?.value

    if (!sessionCookie) {
      return NextResponse.json(
        { error: "unauthorized", message: "Unauthorized access" },
        { status: 401 }
      )
    }

    let studentId = ""
    try {
      const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, false)
      studentId = decodedToken.email?.split("@")[0] || ""
    } catch {}

    if (!studentId) {
      return NextResponse.json(
        { error: "unauthorized", message: "Unauthorized access" },
        { status: 401 }
      )
    }

    const userData = await userService.getRawById(studentId)
    if (!userData) {
      return NextResponse.json(
        { error: "user-not-found", message: "User not found" },
        { status: 404 }
      )
    }

    const groups = await groupService.rawList()

    // Sort by score desc, then by label asc to keep order deterministic
    const sorted = [...groups].sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score
      }
      return a.label.localeCompare(b.label)
    })

    const showFullGroup = await featureFlagsService.getFlag("show-group")
    const top3 = sorted.slice(0, 3).map((g) => groupService.mapToPublic(g, showFullGroup))

    let userYaan = null
    if (userData.group) {
      const userGroupLabel = userData.group
      const userGroup = sorted.find((g) => g.label === userGroupLabel)
      if (userGroup) {
        const rank = sorted.filter((g) => g.score > userGroup.score).length + 1
        userYaan = {
          ...groupService.mapToPublic(userGroup, showFullGroup),
          rank,
        }
      }
    }

    return NextResponse.json({ top3, userYaan }, { status: 200 })
  } catch (error) {
    console.error("Failed to fetch ranking:", error)
    return NextResponse.json(
      { error: "internal-server-error", message: "Failed to fetch ranking" },
      { status: 500 }
    )
  }
}
