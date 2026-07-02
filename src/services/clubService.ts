import { adminDb } from "@/firebase/admin"
import type { Club } from "@/types/club"

const clubCollection = adminDb.collection("clubs").withConverter({
  fromFirestore: (snapshot) => snapshot.data() as Club,
  toFirestore: (data: Club) => data,
})

const clubService = {
  async getClub(id: string): Promise<Club | null> {
    return (await clubCollection.doc(id).get()).data() ?? null
  },
}

export default clubService
