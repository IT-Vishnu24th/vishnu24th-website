"use client"
import { Header2 } from "@/components/Headers"
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
  SUSTAIN_TRASH_ITEMS,
} from "../data/sustainGame"
import { defaultPlaysState, fetchSustainPlays } from "../utils/plays"
import { recordSustainRound } from "../utils/score"
import type {
  SustainFallingTrash,
  SustainGamePhase,
  SustainPlaysResponse,
  SustainTrashType,
} from "../types/sustain"

const RANDOM_SCORES = [1]

const randomScore = () => RANDOM_SCORES[Math.floor(Math.random() * RANDOM_SCORES.length)]

type DragState = {
  id: string
  offsetX: number
  offsetY: number
  pointerId: number
}

type ScorePopup = {
  id: string
  x: number
  y: number
  label: string
  isHit: boolean
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const getRandomTrash = (): SustainFallingTrash => {
  const template = SUSTAIN_TRASH_ITEMS[Math.floor(Math.random() * SUSTAIN_TRASH_ITEMS.length)]
  const size = 54
  const x = 18 + Math.random() * (SUSTAIN_GAME_WIDTH - size - 36)

  return {
    ...template,
    score: 1,
    instanceId: `${template.id}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    x,
    y: -size,
    size,
    speed: 35,
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

const getBinUnderX = (centerX: number) =>
  SUSTAIN_BINS.find((bin) => centerX >= bin.x - 12 && centerX <= bin.x + bin.width + 12)

export function SustainGame() {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const dragRef = useRef<DragState | null>(null)
  const frameRef = useRef<number | null>(null)
  const lastFrameAtRef = useRef(0)
  const startedAtRef = useRef(0)
  const spawnElapsedRef = useRef(0)
  const hasSubmittedScoreRef = useRef(false)

  const [phase, setPhase] = useState<SustainGamePhase>("home")
  const [plays, setPlays] = useState<SustainPlaysResponse>(() => defaultPlaysState())
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(SUSTAIN_GAME_DURATION)
  const [countdown, setCountdown] = useState(3)
  const [trash, setTrash] = useState<SustainFallingTrash[]>([])
  const [showHowTo, setShowHowTo] = useState(false)
  const [isLoadingPlays, setIsLoadingPlays] = useState(true)
  const [isStarting, setIsStarting] = useState(false)
  const [hoveredBinType, setHoveredBinType] = useState<SustainTrashType | null>(null)
  const [popups, setPopups] = useState<ScorePopup[]>([])

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

  // Fire once per finished round: record the score on the real backend.
  // This is also what actually consumes today's play, server-side.
  useEffect(() => {
    if (phase !== "finished") {
      hasSubmittedScoreRef.current = false
      return
    }
    if (hasSubmittedScoreRef.current) return
    hasSubmittedScoreRef.current = true

    recordSustainRound(score).then((result) => {
      if (result.plays) {
        setPlays(result.plays)
      } else {
        syncPlays()
      }
    })
  }, [phase, score, syncPlays])

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
      const spawnInterval = Math.max(1400, 1700 - elapsedSeconds * 3)
      const fallSpeed = Math.min(75, 35 + elapsedSeconds * 0.35)
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
    setPopups([])
    setHoveredBinType(null)
    dragRef.current = null
  }, [])

  const startGame = useCallback(async () => {
    if (plays.remainingPlays <= 0 || isStarting) return

    setIsStarting(true)
    try {
      // Recheck against the server in case another tab/device already used
      // a play — we no longer pre-consume one here, since the backend
      // consumes it atomically when the round's score is recorded at finish.
      const latest = await fetchSustainPlays()
      setPlays(latest)
      if (latest.remainingPlays <= 0) return

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

  const spawnPopup = useCallback(
    (bin: (typeof SUSTAIN_BINS)[number], label: string, isHit: boolean) => {
      const id = `${bin.type}-${Date.now()}-${Math.random().toString(16).slice(2)}`
      setPopups((current) => [
        ...current,
        { id, x: bin.x + bin.width / 2, y: bin.y - 12, label, isHit },
      ])
      window.setTimeout(() => {
        setPopups((current) => current.filter((popup) => popup.id !== id))
      }, 850)
    },
    []
  )

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
      let nextCenterX = position.x

      setTrash((current) =>
        current.map((item) => {
          if (item.instanceId !== drag.id) return item

          const nextX = clamp(position.x - drag.offsetX, 0, SUSTAIN_GAME_WIDTH - item.size)
          const nextY = clamp(position.y - drag.offsetY, 0, SUSTAIN_GAME_HEIGHT - item.size)
          nextCenterX = nextX + item.size / 2
          return { ...item, x: nextX, y: nextY }
        })
      )

      const bin = getBinUnderX(nextCenterX)
      setHoveredBinType(bin?.type ?? null)
    },
    [getPointerPosition, phase]
  )

  const handlePointerUp = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current
      if (!drag || phase !== "playing") return

      const droppedTrash = trash.find((item) => item.instanceId === drag.id)
      const targetBin = droppedTrash ? getBinUnderTrash(droppedTrash) : undefined

      if (droppedTrash && targetBin) {
        const isHit = targetBin.type === droppedTrash.type
        if (isHit) {
          setScore((current) => current + droppedTrash.score)
        }
        spawnPopup(targetBin, isHit ? `+${droppedTrash.score}` : "+0", isHit)
      }

      setTrash((current) => current.filter((item) => item.instanceId !== drag.id))
      setHoveredBinType(null)

      if (event.currentTarget.hasPointerCapture(drag.pointerId)) {
        event.currentTarget.releasePointerCapture(drag.pointerId)
      }
      dragRef.current = null
    },
    [phase, trash, spawnPopup]
  )

  const canStart = plays.remainingPlays > 0 && !isLoadingPlays && !isStarting

  return (
    <main className="min-h-[100svh] bg-[#f9f9f9] text-black">
      <div className="mx-auto flex min-h-[100svh] w-full max-w-[393px] flex-col overflow-hidden bg-[#f9f9f9] font-mitr">
        <section className="w-full bg-[linear-gradient(180deg,#2D3542_0%,#934E43_100%)] text-black">
          <Header2 title="เกมส์" url="/game" />
          <div className="w-full h-7"></div>
          <div className="w-full relative h-3 [@media(min-width:480px)]:h-5">
            <img src="/explore/clay_curve.svg" alt="" className="w-full absolute z-10" />
            <img src="/explore/light_clay_curve.svg" alt="" className="w-full absolute z-20" />
          </div>
        </section>

        <div
          ref={stageRef}
          className="relative min-h-[600px] flex-1 overflow-hidden touch-none"
          style={{
            backgroundImage: "url('/game/sustain-game-bg.png')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <SustainHud score={score} timeLeft={timeLeft} />

          {trash.map((item) => (
            <SustainTrashItem key={item.instanceId} trash={item} />
          ))}

          {popups.map((popup) => (
            <div
              key={popup.id}
              className={`pointer-events-none absolute z-30 -translate-x-1/2 font-mono text-xl font-extrabold drop-shadow animate-popup ${
                popup.isHit ? "text-[#2fbf5c]" : "text-[#e0413a]"
              }`}
              style={{
                left: `${(popup.x / SUSTAIN_GAME_WIDTH) * 100}%`,
                top: `${(popup.y / SUSTAIN_GAME_HEIGHT) * 100}%`,
              }}
            >
              {popup.label}
            </div>
          ))}

          <SustainBins
            bins={SUSTAIN_BINS}
            hoveredBinType={phase === "playing" ? hoveredBinType : null}
          />

          {(phase === "home" || phase === "finished") && (
            <div className="absolute inset-0 z-30 bg-black/45" />
          )}

          {phase === "home" && (
            <section className=" absolute left-1/2 top-[100px] z-40 w-[280px] -translate-x-1/2 rounded-[4px] bg-[url('/game/paper-texture.png')] bg-cover bg-center px-6 pb-6 pt-8 text-center shadow-xl">
              <h1 className="font-sov-yeehor text-[40px] font-medium leading-snug text-[#8a3a2c]">
                ความจริงหน่ะ
                <br />
                มีเพียงถังเดียวเท่านั้น
              </h1>

              <button
                type="button"
                disabled={!canStart}
                onClick={startGame}
                className="font-sov-yeehor relative mt-4 mb-2 h-14 rounded-full bg-[#e2683c] px-20 text-[30px] font-medium text-white shadow-sm transition active:scale-95 disabled:bg-black/10 disabled:text-black/25"
              >
                <span className="absolute inset-0 flex items-center justify-center leading-none -translate-y-[4px]">
                  {isStarting
                    ? "กำลังเริ่ม..."
                    : `เริ่มเกม (${plays.remainingPlays}/${plays.maxPlays})`}
                </span>
              </button>

              <div className="font-fc-quantum mt-4 flex items-center justify-center gap-3 text-[13px] font-medium text-[#c96a4d]">
                <Link
                  href="/game"
                  className="flex h-9 items-center justify-center rounded-full bg-[#f1d9c6] px-4 transition active:scale-95"
                >
                  กลับหน้าหลัก
                </Link>
                <button
                  type="button"
                  onClick={() => setShowHowTo(true)}
                  className="flex h-9 items-center justify-center gap-1.5 rounded-full border-2 border-[#f1d9c6] px-4 transition active:scale-95"
                >
                  <HelpCircle size={14} strokeWidth={2.4} />
                  วิธีเล่น
                </button>
              </div>
            </section>
          )}

          {phase === "countdown" && (
            <div className="absolute inset-0 z-40 flex items-center justify-center pb-20">
              <span
                key={countdown}
                className="font-serif-th text-7xl font-bold text-white drop-shadow-lg animate-countdown"
              >
                {countdown}
              </span>
            </div>
          )}

          {phase === "finished" && (
            <section className="absolute left-1/2 top-[190px] z-40 w-[280px] -translate-x-1/2 rounded-[4px] bg-[url('/game/paper-texture.png')] bg-cover bg-center px-6 py-8 text-center shadow-xl">
              <h2 className="font-sov-yeehor  text-[51px] font-medium text-[#BA604E]">สรุปคะแนน</h2>
              <p className="font-sov-yeehor -mt-8 text-[100px] font-sov-yeehor text-4xl font-medium text-[#8a3a2c]">
                {score}
              </p>

              <div className="font-fc-quantum  text-[30px] mt-5 flex items-center justify-center gap-3">
                <Link
                  href="/game"
                  className="flex h-9 items-center justify-center rounded-full bg-[#f1d9c6] px-4 text-sm font-semibold text-[#8a3a2c] transition active:scale-95"
                >
                  กลับหน้าเกม
                </Link>
                <button
                  type="button"
                  disabled={plays.remainingPlays <= 0 || isStarting}
                  onClick={startGame}
                  className="flex h-9 items-center justify-center rounded-full bg-[#e2683c] px-4 text-sm font-semibold text-white transition active:scale-95 disabled:bg-[#f1d9c6] disabled:text-[#8a3a2c]/40"
                >
                  เล่นต่อ ({plays.remainingPlays}/{plays.maxPlays})
                </button>
              </div>
            </section>
          )}

          <HowToPlayModal open={showHowTo} onClose={() => setShowHowTo(false)} />
        </div>
      </div>

      <style jsx global>{`
        .font-mitr {
          font-family: "Mitr", sans-serif;
        }
        .font-serif-th {
          font-family: "Chonburi", serif;
        }
        @keyframes popup-float {
          0% {
            opacity: 0;
            transform: translate(-50%, 6px) scale(0.8);
          }
          20% {
            opacity: 1;
            transform: translate(-50%, -4px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -34px) scale(1);
          }
        }
        .animate-popup {
          animation: popup-float 0.85s ease-out forwards;
        }
        @keyframes countdown-pop {
          0% {
            opacity: 0;
            transform: scale(0.6);
          }
          40% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-countdown {
          animation: countdown-pop 0.35s ease-out;
        }
      `}</style>
    </main>
  )
}
