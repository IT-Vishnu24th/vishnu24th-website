import { FieldValue, Timestamp } from "firebase-admin/firestore"
import { adminDb } from "@/firebase/admin"
import { POPKAEW_BUCKET_CAPACITY, POPKAEW_REFILL_TIME_MS } from "@/services/popkaewConstants"
import { popkaewPlayer } from "@/types/popkaewPlayer"

export async function click(playerId: string, clickCount: number) {
  if (clickCount <= 0) {
    throw new Error("Invalid click count")
  }

  if (clickCount > POPKAEW_BUCKET_CAPACITY) {
    throw new Error("Click count exceeds bucket capacity")
  }

  const playerRef = adminDb.collection("popkaewPlayer").doc(playerId)

  let newScore = 0

  await adminDb.runTransaction(async (transaction) => {
    const playerDoc = await transaction.get(playerRef)

    if (!playerDoc.exists) {
      throw new Error("Player not found")
    }

    const player = playerDoc.data() as popkaewPlayer

    // -------------------------
    // Token Bucket
    // -------------------------

    let token = player.token

    const now = Timestamp.now()

    const lastClick = player.lastClickAt instanceof Timestamp ? player.lastClickAt : Timestamp.now()

    const elapsed = now.toMillis() - lastClick.toMillis()

    // Refill bucket after 5 seconds
    if (elapsed >= POPKAEW_REFILL_TIME_MS) {
      token = POPKAEW_BUCKET_CAPACITY
    }

    // Not enough tokens
    if (clickCount > token) {
      throw new Error("Rate limit exceeded")
    }

    // Consume tokens
    token -= clickCount

    // -------------------------
    // Update player
    // -------------------------

    const vesselRef = adminDb.collection("popkaewVessel").doc(player.group)

    transaction.update(playerRef, {
      popkaewscore: FieldValue.increment(clickCount),
      token,
      lastClickAt: now,
    })

    // -------------------------
    // Update vessel
    // -------------------------

    transaction.update(vesselRef, {
      popkaewscore: FieldValue.increment(clickCount),
    })

    newScore = player.popkaewscore + clickCount
  })

  return {
    score: newScore,
  }
}
