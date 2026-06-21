export interface Group {
  label: string
  vesselNameEn: string
  vesselNameTh: string
  score: number
}

export type Vessel = Omit<Group, "label">
