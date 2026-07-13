import { MoreHorizontal, Gamepad, SportShoe, BookOpenText, type LucideIcon } from "lucide-react"

export interface Category {
  id: string
  label: string
  icon: LucideIcon
}

export const CATEGORIES: Category[] = [
  { id: "Innovation", label: "Innovation", icon: Gamepad },
  { id: "academic", label: "ค่ายและวิชาการ", icon: BookOpenText },
  { id: "sport", label: "กีฬา", icon: SportShoe },
  // { id: "art", label: "ศิลปะ", icon: Palette },
  // { id: "volenteer", label: "อาสา", icon: Heart },
  { id: "other", label: "อื่นๆ", icon: MoreHorizontal },
]
