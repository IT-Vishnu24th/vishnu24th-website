export interface Group {
  label: string
  vesselNameEn: string
  vesselNameTh: string
}

export type Vessel = Omit<Group, "label">
