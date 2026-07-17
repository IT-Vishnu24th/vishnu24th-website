import { adminDb } from "@/firebase/admin"
import type { Club } from "@/types/club"

const clubCollection = adminDb.collection("clubs").withConverter({
  fromFirestore: (snapshot) => snapshot.data() as Club,
  toFirestore: (data: Club) => data,
})

const CACHE_TTL_MS = Number(process.env.CLUB_CACHE_TTL_MS ?? 2 * 60 * 60_000) // 2h
const cache = new Map<string, { club: Club | null; expires: number }>()

const clubService = {
  async getClub(id: string): Promise<Club | null> {
    if (CACHE_TTL_MS > 0) {
      const hit = cache.get(id)
      if (hit && hit.expires > Date.now()) return hit.club ? { ...hit.club } : null
    }
    const data = (await clubCollection.doc(id).get()).data() ?? null
    if (CACHE_TTL_MS > 0) cache.set(id, { club: data, expires: Date.now() + CACHE_TTL_MS })
    return data ? { ...data } : null
  },
}

export default clubService
