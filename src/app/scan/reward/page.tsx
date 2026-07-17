"use client"

import { useEffect, useMemo, useState, useSyncExternalStore } from "react"
import { Header2 } from "@/components/Headers"
import { useRouter } from "next/navigation"
import type { ScanResponse } from "@/types/scan"
import Image from "next/image"
import { club_data } from "@/features/clubs/const/club-data"

type ParsedScanResult =
  | { status: "missing"; result: null; error?: never }
  | { status: "invalid"; result: null; error: unknown }
  | { status: "valid"; result: ScanResponse; error?: never }

const subscribeToScanResult = (onStoreChange: () => void) => {
  window.addEventListener("storage", onStoreChange)
  return () => window.removeEventListener("storage", onStoreChange)
}

const getScanResultSnapshot = () => sessionStorage.getItem("scanResult")

const getScanResultServerSnapshot = () => null

export default function RewardPage() {
  const router = useRouter()

  const [opened, setOpened] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const rawScanResult = useSyncExternalStore(
    subscribeToScanResult,
    getScanResultSnapshot,
    getScanResultServerSnapshot
  )

  const parsedScanResult = useMemo<ParsedScanResult>(() => {
    if (!rawScanResult) return { status: "missing", result: null }
    try {
      return { status: "valid", result: JSON.parse(rawScanResult) as ScanResponse }
    } catch (err) {
      return { status: "invalid", result: null, error: err }
    }
  }, [rawScanResult])

  const result = parsedScanResult.result

  useEffect(() => {
    if (parsedScanResult.status === "missing") {
      if (!sessionStorage.getItem("scanResult")) {
        router.replace("/scan")
      }
      return
    }

    sessionStorage.removeItem("scanResult")

    if (parsedScanResult.status === "invalid") {
      console.error("Failed to parse scan result:", parsedScanResult.error)
      router.replace("/scan")
    }
  }, [parsedScanResult, router])

  const club = useMemo(() => {
    if (!result) return undefined

    return club_data.find((c) => c.code.toLowerCase() === result.code.toLowerCase())
  }, [result])

  function openBox() {
    if (opened) return
    setOpened(true)

    setTimeout(() => {
      setShowResult(true)
    }, 2000)
  }

  if (!result) return null

  return (
    <div className="mx-auto min-h-screen bg-brownie">
      {/* Header */}
      <div className="relative bg-gradient-to-b from-midnight to-brownie">
        <Header2 url="/game" title="เกมส์" />

        <div className="relative px-4">
          <div className="text-center">
            <h1 className="text-6xl font-sov-yeehor">เช็คอินดาว</h1>

            <p className="mt-4 text-2xl font-fc-quantum">{club?.name.th ?? result.code}</p>
          </div>
        </div>

        <div className="relative mt-3 h-10 w-full overflow-hidden">
          <Image src="/map/map-line.png" alt="" fill className="object-fill scale-102 z-10" />
        </div>
      </div>

      {/* Body */}
      <div className="relative -mt-5 bg-gradient-to-b from-brownie via-turqoise-light to-brownie pt-10 pb-16">
        <Image src="/scan/slide-bg.png" alt="" fill className="pointer-events-none object-fill" />

        <div className="relative z-10">
          {/* Club Logo */}
          <div className="flex justify-center">
            <div className="relative h-32 w-32 overflow-hidden rounded-full bg-white shadow-lg">
              {club?.imageUrl ? (
                <Image
                  src={`/club/clublogo/${club.imageUrl}`}
                  alt={club.name.th}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-300 text-sm text-gray-600">
                  No Logo
                </div>
              )}
            </div>
          </div>

          {/* Text */}
          <div className="pt-10 text-center">
            <p className="text-2xl font-fc-quantum text-brownie">เปิดหีบสมบัติเพื่อลุ้นคะแนน</p>

            <p className="mt-2 font-fc-quantum text-brownie">(1 ชมรม / 1 ครั้ง)</p>
          </div>

          {/* Treasure Box */}
          <div className="flex justify-center ">
            <button onClick={openBox} disabled={opened} className="transition active:scale-95">
              <Image
                src={opened ? "/scan/openchest.png" : "/scan/closedchest.png"}
                alt="Treasure Chest"
                width={180}
                height={180}
                className="h-[250px] w-[250px] object-contain"
                priority
              />
            </button>
          </div>

          <p className=" text-center font-fc-quantum text-midnight">แตะที่หีบเพื่อเปิด</p>
        </div>
      </div>

      {/* Result Popup */}
      {showResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-[340px] overflow-hidden rounded-3xl shadow-xl">
            <Image src="/scan/popup-paper.png" alt="" fill className="object-fill" />

            <div className="relative z-10 px-8 py-8 text-center">
              <h2 className="font-sov-yeehor text-7xl text-brownie-dark">ยินดีด้วย!</h2>

              <p className="mt-2 font-sov-yeehor text-5xl text-brownie">คุณได้รับ</p>

              <div className="my-4 mx-4 rounded-2xl bg-cream-tanned">
                <span className="text-9xl text-brick-orange font-sov-yeehor relative -top-7">
                  {result.score}
                </span>
              </div>

              <p className="mb-8 font-sov-yeehor text-5xl text-brownie">คะแนน</p>

              <button
                onClick={() => router.replace("/scan")}
                className="w-full rounded-2xl bg-brownie py-3 font-fc-quantum text-white transition "
              >
                กลับหน้าเช็คอิน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
