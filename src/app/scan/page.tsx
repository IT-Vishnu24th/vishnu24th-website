"use client"

import { Header } from "@/components/Headers"
import { QrCode } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ScorePage() {
  const router = useRouter()

  return (
    <div className="mx-auto min-h-screen bg-[#efefef]">
      <Header />

      {/* Top */}
      <div className="relative px-4 pt-4">
        <button onClick={() => router.push("/")} className="absolute left-4 text-xl">
          ←
        </button>

        <div className="text-center">
          <h1 className="text-4xl font-serif">YAAN ANACONDEE</h1>

          <p className="mt-1 text-xl">ยานอนาคอนด้า</p>
        </div>
      </div>

      {/* Logo */}
      <div
        className="
          flex
          h-[260px]
          items-center
          justify-center
        "
      >
        <div
          className="
            text-5xl
            font-bold
          "
        >
          LOGO
        </div>
      </div>

      {/* Score */}
      <div className="px-4">
        <div
          className="
            flex
            items-center
            gap-4
            rounded-2xl
            bg-[#cfcfcf]
            px-5
            py-5
          "
        >
          <div
            className="
              h-16
              w-16
              rounded-full
              bg-[#a9a9a9]
            "
          />

          <div>
            <p className="text-lg">คะแนนรวมของยาน</p>

            <h2
              className="
                text-5xl
                font-bold
              "
            >
              1,250
            </h2>

            <p>คะแนน</p>
          </div>
        </div>
      </div>

      {/* Scan Button */}
      <div className="px-4 pt-6">
        <button
          onClick={() => router.push("/scan/qr")}
          className="
            flex
            w-full
            items-center
            gap-4
            rounded-2xl
            bg-[#9f9f9f]
            px-6
            py-5
          "
        >
          <QrCode size={38} />

          <div className="text-left">
            <p className="text-xl">สแกน QR Code</p>

            <p>เช็คอินชมรม</p>
          </div>
        </button>
      </div>
    </div>
  )
}
