import { adminDb } from "@/firebase/admin"
import groupService from "@/services/groupService"
<<<<<<< HEAD
import featureFlagsService from "@/services/featureFlagService"
=======
import { makePaginationMeta, type PaginationInput } from "@/utils/apiHelpers"
import type { PaginationMeta } from "@/types/apiResponse"
>>>>>>> d327aee (add phase endpoints)
import type { Name, User, UserRole } from "@/types/user"
export type * from "@/types/user"

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

const populateGroup = async (user: RawUser): Promise<User> => {
  const group = await groupService.getById(user.group)
  if (!group) {
    // broken ref: should respond 500
    throw new Error(`Broken ref in users/${user.id}: group '${user.group}' not found`)
  }
<<<<<<< HEAD
  const flag = await featureFlagsService.getFlag("show-group")
  const showFullGroup = flag?.enabled ?? false
  return {
    ...user,
    group: groupService.mapToPublic(group, showFullGroup),
=======
  return {
    ...user,
    group,
>>>>>>> d327aee (add phase endpoints)
  }
}

const userService = {
<<<<<<< HEAD
  /** exposes group; admin use only */
  async rawList(): Promise<RawUser[]> {
    const coll = await userCollection.get()
    return coll.docs.map((doc) => doc.data())
=======
  // TODO: support filtering, searching, & sorting. create extra field of lowercased, composed names used for case-insensitive searching, and easy sorting
  /** exposes group; admin use only */
  async rawList({ page, limit = 50 }: PaginationInput): Promise<[RawUser[], PaginationMeta]> {
    const coll = await userCollection
      .offset(page * limit)
      .limit(limit)
      .get()
    const total = (await userCollection.count().get()).data().count
    return [
      coll.docs.map((doc) => doc.data()),
      makePaginationMeta(total, coll.docs.length, page, limit),
    ]
>>>>>>> d327aee (add phase endpoints)
  },

  async getById(id: string): Promise<User | null> {
    const doc = await userCollection.doc(id).get()
    const data = doc.data()
    if (!data) return null
    return populateGroup(data)
  },
<<<<<<< HEAD
  async getRawById(id: string): Promise<RawUser | null> {
    const doc = await userCollection.doc(id).get()
    return doc.data() ?? null
  },
=======
>>>>>>> d327aee (add phase endpoints)

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
