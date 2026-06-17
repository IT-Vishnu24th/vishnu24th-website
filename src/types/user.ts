import { Group, Vessel } from "@/types/group"

export interface Name {
  title: string
  firstName: string
  middleName?: string
  surname: string
  nickname: string
}

// staff = year 2 (68x) ; participant = year 1 (69x)
export type UserRole = "admin" | "staff" | "participant"

export interface User {
  id: string // student id
  role: UserRole
  nameEn: Name
  nameTh: Name
  group: Group | Vessel
  departmentEn: string
  departmentTh: string
  prefLanguage: "en" | "th"
}
