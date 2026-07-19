"use client"

import { useQuery } from "@tanstack/react-query"

async function fetchServerTime(): Promise<Date> {
  const res = await fetch("/api/time")
  const json = await res.json()
  if (!res.ok) {
    throw new Error(json?.message ?? "โหลดเวลาไม่สำเร็จ")
  }
  return new Date(json.data)
}

export function useServerTime() {
  return useQuery({
    queryKey: ["time"],
    queryFn: fetchServerTime,
  })
}
