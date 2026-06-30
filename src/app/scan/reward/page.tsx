"use client"

import { Header } from "@/components/Headers"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RewardPage() {
  const router = useRouter()

  const [opened, setOpened] = useState(false)

  const [score] = useState(169)

  function openBox() {
    if (opened) return

    setOpened(true)
  }

  return (
    <div className="min-h-screen bg-[#efefef]">
      <Header />

      {/* Top */}
      <div className="relative px-4 pt-4">
        <button onClick={() => router.push("/scan")} className="absolute left-4 text-xl">
          ←
        </button>

        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold">เช็คอินถาว..</h1>

          <p className="mt-2 text-3xl">IMC</p>
        </div>
      </div>

      {/* Logo */}
      <div className="flex justify-center pt-6">
        <div
          className="
            h-32
            w-32
            rounded-full
            bg-[#d3d3d3]
          "
        />
      </div>

      {/* Text */}
      <div className="pt-12 text-center">
        <p className="text-xl">เปิดหีบสมบัติเพื่อลุ้นคะแนน</p>

        <p className="text-lg">(1 ชมรม / 1 ครั้ง)</p>
      </div>

      {/* Box */}
      <div className="flex justify-center pt-6">
        <button
          onClick={openBox}
          disabled={opened}
          className="
            h-[180px]
            w-[180px]
            rounded
            bg-[#d3d3d3]
            text-5xl
            active:scale-95
            transition
          "
        >
          {opened ? "🎁" : "หีบ"}
        </button>
      </div>

      <p
        className="
          pt-10
          text-center
          text-gray-400
        "
      >
        แตะที่หีบเพื่อเปิด
      </p>

      {/* Popup */}
      {opened && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
          "
        >
          <div
            className="
              w-[320px]
              rounded-3xl
              bg-white
              p-8
              text-center
            "
          >
            <h2
              className="
                text-2xl
                font-bold
              "
            >
              ได้รับคะแนน
            </h2>

            <div
              className="
                py-6
                text-7xl
                font-bold
              "
            >
              +{score}
            </div>

            <button
              onClick={() => router.replace("/scan")}
              className="
                w-full
                rounded-xl
                bg-black
                py-3
                text-white
              "
            >
              กลับหน้าคะแนน
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
