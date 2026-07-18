import type { SustainPlaysResponse } from "../types/sustain"

const ROUND_ENDPOINT = "/api/wastesort/me/round"

type RoundStatusResponse = {
  playsToday: number
  maxPlaysPerDay: number
  playsRemaining: number
  canPlay: boolean
}

const nextMidnightIso = () => {
  const now = new Date()
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0)
  return midnight.toISOString()
}

// Only used before the first successful fetch (initial render) or if a
// fetch fails outright — never persisted anywhere, just a safe placeholder.
export const defaultPlaysState = (): SustainPlaysResponse => ({
  remainingPlays: 0,
  playsUsed: 0,
  maxPlays: 0,
  resetAt: nextMidnightIso(),
})

/**
 * NOTE on response shape: this assumes your `success()` helper wraps the
 * payload as `{ data: {...} }` (falling back to the raw body if not, via
 * `json?.data ?? json`). If your actual envelope looks different, this is
 * the one line to adjust — everything downstream stays the same.
 */
export async function fetchSustainPlays(): Promise<SustainPlaysResponse> {
  const res = await fetch(ROUND_ENDPOINT, { method: "GET" })

  if (!res.ok) {
    throw new Error(`Failed to fetch play status (${res.status})`)
  }

  const json = await res.json()
  const data: RoundStatusResponse = json?.data ?? json

  return {
    remainingPlays: data.playsRemaining,
    playsUsed: data.playsToday,
    maxPlays: data.maxPlaysPerDay,
    // Your GET /round doesn't return a reset timestamp, so this is just a
    // local display placeholder assuming local-midnight rollover. It isn't
    // used for any real quota enforcement — your backend already owns that.
    resetAt: nextMidnightIso(),
  }
}
