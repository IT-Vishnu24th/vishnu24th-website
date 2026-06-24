export interface Group {
  label: string
  vesselNameEn: string
  vesselNameTh: string
  score: number
  scanScore: number
}

export type Vessel = Omit<Group, "label">
