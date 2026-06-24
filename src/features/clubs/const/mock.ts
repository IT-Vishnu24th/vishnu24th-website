import { Club } from "../types/club"

export const MOCK_CLUBS: Club[] = [
  {
    id: "1",
    rank: 1,
    name: "ชมรมวิชาการ",
    description: "รายละเอียดชมรม",
    categoryId: "academic",
    havebooth: true,
  },
  {
    id: "2",
    rank: 2,
    name: "ชมรมกีฬา",
    description: "รายละเอียดชมรม",
    categoryId: "sports",
    havebooth: false,
  },
]
