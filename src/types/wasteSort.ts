import { MultiLang } from "./util"

export type wasteSortPlayer = {
  name: string
  playCount: number
  vesselName: MultiLang
  /** group label (doc id in `groups`); server-side only — never return in API responses */
  group: string
  sustainScore: number
  /** Rounds played so far on `lastPlayDate`. Resets to 0 whenever the
   * player's first round of a new day (Asia/Bangkok) is recorded. */
  playsToday: number
  /** YYYY-MM-DD (Asia/Bangkok) of the last round played. Used to detect
   * when `playsToday` needs to reset for a new day. */
  lastPlayDate: string
}

export interface WasteSortGameState {
  opensAt: string
  closesAt: string
}

export type wasteSortGroup = {
  vesselName: MultiLang
  scoreSources: {
    sustainScore: number
    [key: string]: number
  }
}
