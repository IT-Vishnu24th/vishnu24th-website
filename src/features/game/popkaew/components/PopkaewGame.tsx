"use client"

import { ArrowLeft, RefreshCw } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import useAuth from "@/hooks/useAuth"

import { PopkaewCharacter } from "./PopkaewCharacter"
import type { PopkaewCurrentUser, PopkaewLeaderboardResponse, PopkaewVesselScore } from "../types"
import {
  fetchPopkaewLeaderboard,
  fetchPopkaewMe,
  fetchUserMe,
  formatPopkaewScore,
  getPopkaewErrorMessage,
  getVesselDisplayName,
  POPKAEW_BATCH_INTERVAL_MS,
  POPKAEW_LEADERBOARD_REFRESH_MS,
  POPKAEW_MAX_BATCH_SIZE,
  pushPopkaewClicks,
} from "../utils"

type ViewMode = "game" | "leaderboard"

const PRESS_ANIMATION_MS = 130

const fallbackLeaderboard: PopkaewVesselScore[] = Array.from({ length: 18 }, (_, index) => ({
  rank: index + 1,
  vesselName: {
    th: `ยานอนาคอนด้า ${index + 1}`,
    en: `Anaconda ${index + 1}`,
  },
  popkaewscore: 0,
}))

export function PopkaewGame() {
  const { user: authUser } = useAuth()
  const pressTimeoutRef = useRef<number | null>(null)
  const pendingClicksRef = useRef(0)
  const flushingRef = useRef(false)

  const [viewMode, setViewMode] = useState<ViewMode>("game")
  const [score, setScore] = useState(0)
  const [pendingClicks, setPendingClicks] = useState(0)
  const [isPressed, setIsPressed] = useState(false)
  const [currentUser, setCurrentUser] = useState<PopkaewCurrentUser | null>(null)
  const [playerVesselName, setPlayerVesselName] = useState<string | null>(null)
  const [leaderboard, setLeaderboard] = useState<PopkaewLeaderboardResponse>({
    vessels: [],
    vesselIndex: null,
  })
  const [canPlay, setCanPlay] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const visibleLeaderboard =
    leaderboard.vessels.length > 0 ? leaderboard.vessels : fallbackLeaderboard
  const ownVessel =
    leaderboard.vesselIndex === null ? null : leaderboard.vessels[leaderboard.vesselIndex]
  const ownVesselName =
    playerVesselName ?? (ownVessel ? getVesselDisplayName(ownVessel.vesselName) : null)

  const optimisticLeaderboard = useMemo(
    () =>
      visibleLeaderboard.map((item, index) =>
        isOwnVessel(item, index, leaderboard.vesselIndex, ownVesselName)
          ? {
              ...item,
              popkaewscore: item.popkaewscore + pendingClicks,
            }
          : item
      ),
    [leaderboard.vesselIndex, ownVesselName, pendingClicks, visibleLeaderboard]
  )

  const loadLeaderboard = useCallback(async (showSpinner = false) => {
    if (showSpinner) {
      setIsRefreshing(true)
    }

    try {
      const nextLeaderboard = await fetchPopkaewLeaderboard()
      setLeaderboard(nextLeaderboard)
      setErrorMessage(null)
    } catch (error) {
      setErrorMessage(getPopkaewErrorMessage(error))
    } finally {
      if (showSpinner) {
        setIsRefreshing(false)
      }
    }
  }, [])

  const flushClicks = useCallback(async () => {
    if (flushingRef.current || pendingClicksRef.current <= 0) return

    const amount = Math.min(pendingClicksRef.current, POPKAEW_MAX_BATCH_SIZE)
    pendingClicksRef.current -= amount
    setPendingClicks(pendingClicksRef.current)
    flushingRef.current = true

    try {
      const result = await pushPopkaewClicks(amount)
      setScore(result.score + pendingClicksRef.current)
      setErrorMessage(null)
      await loadLeaderboard(false)
    } catch {
      pendingClicksRef.current += amount
      setPendingClicks(pendingClicksRef.current)
      setErrorMessage("ยังส่งคะแนนไม่สำเร็จ ระบบจะลองใหม่อัตโนมัติ")
    } finally {
      flushingRef.current = false
    }
  }, [loadLeaderboard])

  const flushClicksWithBeacon = useCallback(() => {
    const amount = Math.min(pendingClicksRef.current, POPKAEW_MAX_BATCH_SIZE)
    if (amount <= 0 || !navigator.sendBeacon) return false

    const payload = new Blob([JSON.stringify({ amount })], {
      type: "application/json",
    })
    const queued = navigator.sendBeacon("/api/popkaew/click", payload)

    if (queued) {
      pendingClicksRef.current -= amount
      setPendingClicks(pendingClicksRef.current)
    }

    return queued
  }, [])

  useEffect(() => {
    let isActive = true

    Promise.allSettled([fetchPopkaewMe(), fetchPopkaewLeaderboard(), fetchUserMe()])
      .then(([playerResult, leaderboardResult, userResult]) => {
        if (!isActive) return

        if (userResult.status === "fulfilled") {
          setCurrentUser(userResult.value)
        }

        if (playerResult.status === "fulfilled") {
          const player = playerResult.value

          setPlayerVesselName(getVesselDisplayName(player.vesselName))
          setScore(player.popkaewscore)
          setCanPlay(true)
        } else {
          setCanPlay(false)
          setErrorMessage(getPopkaewErrorMessage(playerResult.reason))
        }

        if (leaderboardResult.status === "fulfilled") {
          setLeaderboard(leaderboardResult.value)
        } else if (playerResult.status === "fulfilled") {
          setErrorMessage(getPopkaewErrorMessage(leaderboardResult.reason))
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false)
        }
      })

    return () => {
      isActive = false
    }
  }, [])

  useEffect(() => {
    const interval = window.setInterval(() => {
      void flushClicks()
    }, POPKAEW_BATCH_INTERVAL_MS)

    return () => window.clearInterval(interval)
  }, [flushClicks])

  useEffect(() => {
    if (!canPlay) return

    const interval = window.setInterval(() => {
      void loadLeaderboard(false)
    }, POPKAEW_LEADERBOARD_REFRESH_MS)

    return () => window.clearInterval(interval)
  }, [canPlay, loadLeaderboard])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && !flushClicksWithBeacon()) {
        void flushClicks()
      }
    }

    window.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("pagehide", handleVisibilityChange)

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("pagehide", handleVisibilityChange)
      void flushClicks()

      if (pressTimeoutRef.current) {
        window.clearTimeout(pressTimeoutRef.current)
      }
    }
  }, [flushClicks, flushClicksWithBeacon])

  const handlePop = useCallback(() => {
    if (isLoading || !canPlay) return

    pendingClicksRef.current += 1
    setPendingClicks(pendingClicksRef.current)
    setScore((current) => current + 1)
    setIsPressed(true)

    if (pressTimeoutRef.current) {
      window.clearTimeout(pressTimeoutRef.current)
    }
    pressTimeoutRef.current = window.setTimeout(() => {
      setIsPressed(false)
    }, PRESS_ANIMATION_MS)
  }, [canPlay, isLoading])

  const handleRefresh = useCallback(async () => {
    await flushClicks()
    await loadLeaderboard(true)
  }, [flushClicks, loadLeaderboard])

  const isLeaderboardOpen = viewMode === "leaderboard"
  const headerUser = currentUser ?? authUser

  return (
    <main className="min-h-[100svh] bg-[#2d3542] text-[#3c2927]">
      <div className="mx-auto flex min-h-[100svh] w-full max-w-[393px] flex-col overflow-hidden bg-[#2d3542] shadow-2xl">
        <section className="relative h-[874px] min-h-[100svh] overflow-hidden bg-[#2d3542]">
          <SceneArtwork />
          <HeaderButtons user={headerUser} />

          {!isLeaderboardOpen && (
            <>
              <p className="font-sov-yeehor absolute inset-x-0 top-[276px] z-20 text-center text-[64px] font-normal leading-[0.69] tracking-[1.28px] text-[#3c2927] tabular-nums">
                {formatPopkaewScore(score)}
              </p>

              <div className="absolute inset-x-0 top-[318px] z-20">
                <PopkaewCharacter disabled={!canPlay} isPressed={isPressed} onPop={handlePop} />
              </div>

              <LeaderboardPreview
                rows={optimisticLeaderboard.slice(0, 3)}
                ownIndex={leaderboard.vesselIndex}
                ownVesselName={ownVesselName}
                onExpand={() => setViewMode("leaderboard")}
              />
            </>
          )}

          {isLeaderboardOpen && (
            <FullLeaderboard
              rows={optimisticLeaderboard}
              ownIndex={leaderboard.vesselIndex}
              ownVesselName={ownVesselName}
              isRefreshing={isRefreshing}
              onCollapse={() => setViewMode("game")}
              onRefresh={handleRefresh}
            />
          )}

          {pendingClicks > 0 && canPlay && (
            <p className="font-fc-quantum absolute left-1/2 top-[256px] z-30 -translate-x-1/2 rounded-full bg-[#f2e6d0]/75 px-3 py-1 text-[14px] leading-none text-[#3c2927] shadow-sm tabular-nums">
              +{formatPopkaewScore(pendingClicks)}
            </p>
          )}

          {errorMessage && (
            <div className="absolute inset-x-6 bottom-[196px] z-50 rounded-md bg-[#2d3542]/90 px-3 py-2 text-center text-[12px] font-semibold text-white shadow-lg">
              {errorMessage}
            </div>
          )}

          {isLoading && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#273245]/20 text-sm font-bold text-[#273245]">
              กำลังโหลด...
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

function SceneArtwork() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-x-0 top-[62px] z-0 h-[72px] bg-[linear-gradient(180deg,#2d3542_0%,#934e43_100%)]" />
      <div className="absolute inset-x-0 top-[134px] z-0 h-[740px] bg-[linear-gradient(180deg,#aeefe7_0%,#aeefe7_16%,#f2e6d0_45%,#f2e6d0_63%,#ba604e_76%,#f0865c_100%)]" />
      <Image
        src="/game-popkaew/top-canopy-section.png"
        alt=""
        width={393}
        height={100}
        priority
        className="absolute inset-x-0 top-[62px] z-[2] h-[100px] w-full object-fill"
      />
      <Image
        src="/game-popkaew/orange-planet-left-edge.png"
        alt=""
        width={66}
        height={157}
        className="absolute left-0 top-[152px] z-[2] h-[157px] w-[66px] object-contain"
      />
      <Image
        src="/game-popkaew/orange-planet.png"
        alt=""
        width={65}
        height={87}
        className="absolute left-[-14px] top-[338px] z-[2]"
      />
      <Image
        src="/game-popkaew/aqua-planet-right-edge.png"
        alt=""
        width={215}
        height={237}
        className="absolute left-[178px] top-[136px] z-[1] h-[237px] w-[222px] object-cover"
      />
      <Image
        src="/game-popkaew/popkaew-title-sign.png"
        alt=""
        width={284}
        height={142}
        priority
        className="absolute left-[55px] top-[134px] z-[2]"
      />
      <Image
        src="/game-popkaew/crystal-left.png"
        alt=""
        width={38}
        height={42}
        className="absolute left-[28px] top-[307px] z-[2]"
      />
      <Image
        src="/game-popkaew/floating-rock-left.png"
        alt=""
        width={65}
        height={87}
        className="absolute right-[0px] top-[338px] z-[2]"
      />
      <Image
        src="/game-popkaew/crystal-right-small.png"
        alt=""
        width={31}
        height={36}
        className="absolute right-[12px] top-[307px] z-[2]"
      />
      <Image
        src="/game-popkaew/floating-rock-right.png"
        alt=""
        width={45}
        height={61}
        className="absolute right-[62px] top-[338px] z-[2]"
      />
      <Image
        src="/game-popkaew/leaf-01.png"
        alt=""
        width={142}
        height={141}
        className="absolute left-[-31px] top-[439px] z-[2]"
      />
      <Image
        src="/game-popkaew/leaf-02.png"
        alt=""
        width={151}
        height={123}
        className="absolute left-[-15px] top-[518px] z-[3]"
      />
      <Image
        src="/game-popkaew/leaf-03.png"
        alt=""
        width={166}
        height={170}
        className="absolute right-[-28px] top-[417px] z-[2]"
      />
      <Image
        src="/game-popkaew/leaf-04.png"
        alt=""
        width={158}
        height={160}
        className="absolute right-[-41px] top-[502px] z-[3]"
      />
      <Image
        src="/game-popkaew/perch-log.png"
        alt=""
        width={274}
        height={121}
        priority
        className="absolute left-[59px] top-[493px] z-[2]"
      />
      <Image
        src="/game-popkaew/orange-divider-brush.png"
        alt=""
        width={274}
        height={121}
        priority
        className="absolute left-[59px] top-[590px] z-[2]"
      />
    </div>
  )
}

type HeaderButtonsProps = {
  user: PopkaewCurrentUser | null
}

function HeaderButtons({ user }: HeaderButtonsProps) {
  const preferredName = user ? user.name[user.prefLanguage] : null
  const fallbackName = user?.name.th ?? user?.name.en ?? null
  const displayName =
    preferredName?.nickname ||
    preferredName?.firstName ||
    fallbackName?.nickname ||
    fallbackName?.firstName ||
    "ข้อมูล"
  const displayNameWithPrefix = `${user?.role === "participant" ? "น้อง" : ""}${displayName}`
  const profileIndex = (Number(user?.id) || 0) % 4

  return (
    <header className="absolute inset-x-0 top-[74px] z-30 flex h-11 items-center justify-between px-4">
      <Link
        href="/game"
        aria-label="กลับหน้าเกม"
        className="font-fc-quantum flex h-11 items-center gap-[6px] rounded-full border-2 border-[#2d4b5f] bg-[#2d3542] px-3 text-[16px] leading-[1.4] text-[#74ddcf] active:scale-95"
      >
        <ArrowLeft size={20} strokeWidth={2} />
        <span>เกมส์</span>
      </Link>

      <button
        type="button"
        aria-label={displayNameWithPrefix}
        className="font-fc-quantum flex h-11 w-[122px] items-center gap-2 rounded-full border-2 border-[#2d4b5f] bg-[#2d3542] py-px pl-3 pr-px text-[16px] leading-[1.4] text-[#74ddcf] active:scale-95"
      >
        <span className="min-w-0 flex-1 truncate text-left">{displayNameWithPrefix}</span>
        <Image
          src={`/auth/profile/profile_${profileIndex}.png`}
          alt=""
          width={42}
          height={42}
          priority
          className="size-[42px] rounded-full border-2 border-[#2d3542] object-cover"
        />
      </button>
    </header>
  )
}

type LeaderboardRowsProps = {
  rows: PopkaewVesselScore[]
  ownIndex: number | null
  ownVesselName: string | null
}

type LeaderboardPreviewProps = LeaderboardRowsProps & {
  onExpand: () => void
}

function LeaderboardPreview({ rows, ownIndex, ownVesselName, onExpand }: LeaderboardPreviewProps) {
  return (
    <section className="absolute inset-x-0 bottom-0 z-30 h-[255px] pb-5">
      <Image
        src="/game-popkaew/leaderboard-preview-panel.png"
        alt=""
        width={393}
        height={284}
        priority
        className="absolute inset-x-0 bottom-0 h-[284px] w-full object-fill"
      />
      <button
        type="button"
        aria-label="ขยาย leaderboard"
        onClick={onExpand}
        className="absolute left-1/2 top-0 z-10 flex h-[29px] w-[52px] -translate-x-1/2 items-start justify-center active:scale-95"
      >
        <Image
          src="/game-popkaew/leaderboard-arrow.png"
          alt=""
          width={52}
          height={29}
          className="h-[29px] w-[52px] object-contain"
        />
      </button>

      <div className="relative z-10 mt-[39px] flex w-full flex-col gap-[10px]">
        {rows.map((row, index) => (
          <LeaderboardTextRow
            key={`${row.rank}-${getVesselDisplayName(row.vesselName)}`}
            row={row}
            isOwn={isOwnVessel(row, index, ownIndex, ownVesselName)}
            variant="preview"
            showBackground={false}
          />
        ))}
      </div>
    </section>
  )
}

type FullLeaderboardProps = LeaderboardRowsProps & {
  isRefreshing: boolean
  onCollapse: () => void
  onRefresh: () => void
}

function FullLeaderboard({
  rows,
  ownIndex,
  ownVesselName,
  isRefreshing,
  onCollapse,
  onRefresh,
}: FullLeaderboardProps) {
  return (
    <section className="absolute inset-x-0 bottom-0 top-[126px] z-40 overflow-y-auto bg-[#f0865c] pb-[60px] pt-[24px]">
      <Image
        src="/game-popkaew/top-highlight-arc.png"
        alt=""
        width={393}
        height={28}
        className="absolute inset-x-0 top-[-18px] h-7 w-full object-fill"
      />
      <button
        type="button"
        aria-label="ย่อ leaderboard"
        onClick={onCollapse}
        className="absolute left-1/2 top-0 z-10 flex h-[29px] w-[52px] -translate-x-1/2 items-start justify-center active:scale-95"
      >
        <Image
          src="/game-popkaew/leaderboard-arrow.png"
          alt=""
          width={52}
          height={29}
          className="h-[29px] w-[52px] rotate-180 object-contain"
        />
      </button>

      <div className="relative z-10 mx-auto mb-1 flex h-6 w-[355px] items-center justify-between">
        <h2 className="font-fc-quantum text-[20px] leading-[1.2] text-[#f2e6d0]">Leaderboard</h2>
        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          aria-label="รีเฟรชอันดับ"
          className="grid size-7 place-items-center rounded-full bg-[#3c2927] text-[#f2e6d0] disabled:opacity-60"
        >
          <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="relative z-10 mx-auto flex w-[355px] flex-col gap-[10px]">
        {rows.slice(0, 18).map((row, index) => (
          <LeaderboardTextRow
            key={`${row.rank}-${getVesselDisplayName(row.vesselName)}`}
            row={row}
            isOwn={isOwnVessel(row, index, ownIndex, ownVesselName)}
          />
        ))}
      </div>
    </section>
  )
}

type LeaderboardTextRowProps = {
  row: PopkaewVesselScore
  isOwn: boolean
  variant?: "default" | "preview"
  showBackground?: boolean
}

function LeaderboardTextRow({
  row,
  isOwn,
  variant = "default",
  showBackground = true,
}: LeaderboardTextRowProps) {
  const rowImage = getLeaderboardRowImage(row.rank)
  const textColor = row.rank <= 3 ? "text-[#f2e6d0]" : "text-[#3c2927]"
  const rankColor = row.rank <= 3 ? "text-[#f0bf99]" : "text-[#3c2927]"
  const isPreview = variant === "preview"

  return (
    <div
      className={`font-fc-quantum relative h-[42px] overflow-hidden rounded-[12px] leading-[1.2] tracking-normal ${
        isPreview ? "w-full text-[21px]" : "w-[355px] text-[20px]"
      } ${isOwn ? "ring-2 ring-[#74ddcf]" : ""}`}
    >
      {showBackground && <Image src={rowImage} alt="" fill sizes="355px" className="object-fill" />}
      <div
        className={`relative z-10 grid h-full grid-cols-[auto_1fr_auto] items-center ${
          isPreview ? "gap-[11px] px-[13px]" : "gap-[14px] px-[11px]"
        } ${textColor}`}
      >
        <span className={`tabular-nums ${rankColor}`}>#{row.rank}</span>
        <span className="min-w-0 truncate">{getVesselDisplayName(row.vesselName)}</span>
        <span className="tabular-nums">{formatPopkaewScore(row.popkaewscore)}</span>
      </div>
    </div>
  )
}

function isOwnVessel(
  row: PopkaewVesselScore,
  index: number,
  ownIndex: number | null,
  ownVesselName: string | null
) {
  return (
    index === ownIndex ||
    (!!ownVesselName && getVesselDisplayName(row.vesselName) === ownVesselName)
  )
}

function getLeaderboardRowImage(rank: number) {
  if (rank >= 1 && rank <= 3) {
    return `/game-popkaew/leaderboard-row-rank-${rank}.png`
  }

  return "/game-popkaew/leaderboard-row-default.png"
}
