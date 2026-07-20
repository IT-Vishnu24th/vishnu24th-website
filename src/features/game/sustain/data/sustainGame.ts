import type { SustainBin, SustainTrashTemplate } from "../types/sustain"

export const SUSTAIN_GAME_WIDTH = 360
export const SUSTAIN_GAME_HEIGHT = 600
export const SUSTAIN_GAME_DURATION = 90
export const SUSTAIN_MAX_PLAYS = 3
export const SUSTAIN_SCORE_PER_TRASH = 100

export const SUSTAIN_BINS: SustainBin[] = [
  {
    type: "general",
    label: "ขยะทั่วไป",
    hint: "ถุงขนม หลอด กิ่งไม้",
    x: 15,
    y: 470,
    width: 86,
    height: 82,
  },
  {
    type: "recycle",
    label: "รีไซเคิล",
    hint: "ขวดพลาสติก กระป๋อง กระดาษ",
    x: 137,
    y: 470,
    width: 86,
    height: 82,
  },
  {
    type: "food",
    label: "ขยะเปียก",
    hint: "เศษอาหาร เปลือกผลไม้",
    x: 259,
    y: 470,
    width: 86,
    height: 82,
  },
]

const RANDOM_SCORES = [1]
const randomScore = () => RANDOM_SCORES[Math.floor(Math.random() * RANDOM_SCORES.length)]

export const SUSTAIN_TRASH_ITEMS: SustainTrashTemplate[] = [
  { id: "paper-scrap", label: "เศษกระดาษ", icon: "▦", type: "general", score: randomScore() },
  { id: "cloth-scrap", label: "เศษผ้า", icon: "▧", type: "general", score: randomScore() },
  { id: "twig", label: "กิ่งไม้/ใบไม้", icon: "⌇", type: "general", score: randomScore() },
  { id: "snack-bag", label: "ถุงน้ำจิ้ม", icon: "▣", type: "general", score: randomScore() },
  {
    id: "soiled-container",
    label: "ภาชนะที่เลอะมาก",
    icon: "▤",
    type: "general",
    score: randomScore(),
  },
  { id: "paper", label: "กระดาษ", icon: "□", type: "recycle", score: randomScore() },
  { id: "cardboard-box", label: "กระดาษลัง", icon: "▥", type: "recycle", score: randomScore() },
  { id: "can", label: "กระป๋อง", icon: "◎", type: "recycle", score: randomScore() },
  { id: "milk-carton", label: "กล่องนม", icon: "▨", type: "recycle", score: randomScore() },
  { id: "used-cup", label: "แก้วน้ำ", icon: "◡", type: "recycle", score: randomScore() },
  { id: "banana-peel", label: "เศษอาหาร", icon: "◜", type: "food", score: randomScore() },
  { id: "chicken-bone", label: "เศษอาหาร", icon: "◈", type: "food", score: randomScore() },
  { id: "watermelon", label: "เศษอาหาร", icon: "◑", type: "food", score: randomScore() },
  { id: "apple-core", label: "เศษอาหาร", icon: "❋", type: "food", score: randomScore() },
  { id: "veggie-scraps", label: "เศษอาหาร", icon: "❀", type: "food", score: randomScore() },
]
