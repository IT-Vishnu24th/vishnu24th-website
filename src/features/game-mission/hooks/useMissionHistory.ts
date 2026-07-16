"use client"

import { useQuery } from "@tanstack/react-query"
import type { UserAnswerHistoryItem } from "@/types/mission"

async function fetchMissionHistory(): Promise<UserAnswerHistoryItem[]> {
  const res = await fetch("/api/users/me/missions")
  const json = await res.json()
  if (!res.ok) {
    throw new Error(json?.message ?? "โหลดประวัติการตอบไม่สำเร็จ")
  }
  // Defensive: some empty-state responses come back as {} rather than [].
  return Array.isArray(json?.data) ? json.data : []
}

export function useMissionHistory() {
  return useQuery({
    queryKey: ["mission-history"],
    queryFn: fetchMissionHistory,
    staleTime: 30_000,
  })
}

/** Convenience selector for a single question's history item, if any */
export function useMissionHistoryItem(questionId: string) {
  const { data, ...rest } = useMissionHistory()
  const list = Array.isArray(data) ? data : []
  const item = list.find((entry) => entry.id === questionId) ?? null
  return { item, ...rest }
}
