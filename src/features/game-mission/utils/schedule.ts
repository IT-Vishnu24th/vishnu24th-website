import type { MissionQuestion, MissionStatus } from "@/types/mission"

/**
 * Returns the question's lifecycle status based on device time compared
 * against its fixed Bangkok-time schedule window.
 *
 *  locked           -> before opensAt
 *  open             -> between opensAt and closesAt (submissions accepted)
 *  awaiting-reveal  -> between closesAt and revealsAt
 *  revealed         -> after revealsAt
 *
 * Dev-only preview: set NEXT_PUBLIC_MISSION_DEV_PREVIEW=open in .env.local
 * to force every question into the "open" state locally, so the team can
 * see the full save-button UI before the real camp dates arrive. This has
 * no effect unless that env var is explicitly set, so it's safe to leave
 * in — just don't set the var in production.
 */
export function getMissionStatus(question: MissionQuestion, now: Date = new Date()): MissionStatus {
  if (process.env.NEXT_PUBLIC_MISSION_DEV_PREVIEW === "open") {
    return "open"
  }

  const opens = new Date(question.opensAt).getTime()
  const closes = new Date(question.closesAt).getTime()
  const reveals = new Date(question.revealsAt).getTime()
  const t = now.getTime()

  if (t < opens) return "locked"
  if (t < closes) return "open"
  if (t < reveals) return "awaiting-reveal"
  return "revealed"
}

/** Bangkok-local date key, e.g. "2026-07-21" */
export function getBangkokDateKey(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Bangkok" }).format(date)
}

/**
 * Returns the morning + evening question pair for "today" (Bangkok time).
 * Falls back to Day 1's pair before the camp starts, and Day 4's question
 * after the camp ends (no evening question exists for Day 4).
 */
export function getActiveDayQuestions(
  questions: MissionQuestion[],
  now: Date = new Date()
): MissionQuestion[] {
  const todayKey = getBangkokDateKey(now)
  const todays = questions.filter((q) => q.dateKey === todayKey)
  if (todays.length > 0) return todays

  const firstDayKey = questions[0]?.dateKey
  if (firstDayKey && todayKey < firstDayKey) {
    return questions.filter((q) => q.dateKey === firstDayKey)
  }

  const lastDayKey = questions[questions.length - 1]?.dateKey
  return questions.filter((q) => q.dateKey === lastDayKey)
}

/** Formats a schedule ISO datetime as "HH:MM น." in Asia/Bangkok time */
export function formatBangkokTime(iso: string): string {
  const d = new Date(iso)
  const formatted = new Intl.DateTimeFormat("th-TH", {
    timeZone: "Asia/Bangkok",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d)
  return `${formatted} น.`
}
