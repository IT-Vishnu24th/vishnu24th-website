import type { Timestamp } from "firebase-admin/firestore"

export interface Scan {
  userId: string
  clubId: string
  createdAt: Timestamp
  score: number
}

export interface ScanResponse {
  createdAt: string
  code: string
  score: number
}
