import { FieldValue } from "firebase-admin/firestore"
import { adminDb } from "@/firebase/admin"
import { popkaewPlayer } from "@/types/popkaewPlayer"
import { popkaewVessel } from "@/types/popkaewVessel"

export async function click(playerId: string) {
  const playerRef = adminDb.collection("popkaewPlayer").doc(playerId)

  let newScore = 0

  // Update player score and vessel score atomically
  await adminDb.runTransaction(async (transaction) => {
    const playerDoc = await transaction.get(playerRef)

    if (!playerDoc.exists) {
      throw new Error("Player not found")
    }

    const player = playerDoc.data() as popkaewPlayer

    const playergroup = adminDb.collection("popkaewVessel").doc(player.vessel)

    transaction.update(playerRef, {
      popkaewscore: FieldValue.increment(1),
      lastClickAt: FieldValue.serverTimestamp(),
    })

    transaction.update(playergroup, {
      popkaewscore: FieldValue.increment(1),
    })

    newScore = player.popkaewscore + 1
  })

  // Read Top 3 vessels
  const leaderboardSnapshot = await adminDb
    .collection("popkaewVessel")
    .orderBy("popkaewscore", "desc")
    .limit(3)
    .get()

  const top3 = leaderboardSnapshot.docs.map((doc, index) => ({
    ...(doc.data() as popkaewVessel),
    rank: index + 1,
  }))

  // Update leaderboard document
  await adminDb.collection("popkaewLeaderboard").doc("vessel").set({
    top3,
    rank: null,
  })

  return {
    success: true,
    score: newScore,
    leaderboard: top3,
  }
}
