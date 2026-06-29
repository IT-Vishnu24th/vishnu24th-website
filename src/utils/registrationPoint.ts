import type { LocationId } from "@/types/registrationPoint"
import type { MultiLang } from "@/types/util"

export const LOCATION_NAMES: Record<LocationId, MultiLang> = {
  en100: {
    th: "อาคารวิศวฯ 100 ปี",
    en: "EN100",
  },
  eng3: {
    th: "ตึก 3",
    en: "ENG3",
  },
  eng4: {
    th: "ตึก 4",
    en: "ENG4",
  },
  // FIXME: its actually located at I-Canteen
  larnsom: {
    th: "ลานส้ม",
    en: "Larnsom",
  },
  larngear: {
    th: "ลานเกียร์",
    en: "Larngear",
  },
  plateau: {
    th: "ที่ราบสูง",
    en: "Plateau",
  },
}

export function getLocationDisplayName(
  locationId: LocationId | null,
  lang: "en" | "th" = "th"
): string {
  if (!locationId) return ""
  const nameObj = LOCATION_NAMES[locationId]
  if (!nameObj) return locationId
  return nameObj[lang] || nameObj.th
}

export function getRoomDisplayName(
  roomName: string | null | undefined,
  lang: "en" | "th" = "th"
): string {
  if (!roomName) return ""
  if (roomName === "Hall-2nd-Floor") {
    return lang === "en" ? "Hall-2nd-Floor" : "โถงชั้น 2"
  }
  return roomName
}
