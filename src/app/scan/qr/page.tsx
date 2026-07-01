"use client"

import { Header } from "@/components/Headers"
import { useRouter } from "next/navigation"
import Scanner from "@/features/scan/components/Scanner"

export default function ScanPage() {
  const router = useRouter()

  function handleScan(value: string) {
    console.log("QR:", value)
    router.replace("/scan/reward")

    // ขั้นต่อไปจะยิง API ตรงนี้
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
    </div>
  )
}
