export type RegistrationPhase = "firstdate" | "vishnu-1" | "vishnu-2" | "vishnu-3" | "vishnu-4"

export type VishnuMissionPhase =
  | "mission-1"
  | "mission-2"
  | "mission-3"
  | "mission-4"
  | "mission-5"
  | "mission-6"
  | "mission-7"

export interface PhaseDocument<T extends string> {
  current: T
  values: T[]
}
