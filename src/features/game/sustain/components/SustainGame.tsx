"use client"

import Link from "next/link"
import { HelpCircle } from "lucide-react"
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react"
import { Header } from "@/components/Headers"
import { HowToPlayModal } from "./HowToPlayModal"
import { SustainBins } from "./SustainBins"
import { SustainHud } from "./SustainHud"
import { SustainTrashItem } from "./SustainTrashItem"
import {
  SUSTAIN_BINS,
  SUSTAIN_GAME_DURATION,
  SUSTAIN_GAME_HEIGHT,
  SUSTAIN_GAME_WIDTH,
  SUSTAIN_SCORE_PER_TRASH,
  SUSTAIN_TRASH_ITEMS,
} from "../data/sustainGame"
import { consumeSustainPlay, defaultPlaysState, fetchSustainPlays } from "../utils/plays"
import type { SustainFallingTrash, SustainGamePhase, SustainPlaysResponse } from "../types/sustain"
const RANDOM_SCORES = [5, 10, 15, 20, 25]

const randomScore = () => RANDOM_SCORES[Math.floor(Math.random() * RANDOM_SCORES.length)]
type DragState = {
  id: string
  offsetX: number
  offsetY: number
  pointerId: number
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const getRandomTrash = (): SustainFallingTrash => {
  const template = SUSTAIN_TRASH_ITEMS[Math.floor(Math.random() * SUSTAIN_TRASH_ITEMS.length)]
  const size = 54
  const x = 18 + Math.random() * (SUSTAIN_GAME_WIDTH - size - 36)

  return {
    ...template,
    score: randomScore(),
    instanceId: `${template.id}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    x,
    y: -size,
    size,
    speed: 92,
    isDragging: false,
  }
}

const getBinUnderTrash = (trash: SustainFallingTrash) => {
  const centerX = trash.x + trash.size / 2
  const centerY = trash.y + trash.size / 2

  return SUSTAIN_BINS.find(
    (bin) =>
      centerX >= bin.x &&
      centerX <= bin.x + bin.width &&
      centerY >= bin.y &&
      centerY <= bin.y + bin.height
  )
}

export function SustainGame() {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const dragRef = useRef<DragState | null>(null)
  const frameRef = useRef<number | null>(null)
  const lastFrameAtRef = useRef(0)
  const startedAtRef = useRef(0)
  const spawnElapsedRef = useRef(0)

  const [phase, setPhase] = useState<SustainGamePhase>("home")
  const [plays, setPlays] = useState<SustainPlaysResponse>(() => defaultPlaysState())
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(SUSTAIN_GAME_DURATION)
  const [countdown, setCountdown] = useState(3)
  const [trash, setTrash] = useState<SustainFallingTrash[]>([])
  const [showHowTo, setShowHowTo] = useState(false)
  const [isLoadingPlays, setIsLoadingPlays] = useState(true)
  const [isStarting, setIsStarting] = useState(false)

  useEffect(() => {
    let isActive = true

    fetchSustainPlays()
      .then((nextPlays) => {
        if (isActive) {
          setPlays(nextPlays)
        }
      })
      .catch(() => {
        if (isActive) {
          setPlays(defaultPlaysState())
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoadingPlays(false)
        }
      })

    return () => {
      isActive = false
    }
  }, [])

  const syncPlays = useCallback(async () => {
    try {
      setPlays(await fetchSustainPlays())
    } catch {
      setPlays(defaultPlaysState())
    }
  }, [])

  useEffect(() => {
    if (phase !== "countdown") return

    const interval = window.setInterval(() => {
      setCountdown((current) => {
        if (current <= 1) {
          window.clearInterval(interval)
          setPhase("playing")
          return 1
        }

        return current - 1
      })
    }, 900)

    return () => window.clearInterval(interval)
  }, [phase])

  useEffect(() => {
    if (phase !== "playing") return

    startedAtRef.current = performance.now()
    lastFrameAtRef.current = startedAtRef.current
    spawnElapsedRef.current = 0

    const tick = (now: number) => {
      const deltaSeconds = Math.min((now - lastFrameAtRef.current) / 1000, 0.05)
      const elapsedSeconds = (now - startedAtRef.current) / 1000
      lastFrameAtRef.current = now

      const remaining = Math.max(0, Math.ceil(SUSTAIN_GAME_DURATION - elapsedSeconds))
      setTimeLeft(remaining)

      if (elapsedSeconds >= SUSTAIN_GAME_DURATION) {
        setPhase("finished")
        return
      }

      spawnElapsedRef.current += deltaSeconds * 1000
      const spawnInterval = Math.max(430, 940 - elapsedSeconds * 18)
      const fallSpeed = Math.min(310, 92 + elapsedSeconds * 8.8)
      const spawnedTrash: SustainFallingTrash[] = []

      while (spawnElapsedRef.current >= spawnInterval) {
        spawnElapsedRef.current -= spawnInterval
        spawnedTrash.push(getRandomTrash())
      }

      setTrash((current) => {
        const next = current
          .map((item) =>
            item.isDragging
              ? item
              : {
                  ...item,
                  y: item.y + fallSpeed * deltaSeconds,
                  speed: fallSpeed,
                }
          )
          .filter((item) => item.y < SUSTAIN_GAME_HEIGHT + item.size)

        return [...next, ...spawnedTrash]
      })

      frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [phase])

  const resetRound = useCallback(() => {
    setScore(0)
    setTrash([])
    setTimeLeft(SUSTAIN_GAME_DURATION)
    dragRef.current = null
  }, [])

  const startGame = useCallback(async () => {
    if (plays.remainingPlays <= 0 || isStarting) return

    setIsStarting(true)
    try {
      const nextPlays = await consumeSustainPlay()
      setPlays(nextPlays)
      resetRound()
      setCountdown(3)
      setPhase("countdown")
    } catch {
      await syncPlays()
    } finally {
      setIsStarting(false)
    }
  }, [isStarting, plays.remainingPlays, resetRound, syncPlays])

  const getPointerPosition = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current
    if (!stage) return { x: 0, y: 0 }

    const rect = stage.getBoundingClientRect()
    return {
      x: ((event.clientX - rect.left) / rect.width) * SUSTAIN_GAME_WIDTH,
      y: ((event.clientY - rect.top) / rect.height) * SUSTAIN_GAME_HEIGHT,
    }
  }, [])

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (phase !== "playing") return

      const position = getPointerPosition(event)
      const target = trash
        .slice()
        .reverse()
        .find(
          (item) =>
            position.x >= item.x &&
            position.x <= item.x + item.size &&
            position.y >= item.y &&
            position.y <= item.y + item.size
        )

      if (!target) return

      event.currentTarget.setPointerCapture(event.pointerId)
      dragRef.current = {
        id: target.instanceId,
        offsetX: position.x - target.x,
        offsetY: position.y - target.y,
        pointerId: event.pointerId,
      }

      setTrash((current) =>
        current.map((item) =>
          item.instanceId === target.instanceId ? { ...item, isDragging: true } : item
        )
      )
    },
    [getPointerPosition, phase, trash]
  )

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current
      if (!drag || phase !== "playing") return

      const position = getPointerPosition(event)
      setTrash((current) =>
        current.map((item) =>
          item.instanceId === drag.id
            ? {
                ...item,
                x: clamp(position.x - drag.offsetX, 0, SUSTAIN_GAME_WIDTH - item.size),
                y: clamp(position.y - drag.offsetY, 0, SUSTAIN_GAME_HEIGHT - item.size),
              }
            : item
        )
      )
    },
    [getPointerPosition, phase]
  )

  const handlePointerUp = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current
      if (!drag || phase !== "playing") return

      const droppedTrash = trash.find((item) => item.instanceId === drag.id)
      const targetBin = droppedTrash ? getBinUnderTrash(droppedTrash) : undefined

      if (droppedTrash && targetBin?.type === droppedTrash.type) {
        setScore((current) => current + droppedTrash.score)
      }

      setTrash((current) => current.filter((item) => item.instanceId !== drag.id))

      if (event.currentTarget.hasPointerCapture(drag.pointerId)) {
        event.currentTarget.releasePointerCapture(drag.pointerId)
      }
      dragRef.current = null
    },
    [phase, trash]
  )

  const canStart = plays.remainingPlays > 0 && !isLoadingPlays && !isStarting

  return (
    <main className="min-h-[100svh] bg-[#f9f9f9] text-black">
      <div className="mx-auto flex min-h-[100svh] w-full max-w-[393px] flex-col overflow-hidden bg-[#f9f9f9]">
        <Header />

        <div
          ref={stageRef}
          className="relative min-h-[600px] flex-1 overflow-hidden bg-[#cfcfcf] touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <SustainHud score={score} timeLeft={timeLeft} />

          {trash.map((item) => (
            <SustainTrashItem key={item.instanceId} trash={item} />
          ))}

          <SustainBins bins={SUSTAIN_BINS} />

          {phase === "home" && (
            <section className="absolute left-1/2 top-[82px] z-30 w-[268px] -translate-x-1/2 rounded-2xl bg-[#eeeeee] px-5 pb-5 pt-6 text-center shadow-sm">
              <button
                type="button"
                aria-label="ดูวิธีเล่น"
                onClick={() => setShowHowTo(true)}
                className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full bg-black/10 text-black/65 transition active:scale-95"
              >
                <HelpCircle size={18} strokeWidth={2.2} />
              </button>

              <h1 className="text-2xl font-semibold">เกมแยกขยะ</h1>
              <p className="mt-6 text-sm font-semibold text-black/75">logo</p>

              <button
                type="button"
                disabled={!canStart}
                onClick={startGame}
                className="mt-7 rounded-full bg-[#e2383c] px-6 py-3 text-xl font-bold text-white transition active:scale-95 disabled:bg-white/45 disabled:text-black/15"
              >
                {isStarting
                  ? "กำลังเริ่ม..."
                  : `เริ่มเกม (${plays.remainingPlays}/${plays.maxPlays})`}
              </button>

              <Link
                href="/game"
                className="mx-auto mt-4 flex h-9 w-[134px] items-center justify-center rounded-full bg-[#2c2c2c] text-sm font-semibold text-white transition active:scale-95"
              >
                กลับหน้าหลัก
              </Link>

              <p className="mt-3 text-[11px] font-semibold text-black/65">
                *เปิดให้เล่น 10:67-11:67
              </p>
            </section>
          )}

          {phase === "countdown" && (
            <div className="absolute inset-0 z-30 flex items-center justify-center pb-20 text-4xl font-semibold">
              {countdown}
            </div>
          )}

          {phase === "finished" && (
            <section className="absolute left-1/2 top-[190px] z-30 w-[286px] -translate-x-1/2 rounded-2xl bg-[#eeeeee] px-6 py-6 text-center shadow-sm">
              <h2 className="text-2xl font-semibold">สรุปคะแนน</h2>
              <p className="mt-2 font-mono text-2xl font-semibold">{score}</p>

              <div className="mt-4 flex items-center justify-center gap-3">
                <Link
                  href="/game"
                  className="flex h-8 items-center justify-center rounded-full bg-[#2c2c2c] px-4 text-xs font-semibold text-white"
                >
                  กลับหน้าเกม
                </Link>
                <button
                  type="button"
                  disabled={plays.remainingPlays <= 0 || isStarting}
                  onClick={startGame}
                  className="flex h-8 items-center justify-center rounded-full bg-[#2c2c2c] px-4 text-xs font-semibold text-white transition active:scale-95 disabled:bg-black/20 disabled:text-black/30"
                >
                  เล่นต่อ ({plays.remainingPlays}/{plays.maxPlays})
                </button>
              </div>
            </section>
          )}

          <HowToPlayModal open={showHowTo} onClose={() => setShowHowTo(false)} />
        </div>
      </div>
    </main>
  )
}
