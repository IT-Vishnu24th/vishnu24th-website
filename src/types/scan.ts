import type { Timestamp } from "firebase-admin/firestore"
import type { Club } from "./club"

export interface Scan {
  userId: string
  clubId: string
  createdAt: Timestamp
  score: number
}

export interface ScanResponse {
  createdAt: string
  club: Club
  score: number
}
