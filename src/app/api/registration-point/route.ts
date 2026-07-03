import { NextRequest } from "next/server"
import { success, failure } from "@/utils/apiHelpers"
import userService from "@/services/userService"
import groupService from "@/services/groupService"
import type { RegistrationPointResponse } from "@/types/registrationPoint"

export async function GET(req: NextRequest) {
  const studentId = req.nextUrl.searchParams.get("studentId")
  if (!studentId) {
    return failure(400, "Missing required query parameter: studentId")
  }

  try {
    const user = await userService.getRawById(studentId)
    if (!user) {
      return failure(404, "User not found")
    }

    const group = await groupService.getById(user.group)
    if (!group?.registrationPoint) {
      return failure(404, "Registration point not found for user's group")
    }

    return success<RegistrationPointResponse>({ ...group.registrationPoint, room: group.room })
  } catch (error) {
    console.error(`Failed to fetch registration point for user ${studentId}:`, error)
    return failure(500, "Internal server error")
  }
}
