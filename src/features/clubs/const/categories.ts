import {
  Activity,
  Book,
  Trophy,
  Palette,
  Heart,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react"

export interface Category {
  id: string
  label: string
  icon: LucideIcon
}

export const CATEGORIES: Category[] = [
  { id: "Innovation", label: "วิทย์", icon: Activity },
  { id: "academic", label: "วิชาการ", icon: Book },
  { id: "sport", label: "กีฬา", icon: Trophy },
  // { id: "art", label: "ศิลปะ", icon: Palette },
  // { id: "volenteer", label: "อาสา", icon: Heart },
  { id: "other", label: "อื่นๆ", icon: MoreHorizontal },
]
