import type { Group, Vessel } from "@/types/group"
import type { MultiLang } from "@/types/util"

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
  name: MultiLang<Name>
  group: Group | Vessel
  department: MultiLang
  prefLanguage: keyof MultiLang
}
