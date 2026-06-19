export interface Group {
  label: string
  vesselNameEn: string
  vesselNameTh: string
<<<<<<< HEAD
  score: number
}

export type Vessel = Omit<Group, "label">

export interface RankingResponse {
  top3: ((Group | Vessel) & { rank: number })[]
}
=======
}

export type Vessel = Omit<Group, "label">
>>>>>>> d327aee (add phase endpoints)
