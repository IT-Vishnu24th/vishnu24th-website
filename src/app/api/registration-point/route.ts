import { NextRequest } from "next/server"
import { success, failure, protectRaw } from "@/utils/apiHelpers"
import { AppErrorCode } from "@/types/appErrorCode"
import userService from "@/services/userService"
import groupService from "@/services/groupService"
import type { RegistrationPointResponse } from "@/types/registrationPoint"
import { getRegistrationPhase } from "@/services/phaseService"
import { REGISTRATION_PHASES } from "@/types/phase"
import { getLocationDisplayName, getRoomDisplayName } from "@/utils/registrationPoint"

const isRegistrationPhase = (phase: string): phase is (typeof REGISTRATION_PHASES)[number] =>
  REGISTRATION_PHASES.includes(phase as (typeof REGISTRATION_PHASES)[number])

const getRegistrationTime = (phase: (typeof REGISTRATION_PHASES)[number]) => {
  if (phase === "firstdate") return "12:30-13:00"
  if (phase === "vishnu-d1") return "08:00-08:45"
  if (phase === "vishnu-d2") return "08:30-09:00"
  return "09:00-09:30"
}

export async function GET(req: NextRequest) {
  const studentId = req.nextUrl.searchParams.get("studentId")?.trim()

  try {
    const user = studentId ? await userService.getRawById(studentId) : null
    const currentUserResult = studentId ? null : await protectRaw()

    if (currentUserResult?.[0]) return currentUserResult[0]

    const resolvedUser = user ?? currentUserResult?.[1]
    if (!resolvedUser) {
      return failure(404, AppErrorCode.USER_NOT_FOUND, "User not found")
    }

    const [group, regisPhase] = await Promise.all([
      groupService.getById(resolvedUser.group),
      getRegistrationPhase(),
    ])
    if (!group?.registrationPoint) {
      return failure(
        404,
        AppErrorCode.REGISTRATION_POINT_NOT_FOUND,
        "Registration point not found for user's group"
      )
    }
    if (!regisPhase) {
      return failure(404, AppErrorCode.MISSING_PHASE, "Registration phase not found")
    }

    const phase = regisPhase.current
    if (!isRegistrationPhase(phase)) {
      return failure(400, AppErrorCode.MISSING_PHASE, "Unknown registration phase")
    }

    const usesRoom = phase === "vishnu-d2" || phase === "vishnu-d3" || phase === "vishnu-d4"
    const registrationLocationId = usesRoom
      ? group.room.locationId
      : group.registrationPoint[phase === "firstdate" ? "firstdate" : "vishnu"]
    const roomName = usesRoom ? group.room.name : undefined
    const displayLabel =
      phase === "firstdate"
        ? `กลุ่มที่ ${group.registrationPoint.package}`
        : group.vesselName.th || group.vesselName.en || group.label

    return success<RegistrationPointResponse>({
      ...group.registrationPoint,
      room: group.room,
      phase,
      registrationLocationId,
      registrationLocation: {
        source: usesRoom ? "room" : "registrationPoint",
        locationId: registrationLocationId,
        roomName,
        displayName: usesRoom
          ? `${getLocationDisplayName(registrationLocationId, "th")} ${getRoomDisplayName(roomName, "th")}`
          : getLocationDisplayName(registrationLocationId, "th"),
      },
      registrationTime: getRegistrationTime(phase),
      displayLabel,
      groupLabel: group.label,
      vesselName: group.vesselName,
    })
  } catch (error) {
    console.error(`Failed to fetch registration point for user ${studentId ?? "me"}:`, error)
    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}
