import { adminDb } from "@/firebase/admin"
import type { PhaseDocument, RegistrationPhase, VishnuMissionPhase } from "@/types/phase"

const regisRef = adminDb.collection("phase").doc("regis")
const missionRef = adminDb.collection("phase").doc("vishnuMission")

type CachedPhase = PhaseDocument<string | null>
const CACHE_TTL_MS = Number(process.env.PHASE_CACHE_TTL_MS ?? 10000)
const cache = new Map<string, { doc: CachedPhase | null; expires: number }>()

async function getCachedPhase(
  key: string,
  ref: FirebaseFirestore.DocumentReference
): Promise<CachedPhase | null> {
  if (CACHE_TTL_MS > 0) {
    const hit = cache.get(key)
    if (hit && hit.expires > Date.now()) return hit.doc ? { ...hit.doc } : null
  }
  const doc = await ref.get()
  const data = doc.exists ? (doc.data() as CachedPhase) : null
  if (CACHE_TTL_MS > 0) cache.set(key, { doc: data, expires: Date.now() + CACHE_TTL_MS })
  return data ? { ...data } : null
}

/* ---------------- Registration ---------------- */

export async function getRegistrationPhase(): Promise<PhaseDocument<RegistrationPhase> | null> {
  return (await getCachedPhase("regis", regisRef)) as PhaseDocument<RegistrationPhase> | null
}

export async function updateRegistrationPhase(current: RegistrationPhase): Promise<void> {
  await regisRef.update({ current })
  cache.delete("regis")
}

export async function createRegistrationPhase(): Promise<void> {
  await regisRef.set({
    current: "firstdate",
  })
  cache.delete("regis")
}

/* ---------------- Vishnu Mission ---------------- */

/** `current: null` = missions disabled (no question open) */
export async function getMissionPhase(): Promise<PhaseDocument<VishnuMissionPhase | null> | null> {
  return (await getCachedPhase(
    "vishnuMission",
    missionRef
  )) as PhaseDocument<VishnuMissionPhase | null> | null
}

export async function updateMissionPhase(current: VishnuMissionPhase | null): Promise<void> {
  await missionRef.update({ current })
  cache.delete("vishnuMission")
}

export async function createMissionPhase(): Promise<void> {
  await missionRef.set({
    current: "mission-1",
  })
  cache.delete("vishnuMission")
}

/* ---------------- Both ---------------- */

export async function initializePhases(): Promise<void> {
  await Promise.all([createRegistrationPhase(), createMissionPhase()])
}
