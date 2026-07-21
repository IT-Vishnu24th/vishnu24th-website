import type { SustainPlaysResponse } from "../types/sustain"
import { fetchSustainPlays } from "./plays"

const ROUND_ENDPOINT = "/api/wastesort/me/round"

export type RecordRoundResult = {
  ok: boolean
  limitReached?: boolean
  plays?: SustainPlaysResponse
  error?: unknown
}

/**
 * Submits the finished round's score to your real backend
 * (POST /api/wastesort/me/round).
 *
 * Important: your API records the round AND consumes a daily play in the
 * same call — there's no separate "consume a play" step anymore. The game
 * only checks remaining plays (via GET) before starting; it doesn't
 * pre-decrement anything client-side.
 *
 * Handler rejects any score outside 0-57 (`MAX_SCORE` in the route) - the
 * real ceiling for a 90s round at +1/catch, so a legit round can never
 * exceed it.
 */
export async function recordSustainRound(score: number): Promise<RecordRoundResult> {
  try {
    const res = await fetch(ROUND_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score }),
    })

    if (res.status === 429) {
      // Daily limit already reached (e.g. raced another tab/device).
      // Resync from the server so the UI reflects the true remaining count.
      const plays = await fetchSustainPlays().catch(() => undefined)
      return { ok: false, limitReached: true, plays }
    }

    if (!res.ok) {
      const json = await res.json().catch(() => null)
      console.error(`recordSustainRound: backend responded ${res.status}`, json)
      return { ok: false, error: json }
    }

    // Re-fetch canonical play status rather than parsing the POST response's
    // `player` object — its exact shape depends on
    // wasteSortPlayerService.mapToPublic, which this file doesn't assume.
    const plays = await fetchSustainPlays().catch(() => undefined)
    return { ok: true, plays }
  } catch (error) {
    console.error("recordSustainRound: request failed", error)
    return { ok: false, error }
  }
}
