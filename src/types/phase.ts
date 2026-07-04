export const REGISTRATION_PHASES = [
  "firstdate",
  "vishnu-1",
  "vishnu-2",
  "vishnu-3",
  "vishnu-4",
] as const
export type RegistrationPhase = (typeof REGISTRATION_PHASES)[number]

export const VISHNU_MISSION_PHASES = [
  "mission-1",
  "mission-2",
  "mission-3",
  "mission-4",
  "mission-5",
  "mission-6",
  "mission-7",
] as const
export type VishnuMissionPhase = (typeof VISHNU_MISSION_PHASES)[number]

export interface PhaseDocument<T extends string> {
  current: T
}
