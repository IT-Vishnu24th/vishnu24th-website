import type { ApiFailure, ApiSuccess } from "@/types/apiResponse"
import type {
  PopkaewClickResponse,
  PopkaewCurrentUser,
  PopkaewLeaderboardResponse,
  PopkaewMeResponse,
} from "./types"

export const POPKAEW_BATCH_INTERVAL_MS = 5000
export const POPKAEW_LEADERBOARD_REFRESH_MS = 10000
export const POPKAEW_MAX_BATCH_SIZE = 500

export const formatPopkaewScore = (score: number) =>
  new Intl.NumberFormat("en-US").format(Math.max(0, Math.floor(score)))

export const getVesselDisplayName = (vesselName?: { th?: string; en?: string }) =>
  vesselName?.th || vesselName?.en || "ไม่พบชื่อยาน"

export class PopkaewApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string
  ) {
    super(message)
    this.name = "PopkaewApiError"
  }
}

export const getPopkaewErrorMessage = (error: unknown) => {
  if (!(error instanceof PopkaewApiError)) {
    return "โหลดข้อมูลไม่สำเร็จ"
  }

  if (error.status === 401) {
    return "กรุณาเข้าสู่ระบบก่อนเล่นเกม"
  }

  if (error.status === 403) {
    return error.code === "GAME_NOT_ACTIVE" ? "เกมยังไม่เปิดให้เล่น" : "บัญชีนี้ไม่มีสิทธิ์เล่นเกม"
  }

  if (error.status === 404) {
    return "ยังไม่พบข้อมูลผู้เล่น Popkaew"
  }

  return error.message
}

const parseSuccess = async <T>(response: Response, fallbackMessage: string): Promise<T> => {
  if (!response.ok) {
    let failureBody: Partial<ApiFailure> | null = null

    try {
      failureBody = (await response.json()) as Partial<ApiFailure>
    } catch {
      failureBody = null
    }

    throw new PopkaewApiError(
      failureBody?.message || fallbackMessage,
      response.status,
      failureBody?.code
    )
  }

  const body = (await response.json()) as ApiSuccess<T>
  return body.data
}

export async function fetchPopkaewMe(): Promise<PopkaewMeResponse> {
  const response = await fetch("/api/popkaew/me", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  })

  return parseSuccess<PopkaewMeResponse>(response, "Failed to load player")
}

export async function fetchUserMe(): Promise<PopkaewCurrentUser> {
  const response = await fetch("/api/users/me", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  })

  return parseSuccess<PopkaewCurrentUser>(response, "Failed to load user")
}

export async function fetchPopkaewLeaderboard(): Promise<PopkaewLeaderboardResponse> {
  const response = await fetch("/api/popkaew/leaderboard", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  })

  return parseSuccess<PopkaewLeaderboardResponse>(response, "Failed to load leaderboard")
}

export async function pushPopkaewClicks(amount: number): Promise<PopkaewClickResponse> {
  const response = await fetch("/api/popkaew/click", {
    method: "POST",
    credentials: "include",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  })

  return parseSuccess<PopkaewClickResponse>(response, "Failed to push clicks")
}
