import { NextRequest } from "next/server"
import { success, failure } from "@/utils/apiHelpers"
import userService from "@/services/userService"
import type { RegistrationPoint } from "@/types/registrationPoint"

export async function GET(
  req: NextRequest,
  { params }: RouteContext<"/api/users/[id]/registration-point">
) {
  const { id } = await params
  try {
    const user = await userService.getById(id)
    if (!user) {
      return failure(404, "User not found")
    }
    if (user.role !== "participant") {
      return failure(403, "Forbidden")
    }

    const registrationPoint = user.group.registrationPoint
    if (!registrationPoint) {
      return failure(404, "Registration point not found for user's group")
    }

    return success<RegistrationPoint>(registrationPoint)
  } catch (error) {
    console.error(`Failed to fetch registration point for user ${id}:`, error)
    return failure(500, "Internal server error")
  }
}
