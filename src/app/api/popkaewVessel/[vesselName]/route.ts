import { NextRequest } from "next/server"
import popkaewVesselService from "@/services/popkaewVesselService"
import { success, failure } from "@/utils/apiHelpers"
import { AppErrorCode } from "@/types/appErrorCode"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ vesselName: string }> }
) {
  try {
    const { vesselName } = await params
    const vessel = await popkaewVesselService.getById(vesselName)

    if (!vessel) {
      return failure(404, AppErrorCode.NOT_FOUND, "popkaewVessel not found")
    }

    return success({
      vesselName: vessel.vesselName,
      popkaewscore: vessel.popkaewscore,
      group: vessel.group,
    })
  } catch (error) {
    console.error("Get popkaewVessel error:", error)
    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}
