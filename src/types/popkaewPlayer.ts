import { Timestamp } from "firebase-admin/firestore"
import type { MultiLang } from "@/types/util"

export interface popkaewPlayer {
  name: string
  /** group label (doc id in `groups` and `popkaewVessel`); server-side only — never return in API responses */
  group: string
  /** denormalized display copy of the vessel's name */
  vesselName: MultiLang
  popkaewscore: number
  lastClickAt: Timestamp
}
