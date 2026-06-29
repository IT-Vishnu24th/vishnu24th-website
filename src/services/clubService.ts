import { adminDb } from "@/firebase/admin"
import type { Club } from "@/types/club"
import type { Scan } from "@/types/scan"

import { Timestamp, FieldValue } from "firebase-admin/firestore"

const clubCollection = adminDb.collection("clubs").withConverter({
  fromFirestore: (snapshot) => snapshot.data() as Club,
  toFirestore: (data: Club) => data,
})

const scanCollection = adminDb.collection("scans").withConverter({
  fromFirestore: (snapshot) => snapshot.data() as Scan,
  toFirestore: (data: Scan) => data,
})

export const SCORES = [67, 110, 169, 222, 278]

export function rollScore(): number {
  return SCORES[Math.floor(Math.random() * SCORES.length)]
}

const clubService = {
  async getClub(id: string): Promise<Club | null> {
    return (await clubCollection.doc(id).get()).data() ?? null
  },

  async scan(
    userId: string,
    userGroup: string,
    clubId: string
  ): Promise<
    | ({ success: true; club: Club } & Omit<Scan, "createdAt"> & { createdAt: string })
    | { success: false; error: string }
  > {
    const docRef = scanCollection.doc(`${userId}_${clubId}`)
    const clubDocRef = clubCollection.doc(clubId)
    const groupDocRef = adminDb.collection("groups").doc(userGroup)

    // Check existence outside transaction to prevent lock contention under load?
    // CAUTION: Assumes no deletes in prod :skull:
    const [groupDoc, clubDoc] = await Promise.all([groupDocRef.get(), clubDocRef.get()])

    if (!groupDoc.exists) {
      return { success: false, error: "group-not-found" }
    }

    const club = clubDoc.data()
    if (!club) {
      return { success: false, error: "club-not-found" }
    }

    const score = rollScore()
    const now = Timestamp.now()

    return adminDb.runTransaction(async (transaction) => {
      const scanDoc = await transaction.get(docRef)

      if (scanDoc.exists) {
        return { success: false, error: "already-scanned" }
      }

      const scan: Scan = {
        userId,
        clubId,
        createdAt: now,
        score,
      }

      transaction.set(docRef, scan)

      transaction.update(groupDocRef, {
        scanScore: FieldValue.increment(score),
      })

      return {
        success: true,
        ...scan,
        // result in UTC timezone
        createdAt: now.toDate().toISOString(),
        club,
      }
    })
  },
}

export default clubService
