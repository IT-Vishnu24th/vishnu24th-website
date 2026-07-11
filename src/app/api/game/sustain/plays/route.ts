import { NextResponse, type NextRequest } from "next/server"
import { SUSTAIN_MAX_PLAYS } from "@/features/game/sustain/data/sustainGame"

export const dynamic = "force-dynamic"

type PlayCookie = {
  date: string
  playsUsed: number
}

const COOKIE_NAME = "sustain_game_plays"
const TIME_ZONE = "Asia/Bangkok"

const getBangkokDateKey = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date())

const getResetAt = () => {
  const now = new Date()
  const bangkokNow = new Date(now.toLocaleString("en-US", { timeZone: TIME_ZONE }))
  bangkokNow.setDate(bangkokNow.getDate() + 1)
  bangkokNow.setHours(0, 0, 0, 0)

  return bangkokNow.toISOString()
}

const parsePlayCookie = (value?: string): PlayCookie => {
  const today = getBangkokDateKey()

  if (!value) {
    return { date: today, playsUsed: 0 }
  }

  try {
    const parsed = JSON.parse(value) as Partial<PlayCookie>
    if (parsed.date !== today) {
      return { date: today, playsUsed: 0 }
    }

    return {
      date: today,
      playsUsed: Math.max(0, Math.min(SUSTAIN_MAX_PLAYS, Number(parsed.playsUsed) || 0)),
    }
  } catch {
    return { date: today, playsUsed: 0 }
  }
}

const makePayload = (playsUsed: number) => ({
  remainingPlays: Math.max(0, SUSTAIN_MAX_PLAYS - playsUsed),
  playsUsed,
  maxPlays: SUSTAIN_MAX_PLAYS,
  resetAt: getResetAt(),
})

const setPlayCookie = (response: NextResponse, playsUsed: number) => {
  response.cookies.set({
    name: COOKIE_NAME,
    value: JSON.stringify({ date: getBangkokDateKey(), playsUsed }),
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 36,
  })
}

export async function GET(request: NextRequest) {
  const history = parsePlayCookie(request.cookies.get(COOKIE_NAME)?.value)
  return NextResponse.json({ data: makePayload(history.playsUsed) }, { status: 200 })
}

export async function POST(request: NextRequest) {
  const history = parsePlayCookie(request.cookies.get(COOKIE_NAME)?.value)

  if (history.playsUsed >= SUSTAIN_MAX_PLAYS) {
    return NextResponse.json({ message: "Daily play limit reached" }, { status: 429 })
  }

  const playsUsed = history.playsUsed + 1
  const response = NextResponse.json({ data: makePayload(playsUsed) }, { status: 200 })
  setPlayCookie(response, playsUsed)

  return response
}
