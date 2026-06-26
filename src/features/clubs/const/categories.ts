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
  { id: "science", label: "วิทย์", icon: Activity },
  { id: "academic", label: "วิชาการ", icon: Book },
  { id: "sports", label: "กีฬา", icon: Trophy },
  { id: "art", label: "ศิลปะ", icon: Palette },
  { id: "volenteer", label: "อาสา", icon: Heart },
  { id: "others", label: "อื่นๆ", icon: MoreHorizontal },
]
