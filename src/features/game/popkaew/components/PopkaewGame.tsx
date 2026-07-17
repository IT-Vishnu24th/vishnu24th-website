"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

import { PopkaewArtwork } from "./PopkaewArtwork"
import { PopkaewCharacter } from "./PopkaewCharacter"
import { PopkaewHeroSection } from "./PopkaewHeroSection"
import type { PopkaewMeResponse } from "../types"
import { formatPopkaewScore } from "../utils"

import { useFeatureFlag, usePopkaewClick, usePopkaewMe } from "@/hooks/useApi"
import useAuth from "@/hooks/useAuth"
import { PopkaewBottomsheet } from "./PopkaewBottomsheet"

const PRESS_ANIMATION_MS = 130
const FLUSH_INTERVAL = 10_000
const CLICK_THRESHOLD = 100

export function PopkaewGame() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const { data: featureFlag, isLoading } = useFeatureFlag("game-popkaew")
  const { data: me } = usePopkaewMe()
  const { mutate } = usePopkaewClick()

  const isPlayable = !isLoading && (featureFlag?.data.enabled ?? false) && user !== null

  const [optimisticClicks, setOptimisticClicks] = useState(0)
  const [isPressed, setIsPressed] = useState(false)

  const pendingClicksRef = useRef(0)
  const isFlushingRef = useRef(false)
  const score = (me?.data.popkaewscore ?? 0) + optimisticClicks

  const flushClicks = useCallback(() => {
    if (isFlushingRef.current) return

    const clicks = pendingClicksRef.current
    if (clicks === 0) return

    isFlushingRef.current = true
    pendingClicksRef.current = 0

    mutate(clicks, {
      onSuccess: (res) => {
        setOptimisticClicks((prev) => Math.max(0, prev - clicks))
        queryClient.setQueryData<{ data: PopkaewMeResponse }>(["popkaew", "me"], (current) =>
          current
            ? {
                ...current,
                data: {
                  ...current.data,
                  popkaewscore: res.data.score,
                },
              }
            : current
        )
      },
      onError: () => {
        pendingClicksRef.current += clicks
      },
      onSettled: () => {
        isFlushingRef.current = false
      },
    })
  }, [mutate, queryClient])

  useEffect(() => {
    if (!isPlayable) return
    const interval = setInterval(flushClicks, FLUSH_INTERVAL)
    return () => {
      clearInterval(interval)
      flushClicks()
    }
  }, [flushClicks, isPlayable])

  const handlePop = () => {
    if (!isPlayable || isPressed) return
    setIsPressed(true)
    setTimeout(() => {
      setIsPressed(false)
    }, PRESS_ANIMATION_MS)
    setOptimisticClicks((prev) => prev + 1)
    pendingClicksRef.current += 1
    if (pendingClicksRef.current >= CLICK_THRESHOLD) {
      flushClicks()
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <PopkaewHeroSection />
      <PopkaewArtwork />

      <p className="font-sov-yeehor absolute inset-x-0 top-75 z-20 text-center text-[64px] font-normal leading-[0.69] tracking-[1.28px] text-[#3c2927] tabular-nums">
        {formatPopkaewScore(score)}
      </p>

      <div className="absolute inset-x-0 top-85.5 z-20">
        <PopkaewCharacter disabled={!isPlayable} isPressed={isPressed} onPop={handlePop} />
      </div>
      <PopkaewBottomsheet />
    </section>
  )
}
