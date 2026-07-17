import { useMemo } from "react"
import { Club } from "../types/club"

export type BoothFilter = "all" | "has" | "none"

export function useClubFilter(
  clubs: Club[],
  query: string,
  categories: string[],
  boothFilter: BoothFilter = "all"
) {
  return useMemo(() => {
    const q = query.toLowerCase()

    return clubs.filter((club) => {
      const matchName =
        club.name.th.toLowerCase().includes(q) || club.name.en.toLowerCase().includes(q)

      // ไม่เลือกหมวดหมู่ใดเลย = แสดงทั้งหมด
      // เลือกหลายหมวด = แสดงรวมกัน (OR)
      const matchCategory = categories.length === 0 || categories.includes(club.category)

      const matchBooth =
        boothFilter === "all" ||
        (boothFilter === "has" && club.havebooth) ||
        (boothFilter === "none" && !club.havebooth)

      return matchName && matchCategory && matchBooth
    })
  }, [clubs, query, categories, boothFilter])
}
