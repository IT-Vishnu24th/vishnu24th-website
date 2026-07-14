import type { RegistrationPhase } from "@/types/phase"
import type { MultiLang } from "@/types/util"

export type LocationId = "en100" | "eng3" | "eng4" | "larnsom" | "larngear" | "plateau"

export interface GroupRoom {
  locationId: LocationId
  name: string
}

export interface RegistrationPoint {
  package: number
  firstdate: LocationId
  vishnu: LocationId
}

export interface ResolvedRegistrationLocation {
  source: "registrationPoint" | "room"
  locationId: LocationId
  roomName?: string
  displayName: string
}

export interface RegistrationPointResponse extends RegistrationPoint {
  room: GroupRoom
  phase: RegistrationPhase
  registrationLocationId: LocationId
  registrationLocation: ResolvedRegistrationLocation
  registrationTime: string
  displayLabel: string
  groupLabel: string
  vesselName: MultiLang
}
