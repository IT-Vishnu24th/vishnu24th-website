"use client"

import { useState } from "react"
import { Header } from "@/components/Headers"
import { useRouter } from "next/navigation"
import Scanner from "@/features/scan/components/Scanner"
import { AppErrorCode } from "@/types/appErrorCode"

const ERROR_MESSAGES: Record<string, string> = {
  [AppErrorCode.CLUB_NOT_FOUND]: "ไม่พบชมรมนี้ ลองสแกนใหม่อีกครั้ง",
  [AppErrorCode.GROUP_NOT_FOUND]: "ไม่พบกลุ่มของคุณ",
  [AppErrorCode.ALREADY_SCANNED]: "คุณเช็คอินชมรมนี้ไปแล้ว",
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
        const code = json?.error?.code
        setErrorMsg(ERROR_MESSAGES[code] ?? "สแกนไม่สำเร็จ ลองใหม่อีกครั้ง")
        setIsScanning(false)
        return
      }

      // เก็บ response ทั้งก้อนไว้ให้หน้า reward อ่านต่อ
      sessionStorage.setItem("scanResult", JSON.stringify(json.data))
      router.replace("/scan/reward")
    } catch (err) {
      console.error("Scan request failed:", err)
      setErrorMsg("เกิดข้อผิดพลาด ลองใหม่อีกครั้ง")
      setIsScanning(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />

      {/* Top */}
      <div className="flex items-center px-4 pt-4">
        <button onClick={() => router.push("/scan")} className="text-2xl">
          ←
        </button>

        <h1
          className="
            flex-1
            pr-8
            text-center
            text-3xl
            font-serif
            font-bold
          "
        >
          Scan QR
        </h1>
      </div>

      {/* Camera */}
      <div
        className="
          mx-4
          mt-6
          overflow-hidden
          rounded-2xl
          bg-white
          p-3
        "
      >
        <Scanner onSuccess={handleScan} />
      </div>

      <p
        className="
          px-4
          pt-4
          text-center
          text-gray-500
        "
      >
        ส่อง QR เพื่อเช็คอินชมรม
      </p>

      {/* Error Popup */}
      {errorMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-[320px] rounded-2xl bg-white px-8 py-8 text-center">
            <h2 className="mb-4 text-2xl font-bold">สแกนไม่สำเร็จ</h2>

            <p className="mb-8 text-gray-600">{errorMsg}</p>

            <button
              onClick={() => router.push("/scan")}
              className="w-full rounded-full bg-black py-3 text-white"
            >
              กลับหน้าหลัก
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
