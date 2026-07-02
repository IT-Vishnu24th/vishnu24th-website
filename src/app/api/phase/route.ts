import { NextRequest, NextResponse } from "next/server"

import {
  getRegistrationPhase,
  getMissionPhase,
  updateRegistrationPhase,
  updateMissionPhase,
} from "@/services/phaseService"

export async function GET() {
  try {
    const [regis, vishnuMission] = await Promise.all([getRegistrationPhase(), getMissionPhase()])

    return NextResponse.json({
      regis,
      vishnuMission,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: "Failed to fetch phases",
      },
      {
        status: 500,
      }
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()

    const { regis, vishnuMission } = body

    const tasks: Promise<void>[] = []

    if (regis) {
      tasks.push(updateRegistrationPhase(regis))
    }

    if (vishnuMission) {
      tasks.push(updateMissionPhase(vishnuMission))
    }

    if (tasks.length === 0) {
      return NextResponse.json(
        {
          error: "No phase provided",
        },
        {
          status: 400,
        }
      )
    }

    await Promise.all(tasks)

    const [updatedRegis, updatedMission] = await Promise.all([
      getRegistrationPhase(),
      getMissionPhase(),
    ])

    return NextResponse.json({
      message: "Phase updated successfully",
      regis: updatedRegis,
      vishnuMission: updatedMission,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: "Failed to update phase",
      },
      {
        status: 500,
      }
    )
  }
}
