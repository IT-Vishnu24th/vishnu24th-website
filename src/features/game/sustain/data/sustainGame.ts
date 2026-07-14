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

const RANDOM_SCORES = [5, 10, 15, 20, 25]
const randomScore = () => RANDOM_SCORES[Math.floor(Math.random() * RANDOM_SCORES.length)]

export const SUSTAIN_TRASH_ITEMS: SustainTrashTemplate[] = [
  { id: "snack-bag", label: "ซองขนม", icon: "▣", type: "general", score: randomScore() },
  { id: "straw", label: "หลอด", icon: "╱", type: "general", score: randomScore() },
  { id: "used-cup", label: "แก้วใช้แล้ว", icon: "◡", type: "general", score: randomScore() },
  { id: "plastic-bottle", label: "ขวดน้ำ", icon: "♲", type: "recycle", score: randomScore() },
  { id: "paper", label: "กระดาษ", icon: "□", type: "recycle", score: randomScore() },
  { id: "can", label: "กระป๋อง", icon: "◎", type: "recycle", score: randomScore() },
  { id: "banana-peel", label: "เปลือกผลไม้", icon: "◜", type: "food", score: randomScore() },
  { id: "leftover", label: "เศษอาหาร", icon: "●", type: "food", score: randomScore() },
  { id: "egg-shell", label: "เปลือกไข่", icon: "◌", type: "food", score: randomScore() },
]
