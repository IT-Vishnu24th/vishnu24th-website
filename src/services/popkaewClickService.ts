import { FieldValue } from "firebase-admin/firestore"
import { adminDb } from "@/firebase/admin"
import { popkaewPlayer } from "@/types/popkaewPlayer"

export async function click(playerId: string, amount = 1) {
  const playerRef = await adminDb.collection("popkaewPlayer").doc(playerId)
  const clickAmount = Math.max(1, Math.floor(amount))

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
      popkaewscore: FieldValue.increment(clickAmount),
      lastClickAt: FieldValue.serverTimestamp(),
    })

    transaction.update(playergroup, {
      popkaewscore: FieldValue.increment(clickAmount),
    })

    newScore = player.popkaewscore + clickAmount
  })

  return { score: newScore, amount: clickAmount }
}
