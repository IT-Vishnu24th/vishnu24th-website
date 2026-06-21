import { adminDb } from "@/firebase/admin"
import groupService from "@/services/groupService"
import type { Name, User, UserRole } from "@/types/user"

export interface RawUser {
  id: string
  role: UserRole
  nameEn: Name
  nameTh: Name
  group: string
  departmentEn: string
  departmentTh: string
  prefLanguage: "en" | "th"
}

const userCollection = adminDb.collection("users").withConverter({
  fromFirestore: (snapshot) => snapshot.data() as RawUser,
  toFirestore: (data: RawUser) => data,
})

const userService = {
  /** exposes group; admin use only */
  async rawList(): Promise<RawUser[]> {
    const coll = await userCollection.get()
    return coll.docs.map((doc) => doc.data())
  },
  async getById(id: string): Promise<User | null> {
    const doc = await userCollection.doc(id).get()
    const data = doc.data()
    if (!data) return null
    const group = await groupService.getById(data.group)
    if (!group) {
      console.warn(`userService.getUser: broken ref: group '${data.group}' not found`)
      return null
    }
    return {
      ...data,
      group,
    }
  },
  async getRawById(id: string): Promise<RawUser | null> {
    const doc = await userCollection.doc(id).get()
    return doc.data() ?? null
  },
  async create(user: RawUser): Promise<string> {
    await userCollection.doc(user.id).set(user)
    return user.id
  },
}

export default userService
