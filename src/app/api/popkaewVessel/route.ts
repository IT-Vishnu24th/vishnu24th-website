import { NextRequest } from "next/server"
import { popkaewVessel } from "@/types/popkaewVessel"
import { success, failure } from "@/utils/apiHelpers"
import { AppErrorCode } from "@/types/appErrorCode"
import popkaewVesselService from "@/services/popkaewVesselService"
import groupService from "@/services/groupService"

export async function GET() {
  try {
    const vesselDoc = await popkaewVesselService.rawList()
    return success(vesselDoc)
  } catch (error) {
    console.error("Get popkaewVessel error:", error)
    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { group } = body ?? {}

    if (!group) {
      return failure(400, AppErrorCode.INVALID_BODY, "group are required")
    }

    const data = await groupService.getById(group)
    if (!data) {
      return failure(404, AppErrorCode.GROUP_NOT_FOUND, "Group not found")
    }

    const existing = await popkaewVesselService.getById(data.vesselName.en)
    if (existing) {
      return success({ message: "Document already exists" })
    }

    const newPopkaewVessel: popkaewVessel = {
      vesselName: data.vesselName,
      popkaewscore: 0,
      group: data.label,
    }

    await popkaewVesselService.create(newPopkaewVessel)
    return success({ message: "Add popkaewVessel Successfully" })
  } catch (error) {
    console.error(error)
    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}
