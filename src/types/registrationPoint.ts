export type LocationId = "en100" | "eng3" | "eng4" | "larnsom" | "larngear" | "plateau"

export interface GroupRoom {
  locationId: LocationId
  room: string
}

export interface RegistrationPoint {
  package: number
  firstdate: LocationId
  vishnu: LocationId
}

export interface RegistrationPointResponse extends RegistrationPoint {
  room: GroupRoom | ""
}
