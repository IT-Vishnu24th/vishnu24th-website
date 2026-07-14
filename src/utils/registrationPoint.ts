import type { GroupRoom, LocationId, RegistrationPointResponse } from "@/types/registrationPoint"
import type { MultiLang } from "@/types/util"

export const LOCATION_NAMES: Record<LocationId, MultiLang> = {
  en100: {
    th: "ตึก 100 โถงชั้น 1",
    en: "EN100 1st Floor Hall",
  },
  eng3: {
    th: "ตึก 3",
    en: "ENG3",
  },
  eng4: {
    th: "ตึก 4 โถงชั้น 1",
    en: "ENG4 1st Floor Hall",
  },
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

export interface RegistrationLocationAssets {
  title: string
  fullName: string
  mapSrc: string
  realSrc?: string
  googleMapsQuery: string
}

const REGIS_MAP_DIR = "/regis/map"
const REGIS_REAL_DIR = "/regis/real"

const locationAssets: Record<LocationId, RegistrationLocationAssets> = {
  en100: {
    title: "ตึก 100 ปี",
    fullName: "ตึก 100 โถงชั้น 1",
    mapSrc: `${REGIS_MAP_DIR}/eng100.png`,
    realSrc: `${REGIS_REAL_DIR}/real_eng100.jpg`,
    googleMapsQuery: "อาคารวิศวะ 100 ปี คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  },
  eng3: {
    title: "ตึก 3",
    fullName: "ตึก 3",
    mapSrc: `${REGIS_MAP_DIR}/a_306.png`,
    googleMapsQuery: "ตึก 3 คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  },
  eng4: {
    title: "ตึก 4",
    fullName: "ตึก 4 โถงชั้น 1",
    mapSrc: `${REGIS_MAP_DIR}/eng4.png`,
    realSrc: `${REGIS_REAL_DIR}/real_eng4.jpg`,
    googleMapsQuery: "ตึก 4 คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  },
  larnsom: {
    title: "ลานส้ม",
    fullName: "ลานส้ม",
    mapSrc: `${REGIS_MAP_DIR}/larnsom.png`,
    realSrc: `${REGIS_REAL_DIR}/real_larnsom.jpg`,
    googleMapsQuery: "iCanteen โรงอาหารคณะวิศวฯ",
  },
  larngear: {
    title: "ลานเกียร์",
    fullName: "ลานเกียร์",
    mapSrc: `${REGIS_MAP_DIR}/larngear.png`,
    realSrc: `${REGIS_REAL_DIR}/real_larngear.jpg`,
    googleMapsQuery: "ลานเกียร์ คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  },
  plateau: {
    title: "ที่ราบสูง",
    fullName: "ที่ราบสูง",
    mapSrc: `${REGIS_MAP_DIR}/plateau.png`,
    realSrc: `${REGIS_REAL_DIR}/real_plateau.jpg`,
    googleMapsQuery: "ลานเกียร์ คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  },
}

const roomAssetsByGroup: Record<string, RegistrationLocationAssets> = {
  A: {
    title: "ตึก 3",
    fullName: "ตึก 3 ห้อง 306",
    mapSrc: `${REGIS_MAP_DIR}/a_306.png`,
    realSrc: `${REGIS_REAL_DIR}/real_eng3.jpg`,
    googleMapsQuery: "ตึก 3 ห้อง 306 คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  },
  B: {
    title: "ตึก 3",
    fullName: "ตึก 3 ห้อง 420",
    mapSrc: `${REGIS_MAP_DIR}/b_420.png`,
    realSrc: `${REGIS_REAL_DIR}/real_eng3.jpg`,
    googleMapsQuery: "ตึก 3 ห้อง 420 คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  },
  C: {
    title: "ตึก 3",
    fullName: "ตึก 3 ห้อง 318",
    mapSrc: `${REGIS_MAP_DIR}/c_318.png`,
    realSrc: `${REGIS_REAL_DIR}/real_eng3.jpg`,
    googleMapsQuery: "ตึก 3 ห้อง 318 คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  },
  DOG: {
    title: "ตึก 3",
    fullName: "ตึก 3 ห้อง 320",
    mapSrc: `${REGIS_MAP_DIR}/dog_320.png`,
    realSrc: `${REGIS_REAL_DIR}/real_eng3.jpg`,
    googleMapsQuery: "ตึก 3 ห้อง 320 คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  },
  E: {
    title: "ตึก 3",
    fullName: "ตึก 3 ห้อง 319",
    mapSrc: `${REGIS_MAP_DIR}/e_319.png`,
    realSrc: `${REGIS_REAL_DIR}/real_eng3.jpg`,
    googleMapsQuery: "ตึก 3 ห้อง 319 คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  },
  F: {
    title: "ตึก 3",
    fullName: "ตึก 3 ห้อง 418",
    mapSrc: `${REGIS_MAP_DIR}/f_418.png`,
    realSrc: `${REGIS_REAL_DIR}/real_eng3.jpg`,
    googleMapsQuery: "ตึก 3 ห้อง 418 คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  },
  G: {
    title: "ตึก 3",
    fullName: "ตึก 3 ห้อง 419",
    mapSrc: `${REGIS_MAP_DIR}/g_419.png`,
    realSrc: `${REGIS_REAL_DIR}/real_eng3.jpg`,
    googleMapsQuery: "ตึก 3 ห้อง 419 คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  },
  H: {
    title: "ตึก 3",
    fullName: "ตึก 3 ห้อง 304",
    mapSrc: `${REGIS_MAP_DIR}/h_304.png`,
    realSrc: `${REGIS_REAL_DIR}/real_eng3.jpg`,
    googleMapsQuery: "ตึก 3 ห้อง 304 คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  },
  J: {
    title: "ตึก 4",
    fullName: "ตึก 4 Sky Cafe ชั้น 19",
    mapSrc: `${REGIS_MAP_DIR}/j_skycafe.png`,
    realSrc: `${REGIS_REAL_DIR}/real_eng4.jpg`,
    googleMapsQuery: "ตึก 4 Sky Cafe คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  },
  K: {
    title: "ตึก 3",
    fullName: "ตึก 3 ห้อง 401",
    mapSrc: `${REGIS_MAP_DIR}/k_401.png`,
    realSrc: `${REGIS_REAL_DIR}/real_eng3.jpg`,
    googleMapsQuery: "ตึก 3 ห้อง 401 คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  },
  L: {
    title: "ตึก 3",
    fullName: "ตึก 3 ห้อง 205",
    mapSrc: `${REGIS_MAP_DIR}/l_205.png`,
    realSrc: `${REGIS_REAL_DIR}/real_eng3.jpg`,
    googleMapsQuery: "ตึก 3 ห้อง 205 คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  },
  M: {
    title: "ตึก 4",
    fullName: "ตึก 4 โถงชั้น 2",
    mapSrc: `${REGIS_MAP_DIR}/m_eng4.png`,
    realSrc: `${REGIS_REAL_DIR}/real_eng4.jpg`,
    googleMapsQuery: "ตึก 4 คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  },
  N: {
    title: "ตึก 3",
    fullName: "ตึก 3 ห้อง 317",
    mapSrc: `${REGIS_MAP_DIR}/n_317.png`,
    realSrc: `${REGIS_REAL_DIR}/real_eng3.jpg`,
    googleMapsQuery: "ตึก 3 ห้อง 317 คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  },
  P: {
    title: "ตึก 3",
    fullName: "ตึก 3 ห้อง 309",
    mapSrc: `${REGIS_MAP_DIR}/p_309.png`,
    realSrc: `${REGIS_REAL_DIR}/real_eng3.jpg`,
    googleMapsQuery: "ตึก 3 ห้อง 309 คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  },
  Q: {
    title: "ตึก 3",
    fullName: "ตึก 3 ห้อง 417",
    mapSrc: `${REGIS_MAP_DIR}/q_417.png`,
    realSrc: `${REGIS_REAL_DIR}/real_eng3.jpg`,
    googleMapsQuery: "ตึก 3 ห้อง 417 คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  },
  R: {
    title: "ตึก 4",
    fullName: "ตึก 4 ห้อง 18-15 ชั้น 18",
    mapSrc: `${REGIS_MAP_DIR}/r_eng4.png`,
    realSrc: `${REGIS_REAL_DIR}/real_eng4.jpg`,
    googleMapsQuery: "ตึก 4 ห้อง 18-15 คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  },
  S: {
    title: "ตึก 3",
    fullName: "ตึก 3 ห้อง 404",
    mapSrc: `${REGIS_MAP_DIR}/s_404.png`,
    realSrc: `${REGIS_REAL_DIR}/real_eng3.jpg`,
    googleMapsQuery: "ตึก 3 ห้อง 404 คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  },
  T: {
    title: "ตึก 3",
    fullName: "ตึก 3 ห้อง 322",
    mapSrc: `${REGIS_MAP_DIR}/t_322.png`,
    realSrc: `${REGIS_REAL_DIR}/real_eng3.jpg`,
    googleMapsQuery: "ตึก 3 ห้อง 322 คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  },
}

function withAllowedRoomRealImage(
  assets: RegistrationLocationAssets,
  locationId: LocationId
): RegistrationLocationAssets {
  const nextAssets = { ...assets }
  nextAssets.googleMapsQuery = locationAssets[locationId].googleMapsQuery
  delete nextAssets.realSrc

  if (locationId === "eng3") {
    nextAssets.realSrc = `${REGIS_REAL_DIR}/real_eng3.jpg`
  }

  return nextAssets
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

export function getRegistrationLocationAssets(
  result: Pick<
    RegistrationPointResponse,
    "groupLabel" | "registrationLocation" | "registrationLocationId"
  >
): RegistrationLocationAssets {
  if (result.registrationLocation.source === "room") {
    const groupKey = result.groupLabel.toUpperCase()
    const roomAssets = roomAssetsByGroup[groupKey]
    if (roomAssets) {
      return withAllowedRoomRealImage(roomAssets, result.registrationLocation.locationId)
    }

    return withAllowedRoomRealImage(
      {
        ...locationAssets[result.registrationLocation.locationId],
        fullName:
          `${getLocationDisplayName(result.registrationLocation.locationId, "th")} ${getRoomDisplayName(result.registrationLocation.roomName, "th")}`.trim(),
      },
      result.registrationLocation.locationId
    )
  }

  return locationAssets[result.registrationLocationId]
}

export function getRegistrationLocationAssetsFromRoom(
  groupLabel: string,
  room: GroupRoom
): RegistrationLocationAssets {
  const groupKey = groupLabel.toUpperCase()
  return roomAssetsByGroup[groupKey]
    ? withAllowedRoomRealImage(roomAssetsByGroup[groupKey], room.locationId)
    : withAllowedRoomRealImage(
        {
          ...locationAssets[room.locationId],
          fullName:
            `${getLocationDisplayName(room.locationId, "th")} ${getRoomDisplayName(room.name, "th")}`.trim(),
        },
        room.locationId
      )
}
