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
    return clubs.filter((club) => {
      const matchName = club.name.toLowerCase().includes(query.toLowerCase())

      // ไม่เลือกหมวดหมู่ใดเลย = แสดงทั้งหมด
      // เลือกหลายหมวด = แสดงรวมกัน (OR)
      const matchCategory = categories.length === 0 || categories.includes(club.categoryId)

      const matchBooth =
        boothFilter === "all" ||
        (boothFilter === "has" && club.havebooth) ||
        (boothFilter === "none" && !club.havebooth)

      return matchName && matchCategory && matchBooth
    })
  }, [clubs, query, categories, boothFilter])
}
