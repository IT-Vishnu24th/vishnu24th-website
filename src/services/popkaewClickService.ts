import { FieldValue } from "firebase-admin/firestore"
import { adminDb } from "@/firebase/admin"
import { popkaewPlayer } from "@/types/popkaewPlayer"

export async function click(playerId: string) {
  const playerRef = await adminDb.collection("popkaewPlayer").doc(playerId)

  let newScore = 0

  // Update player score and vessel score atomically
  await adminDb.runTransaction(async (transaction) => {
    const playerDoc = await transaction.get(playerRef)

    if (!playerDoc.exists) {
      throw new Error("Player not found")
    }

    const player = playerDoc.data() as popkaewPlayer

    const playergroup = await adminDb.collection("popkaewVessel").doc(player.group)

    transaction.update(playerRef, {
      popkaewscore: FieldValue.increment(1),
      lastClickAt: FieldValue.serverTimestamp(),
    })

    transaction.update(playergroup, {
      popkaewscore: FieldValue.increment(1),
    })

    newScore = player.popkaewscore + 1
  })

  return { score: newScore }
}
