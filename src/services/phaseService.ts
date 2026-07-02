import { adminDb } from "@/firebase/admin"
import type { PhaseDocument, RegistrationPhase, VishnuMissionPhase } from "@/types/phase"

const phaseCollection = adminDb.collection("phase")

const regisRef = phaseCollection.doc("regis")
const missionRef = phaseCollection.doc("vishnuMission")

/* ---------------- Registration ---------------- */

export async function getRegistrationPhase(): Promise<PhaseDocument<RegistrationPhase> | null> {
  const doc = await regisRef.get()

  if (!doc.exists) return null

  return doc.data() as PhaseDocument<RegistrationPhase>
}

export async function updateRegistrationPhase(current: RegistrationPhase): Promise<void> {
  await regisRef.update({ current })
}

export async function createRegistrationPhase(): Promise<void> {
  await regisRef.set({
    current: "firstdate",
    values: ["firstdate", "vishnu-1", "vishnu-2", "vishnu-3", "vishnu-4"],
  })
}

/* ---------------- Vishnu Mission ---------------- */

export async function getMissionPhase(): Promise<PhaseDocument<VishnuMissionPhase> | null> {
  const doc = await missionRef.get()

  if (!doc.exists) return null

  return doc.data() as PhaseDocument<VishnuMissionPhase>
}

export async function updateMissionPhase(current: VishnuMissionPhase): Promise<void> {
  await missionRef.update({ current })
}

export async function createMissionPhase(): Promise<void> {
  await missionRef.set({
    current: "mission-1",
    values: [
      "mission-1",
      "mission-2",
      "mission-3",
      "mission-4",
      "mission-5",
      "mission-6",
      "mission-7",
    ],
  })
}

/* ---------------- Both ---------------- */

export async function initializePhases(): Promise<void> {
  await Promise.all([createRegistrationPhase(), createMissionPhase()])
}
