import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/firebase/admin"
import { popkaewPlayer } from "@/types/popkaewPlayer"
import popkaewPlayerService from "@/services/popKaewPlayerServices"
import userService, { RawUser } from "@/services/userService"
import { User } from "@/types/user"

import { Timestamp } from "firebase-admin/firestore"
import { success, failure, protectRaw } from "@/utils/apiHelpers"
import { popkaewVessel } from "@/types/popkaewVessel"
import popkaewVesselService from "@/services/popkaewVesselService"
import groupService, { Group } from "@/services/groupService"

export async function GET(req: NextRequest) {
  try {
    const vesselDoc = await popkaewVesselService.rawList()
    return NextResponse.json(vesselDoc)
  } catch (error) {
    console.error("Get popkaewVessel error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { group } = body ?? {}
    const groupVessel = await adminDb.collection("groups").doc(group).get()
    const data: Group = groupVessel.data() as Group
    if (!group) {
      return NextResponse.json({ error: "group are required" }, { status: 400 })
    }

    const popkaewVesselDoc = await adminDb.collection("popkaewVessel").doc(data.vesselName.en).get()
    if (popkaewVesselDoc.exists) {
      return NextResponse.json({ Message: "Document already exists" })
    }

    const newPopkaewVessel: popkaewVessel = {
      vesselName: data.vesselName,
      popkaewscore: 0,
      group: data.label,
    }

    const create = popkaewVesselService.create(newPopkaewVessel)
    create
    return NextResponse.json({ Message: "Add popkaewVessel Successfully" })
  } catch (error) {
    console.error(error)

    return failure(500, "Internal server error")
  }
}
