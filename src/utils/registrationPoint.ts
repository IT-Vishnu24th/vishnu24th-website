import type { RegistrationPointResponse, LocationId } from "@/types/registrationPoint"
import type { MultiLang } from "@/types/util"

export type RegistrationPhase = "firstdate" | "vishnu" | "room"

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

// FIXME: correct registration phase time to available
export const DEFAULT_REGISTRATION_PHASE_CONFIG = {
  firstdate: {
    start: new Date("2026-07-19T00:00:00+07:00"),
    end: new Date("2026-07-20T00:00:00+07:00"),
  },
  vishnu: {
    start: new Date("2026-07-20T00:00:00+07:00"),
    end: new Date("2026-07-21T13:00:00+07:00"),
  },
  room: {
    start: new Date("2026-07-21T13:00:00+07:00"),
    end: new Date("2026-07-25T00:00:00+07:00"),
  },
}

export interface GetRegistrationPhaseOptions {
  date?: Date | string | number
  overridePhase?: RegistrationPhase
}

export function getRegistrationPhase(options: GetRegistrationPhaseOptions = {}): RegistrationPhase {
  if (options.overridePhase) {
    return options.overridePhase
  }

  const now = options.date !== undefined ? new Date(options.date) : new Date()
  const time = now.getTime()

  const { firstdate, vishnu, room } = DEFAULT_REGISTRATION_PHASE_CONFIG

  if (time >= firstdate.start.getTime() && time < firstdate.end.getTime()) {
    return "firstdate"
  }
  if (time >= vishnu.start.getTime() && time < vishnu.end.getTime()) {
    return "vishnu"
  }
  if (time >= room.start.getTime() && time < room.end.getTime()) {
    return "room"
  }

  if (time < firstdate.start.getTime()) {
    return "firstdate"
  }
  return "room"
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

export function getRegistrationDetailsByPhase(
  data: RegistrationPointResponse | null | undefined,
  phase: RegistrationPhase
): { locationId: LocationId | null; room: string | null } | null {
  if (!data) {
    return null
  }

  if (phase === "firstdate") {
    return {
      locationId: data.firstdate,
      room: null,
    }
  }
  if (phase === "vishnu") {
    return {
      locationId: data.vishnu,
      room: null,
    }
  }
  if (phase === "room") {
    if (data.room && typeof data.room === "object") {
      return {
        locationId: data.room.locationId,
        room: data.room.name,
      }
    }
  }

  return {
    locationId: null,
    room: null,
  }
}

export function getActiveRegistrationDetails(
  data: RegistrationPointResponse | null | undefined,
  options?: GetRegistrationPhaseOptions
): { locationId: LocationId | null; room: string | null } | null {
  if (!data) {
    return null
  }
  const phase = getRegistrationPhase(options)
  return getRegistrationDetailsByPhase(data, phase)
}
