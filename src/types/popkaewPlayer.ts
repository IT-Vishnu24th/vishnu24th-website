import { Timestamp } from "firebase-admin/firestore"

export interface popkaewPlayer {
  name: string
  vessel: string
  popkaewscore: number
  lastClickAt: Timestamp
}
