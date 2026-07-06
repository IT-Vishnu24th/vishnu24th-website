import groupService, { type CommitScanBonusResult } from "@/services/groupService"
import { failure, protectRaw, success } from "@/utils/apiHelpers"

export async function PUT() {
  try {
    const [error] = await protectRaw("admin")
    if (error) return error

    const result = await groupService.setScanBonuses()
    return success<CommitScanBonusResult[]>(result)
  } catch (error) {
    console.error("Error in PUT /api/users/commitScanBonus:", error)
    return failure(500, "Internal server error")
  }
}
