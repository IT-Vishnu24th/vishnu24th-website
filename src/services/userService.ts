import { adminDb } from "@/firebase/admin"
import groupService from "@/services/groupService"
import featureFlagsService from "@/services/featureFlagService"
import type { Name, User, UserRole } from "@/types/user"
import type { MultiLang } from "@/types/util"
export type * from "@/types/user"

export interface RawUser {
  id: string
  role: UserRole
  name: MultiLang<Name>
  group: string
  department: MultiLang
  prefLanguage: "en" | "th"
}

const userCollection = adminDb.collection("users").withConverter({
  fromFirestore: (snapshot) => snapshot.data() as RawUser,
  toFirestore: (data: RawUser) => data,
})

const populateGroup = async (user: RawUser): Promise<User> => {
  const group = await groupService.getById(user.group)
  if (!group) {
    // broken ref: should respond 500
    throw new Error(`Broken ref in users/${user.id}: group '${user.group}' not found`)
  }
  const flag = await featureFlagsService.getFlag("show-group")
  const showFullGroup = flag?.enabled ?? false
  return {
    ...user,
    group: groupService.mapToPublic(group, showFullGroup),
  }
}

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
    return populateGroup(data)
  },
  async getRawById(id: string): Promise<RawUser | null> {
    const doc = await userCollection.doc(id).get()
    return doc.data() ?? null
  },

  async create(user: RawUser): Promise<User> {
    const ref = userCollection.doc(user.id)
    await ref.create(user)

    const result = await ref.get()
    const data = result.data()
    if (!data) throw new Error("Document should exist") // should never happen
    return populateGroup(data)
  },

  async update(id: string, user: Partial<Omit<RawUser, "id">>): Promise<User> {
    const ref = userCollection.doc(id)
    await ref.update(user)

    const result = await ref.get()
    const data = result.data()
    if (!data) throw new Error("Document should exist") // should never happen
    return populateGroup(data)
  },
}

export default userService
