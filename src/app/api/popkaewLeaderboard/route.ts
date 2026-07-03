import popkaewVesselService from "@/services/popkaewVesselService"
import { success, failure, protectRaw } from "@/utils/apiHelpers"

export async function GET() {
  try {
    const [error] = await protectRaw("participant")
    if (error) return error

    const leaderboard = await popkaewVesselService.leaderboard()

    return success(leaderboard)
  } catch (error) {
    console.error(error)

    return failure(500, "Internal server error")
  }
}
