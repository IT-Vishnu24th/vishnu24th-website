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

    const groupDoc = await groupDocRef.get()
    if (!groupDoc.exists) {
      return { success: false, error: "group-not-found" }
    }

    return adminDb.runTransaction(async (transaction) => {
      const [scanDoc, clubDoc] = await Promise.all([
        transaction.get(docRef),
        transaction.get(clubDocRef),
      ])

      if (scanDoc.exists) {
        return { success: false, error: "already-scanned" }
      }

      const club = clubDoc.data()
      if (!club) {
        return { success: false, error: "club-not-found" }
      }

      const score = rollScore()
      const now = Timestamp.now()

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
        // result in Asia/Bangkok timezone
        createdAt: new Date(now.toDate().getTime() + 7 * 60 * 60 * 1000)
          .toISOString()
          .replace("Z", "+07:00"),
        club,
      }
    })
  },
}

export default clubService
