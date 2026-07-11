import { GameResult, PlayHistory } from "../types/game"
import { MAX_PLAYS_PER_DAY } from "../data/trash"

const PLAY_KEY = "sustain-game-play-history"
const SCORE_KEY = "sustain-game-best-score"

function isBrowser(): boolean {
  return typeof window !== "undefined"
}

function today(): string {
  return new Date().toISOString().split("T")[0]
}

export function getPlayHistory(): PlayHistory {
  if (!isBrowser()) {
    return {
      date: today(),
      plays: 0,
    }
  }

  const raw = localStorage.getItem(PLAY_KEY)

  if (!raw) {
    return {
      date: today(),
      plays: 0,
    }
  }

  try {
    const history = JSON.parse(raw) as PlayHistory

    if (history.date !== today()) {
      return {
        date: today(),
        plays: 0,
      }
    }

    return history
  } catch {
    return {
      date: today(),
      plays: 0,
    }
  }
}

export function savePlayHistory(history: PlayHistory): void {
  if (!isBrowser()) return

  localStorage.setItem(PLAY_KEY, JSON.stringify(history))
}

export function getRemainingPlays(): number {
  const history = getPlayHistory()

  return Math.max(0, MAX_PLAYS_PER_DAY - history.plays)
}

export function canPlayToday(): boolean {
  return getRemainingPlays() > 0
}

export function consumePlay(): boolean {
  if (!canPlayToday()) {
    return false
  }

  const history = getPlayHistory()

  savePlayHistory({
    date: today(),
    plays: history.plays + 1,
  })

  return true
}

export function getBestScore(): number {
  if (!isBrowser()) return 0

  const value = localStorage.getItem(SCORE_KEY)

  if (!value) return 0

  return Number(value)
}

export function saveBestScore(score: number): void {
  if (!isBrowser()) return

  const current = getBestScore()

  if (score > current) {
    localStorage.setItem(SCORE_KEY, score.toString())
  }
}

export function saveGameResult(result: GameResult): void {
  saveBestScore(result.score)

  // Reserved for future backend integration
  // Example:
  // POST /api/game-score
  // {
  //   score: result.score,
  //   total: result.total,
  //   goldenHour: isGoldenHour()
  // }
}

export function isGoldenHour(): boolean {
  const hour = new Date().getHours()

  // Example:
  // Golden Hour = 18:00–18:59
  // Adjust later if needed.
  return hour === 18
}
