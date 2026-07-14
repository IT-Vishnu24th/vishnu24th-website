import popkaewVesselService from "@/services/popkaewVesselService"
import groupService from "@/services/groupService"
import { success, failure, protectRaw, requireFlag } from "@/utils/apiHelpers"
import { AppErrorCode } from "@/types/appErrorCode"

export async function GET() {
  try {
    const [error, user] = await protectRaw("participant")
    if (error) return error

    const [flagErr] = await requireFlag("game-popkaew")
    if (flagErr) return flagErr

    const [vessels, group] = await Promise.all([
      popkaewVesselService.leaderboard(),
      groupService.getById(user.group),
    ])

    // index of the user's own vessel in `vessels`, so the client can highlight its row
    const idx = group ? vessels.findIndex((v) => v.vesselName.en === group.vesselName.en) : -1

    return success({ vessels, vesselIndex: idx === -1 ? null : idx })
  } catch (error) {
    console.error(error)

    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}
