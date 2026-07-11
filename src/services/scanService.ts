import { adminDb } from "@/firebase/admin"
import type { Club } from "@/types/club"
import type { Scan } from "@/types/scan"
import clubService from "@/services/clubService"
import featureFlagsService from "@/services/featureFlagService"
import { AppErrorCode } from "@/types/appErrorCode"
import { Timestamp, FieldValue } from "firebase-admin/firestore"

const scanCollection = adminDb.collection("scans").withConverter({
  fromFirestore: (snapshot) => snapshot.data() as Scan,
  toFirestore: (data: Scan) => data,
})

const SCORES = [67, 110, 169, 222, 278]

function rollScore(): number {
  return SCORES[Math.floor(Math.random() * SCORES.length)]
}

const scanService = {
  async scan(
    userId: string,
    userGroup: string,
    clubId: string
  ): Promise<
    | ({ success: true; club: Club } & Omit<Scan, "createdAt"> & { createdAt: string })
    | { success: false; error: AppErrorCode }
  > {
    const docRef = scanCollection.doc(`${userId}_${clubId}`)
    const groupDocRef = adminDb.collection("groups").doc(userGroup)

    const [groupDoc, club, flag] = await Promise.all([
      groupDocRef.get(),
      clubService.getClub(clubId),
      featureFlagsService.getFlag("game-clubscan"),
    ])

    if (!flag || !flag.enabled) {
      return { success: false, error: AppErrorCode.GAME_NOT_ACTIVE }
    }

    if (!groupDoc.exists) {
      return { success: false, error: AppErrorCode.GROUP_NOT_FOUND }
    }

    if (!club) {
      return { success: false, error: AppErrorCode.CLUB_NOT_FOUND }
    }

    const score = rollScore()
    const now = Timestamp.now()

    const scan: Scan = {
      userId,
      clubId,
      createdAt: now,
      score,
    }

    const batch = adminDb.batch()
    batch.create(docRef, scan)
    batch.update(groupDocRef, {
      scanScore: FieldValue.increment(score),
    })

    try {
      await batch.commit()
    } catch (error: unknown) {
      if (error instanceof Error && "code" in error && (error as { code: number }).code === 6) {
        return { success: false, error: AppErrorCode.ALREADY_SCANNED }
      }
      throw error
    }

    return {
      success: true,
      ...scan,
      // result in UTC timezone
      createdAt: now.toDate().toISOString(),
      club,
    }
  },
}

export default scanService
