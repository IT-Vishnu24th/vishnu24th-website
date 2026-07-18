"use client"

import { useState } from "react"
import { Header2 } from "@/components/Headers"
import { useRouter } from "next/navigation"
import Scanner from "@/features/scan/components/Scanner"
import { AppErrorCode } from "@/types/appErrorCode"
import Image from "next/image"

const ERROR_MESSAGES: Record<string, string> = {
  [AppErrorCode.CLUB_NOT_FOUND]: "ไม่พบชมรมนี้ ลองสแกนใหม่อีกครั้ง",
  [AppErrorCode.GROUP_NOT_FOUND]: "ไม่พบกลุ่มของคุณ",
  [AppErrorCode.ALREADY_SCANNED]: "คุณเช็คอินชมรมนี้ไปแล้ว",
  [AppErrorCode.DAILY_LIMIT_REACHED]: "คุณสแกนครบจำนวนที่กำหนดของวันนี้แล้ว",
  [AppErrorCode.RATE_LIMIT_EXCEEDED]: "สแกนถี่เกินไป กรุณารอสักครู่แล้วลองใหม่",
  [AppErrorCode.GAME_NOT_ACTIVE]: "กิจกรรมนี้ยังไม่เปิดใช้งาน",
  [AppErrorCode.UNAUTHORIZED]: "กรุณาเข้าสู่ระบบก่อนใช้งาน",
  [AppErrorCode.FORBIDDEN]: "คุณไม่มีสิทธิ์ใช้งานส่วนนี้",
}

export default function ScanPage() {
  const router = useRouter()
  const [isScanning, setIsScanning] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  async function handleScan(value: string) {
    if (isScanning) return // กันยิงซ้ำระหว่างรอ response

    setIsScanning(true)
    setErrorMsg(null)

    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clubId: value }),
      })

      const json = await res.json()

      if (!res.ok) {
        const code = json?.code
        setErrorMsg(ERROR_MESSAGES[code] ?? "สแกนไม่สำเร็จ ลองใหม่อีกครั้ง")
        setIsScanning(false)
        return
      }

      // ส่งผลลัพธ์ผ่าน query param แทน sessionStorage
      // กัน context หายตอนสแกน QR / สลับแอปบนมือถือ
      const params = new URLSearchParams({
        code: json.data.code,
        score: String(json.data.score),
      })
      router.replace(`/scan/reward?${params.toString()}`)
    } catch (err) {
      console.error("Scan request failed:", err)
      setErrorMsg("เกิดข้อผิดพลาด ลองใหม่อีกครั้ง")
      setIsScanning(false)
    }
  }

  return (
    <div className="mx-auto min-h-screen bg-brownie">
      {/* Header */}
      <section className="w-full bg-[linear-gradient(180deg,#2D3542_0%,#934E43_100%)] text-black">
        <Header2 url="/game" title="เกมส์" />
        <div className="px-4 pb-8 flex w-full flex-col items-center justify-center gap-8 text-center">
          <h1 className="whitespace-nowrap text-[64px] font-sov-yeehor font-normal leading-12.5 letter-spacing-[1.92px] text-cream">
            SCAN QR
          </h1>
          <p className="max-w-75 text-[20px] font-normal font-fc-quantum leading-none text-clay-light">
            สแกน QR เพื่อเช็คอินชมรม
          </p>
        </div>
        <div className="w-full relative h-3 [@media(min-width:480px)]:h-5">
          <img src="/explore/clay_curve.svg" alt="" className="w-full absolute z-20" />
          <img src="/explore/light_clay_curve.svg" alt="" className="w-full absolute z-30" />
        </div>
      </section>

      {/* Body */}
      <div className="relative min-h-[calc(100vh-180px)] bg-gradient-to-b from-brownie via-turqoise-light to-brownie pt-10 pb-23">
        {/* Background */}
        <Image src="/scan/slide-bg.png" alt="" fill className="pointer-events-none object-fill" />

        {/* Scanner */}
        <div className="relative mt-10 z-10 mx-4 overflow-hidden rounded-2xl bg-white p-3 shadow-lg">
          <Scanner onSuccess={handleScan} />
        </div>

        <p className="relative z-10 px-4 pt-5 text-center font-fc-quantum text-lg text-midnight">
          ส่อง QR เพื่อเช็คอินชมรม
        </p>
      </div>

      {/* Error Popup */}
      {errorMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-[320px] rounded-2xl bg-cream px-8 py-8 text-center border-2 border-brick-orange">
            <h2 className="mb-4 text-2xl font-bold font-fc-quantum text-brownie">สแกนไม่สำเร็จ</h2>

            <p className="mb-8 text-brick-orange font-fc-quantum">{errorMsg}</p>

            <button
              onClick={() => router.push("/scan")}
              className="w-full rounded-full bg-midnight py-3 font-fc-quantum text-turqoise border-2 border-turqoise"
            >
              กลับหน้าหลัก
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
