export const POPKAEW_BATCH_INTERVAL_MS = 5000
export const POPKAEW_LEADERBOARD_REFRESH_MS = 10000
export const POPKAEW_MAX_BATCH_SIZE = 500

export const formatPopkaewScore = (score: number) =>
  new Intl.NumberFormat("en-US").format(Math.max(0, Math.floor(score)))

export const getVesselDisplayName = (vesselName?: { th?: string; en?: string }) =>
  vesselName?.th || vesselName?.en || "ไม่พบชื่อยาน"
