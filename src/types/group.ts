export interface Group {
  label: string
  vesselNameEn: string
  vesselNameTh: string
  score: number
  scanScore: number
}

export type Vessel = Omit<Group, "label">

export interface RankingResponse {
  top3: ((Group | Vessel) & { rank: number })[]
}
