import { NextRequest } from "next/server"
import z from "zod"
import { success, failure, parseBody, protectRaw } from "@/utils/apiHelpers"
import {
  getRegistrationPhase,
  getMissionPhase,
  updateRegistrationPhase,
  updateMissionPhase,
} from "@/services/phaseService"
import { REGISTRATION_PHASES, VISHNU_MISSION_PHASES } from "@/types/phase"

export async function GET() {
  try {
    const [regis, vishnuMission] = await Promise.all([getRegistrationPhase(), getMissionPhase()])

    return success({
      regis,
      vishnuMission,
    })
  } catch (error) {
    console.error(error)
    return failure(500, "Failed to fetch phases")
  }
}

const patchPhaseSchema = z.object({
  regis: z.enum(REGISTRATION_PHASES).optional(),
  vishnuMission: z.enum(VISHNU_MISSION_PHASES).optional(),
})

export async function PATCH(req: NextRequest) {
  try {
    const [error] = await protectRaw("admin")
    if (error) return error

    const [parseErr, payload] = await parseBody(req, patchPhaseSchema)
    if (parseErr) return parseErr

    const { regis, vishnuMission } = payload

    const tasks: Promise<void>[] = []

    if (regis) {
      tasks.push(updateRegistrationPhase(regis))
    }

    if (vishnuMission) {
      tasks.push(updateMissionPhase(vishnuMission))
    }

    if (tasks.length === 0) {
      return failure(400, "No phase provided")
    }

    await Promise.all(tasks)

    const [updatedRegis, updatedMission] = await Promise.all([
      getRegistrationPhase(),
      getMissionPhase(),
    ])

    return success({
      message: "Phase updated successfully",
      regis: updatedRegis,
      vishnuMission: updatedMission,
    })
  } catch (error) {
    console.error(error)
    return failure(500, "Failed to update phase")
  }
}
