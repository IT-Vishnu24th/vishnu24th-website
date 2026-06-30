import { Timestamp } from "firebase-admin/firestore"
import { User } from "./user"

export interface popkaewPlayer {
  name: string
  vessel: string
  group: string
  popkaewscore: number
  lastClickAt: Timestamp
}
