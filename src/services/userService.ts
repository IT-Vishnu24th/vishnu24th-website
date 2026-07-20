import { adminDb } from "@/firebase/admin"
import groupService from "@/services/groupService"
import featureFlagsService from "@/services/featureFlagService"
import type { Name, User, UserRole, UserAnswers } from "@/types/user"
import type { MultiLang } from "@/types/util"
export type * from "@/types/user"

export interface RawUser {
  id: string
  role: UserRole
  name: MultiLang<Name>
  group: string
  department: MultiLang
  prefLanguage: "en" | "th"
  yarnAccepted?: boolean
  answers?: UserAnswers
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
  const revealVessel = await featureFlagsService.isEnabled("reveal-vessel")
  // explicit allowlist: RawUser fields like `answers` must not leak into the public User
  return {
    id: user.id,
    role: user.role,
    name: user.name,
    department: user.department,
    prefLanguage: user.prefLanguage,
    yarnAccepted: user.yarnAccepted ?? false,
    group: groupService.mapToPublic(group, revealVessel),
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

  /** pure — fills gaps in an already-fetched RawUser's answers (e.g. from protectRaw),
   * avoiding a redundant re-read of the same user doc just fetched */
  normalizeAnswers(ans?: Partial<UserAnswers>): UserAnswers {
    return {
      q1: ans?.q1 ?? null,
      q2: ans?.q2 ?? null,
      q3: ans?.q3 ?? null,
      q4: ans?.q4 ?? null,
      q5: ans?.q5 ?? null,
      q6: ans?.q6 ?? null,
      q7: ans?.q7 ?? null,
    }
  },

  async submitAnswer(id: string, questionId: string, answer: string | string[]): Promise<void> {
    const ref = userCollection.doc(id)
    await ref.update({
      [`answers.${questionId}`]: answer,
    })
  },
}

export default userService
