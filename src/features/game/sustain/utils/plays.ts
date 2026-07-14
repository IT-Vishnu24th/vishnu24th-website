import { SUSTAIN_MAX_PLAYS } from "../data/sustainGame"
import type { SustainPlaysResponse } from "../types/sustain"

type ApiSuccess<T> = {
  data: T
}

export const defaultPlaysState = (): SustainPlaysResponse => ({
  remainingPlays: SUSTAIN_MAX_PLAYS,
  playsUsed: 0,
  maxPlays: SUSTAIN_MAX_PLAYS,
  resetAt: new Date().toISOString(),
})

const normalizePlayState = (value: Partial<SustainPlaysResponse>): SustainPlaysResponse => {
  const maxPlays = Number.isFinite(value.maxPlays) ? Number(value.maxPlays) : SUSTAIN_MAX_PLAYS
  const playsUsed = Number.isFinite(value.playsUsed) ? Number(value.playsUsed) : 0
  const remainingPlays = Number.isFinite(value.remainingPlays)
    ? Number(value.remainingPlays)
    : Math.max(0, maxPlays - playsUsed)

  return {
    maxPlays,
    playsUsed: Math.max(0, Math.min(maxPlays, playsUsed)),
    remainingPlays: Math.max(0, Math.min(maxPlays, remainingPlays)),
    resetAt: value.resetAt ?? new Date().toISOString(),
  }
}

export async function fetchSustainPlays(): Promise<SustainPlaysResponse> {
  const response = await fetch("/api/game/sustain/plays", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Failed to load plays")
  }

  const body = (await response.json()) as ApiSuccess<Partial<SustainPlaysResponse>>
  return normalizePlayState(body.data)
}

export async function consumeSustainPlay(): Promise<SustainPlaysResponse> {
  const response = await fetch("/api/game/sustain/plays", {
    method: "POST",
    credentials: "include",
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("No plays remaining")
  }

  const body = (await response.json()) as ApiSuccess<Partial<SustainPlaysResponse>>
  return normalizePlayState(body.data)
}
