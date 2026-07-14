import type { SustainBin, SustainTrashTemplate } from "../types/sustain"

export const SUSTAIN_GAME_WIDTH = 360
export const SUSTAIN_GAME_HEIGHT = 600
export const SUSTAIN_GAME_DURATION = 30
export const SUSTAIN_MAX_PLAYS = 3
export const SUSTAIN_SCORE_PER_TRASH = 100

export const SUSTAIN_BINS: SustainBin[] = [
  {
    type: "general",
    label: "ขยะทั่วไป",
    hint: "ถุงขนม หลอด แก้วใช้แล้ว",
    x: 42,
    y: 498,
    width: 86,
    height: 82,
  },
  {
    type: "recycle",
    label: "รีไซเคิล",
    hint: "ขวดพลาสติก กระป๋อง กระดาษ",
    x: 137,
    y: 498,
    width: 86,
    height: 82,
  },
  {
    type: "food",
    label: "ขยะเปียก",
    hint: "เศษอาหาร เปลือกผลไม้",
    x: 232,
    y: 498,
    width: 86,
    height: 82,
  },
]

export const SUSTAIN_TRASH_ITEMS: SustainTrashTemplate[] = [
  { id: "snack-bag", label: "ซองขนม", icon: "▣", type: "general" },
  { id: "straw", label: "หลอด", icon: "╱", type: "general" },
  { id: "used-cup", label: "แก้วใช้แล้ว", icon: "◡", type: "general" },
  { id: "plastic-bottle", label: "ขวดน้ำ", icon: "♲", type: "recycle" },
  { id: "paper", label: "กระดาษ", icon: "□", type: "recycle" },
  { id: "can", label: "กระป๋อง", icon: "◎", type: "recycle" },
  { id: "banana-peel", label: "เปลือกผลไม้", icon: "◜", type: "food" },
  { id: "leftover", label: "เศษอาหาร", icon: "●", type: "food" },
  { id: "egg-shell", label: "เปลือกไข่", icon: "◌", type: "food" },
]
