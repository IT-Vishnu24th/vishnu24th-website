"use client"

import { useEffect, useMemo, useState } from "react"
import { Header2 } from "@/components/Headers"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { club_data } from "@/features/clubs/const/club-data"

export default function RewardPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [opened, setOpened] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const code = searchParams.get("code")
  const scoreParam = searchParams.get("score")
  const score = scoreParam !== null ? Number(scoreParam) : null
  const isValid = !!code && score !== null && !Number.isNaN(score)

  useEffect(() => {
    if (!isValid) {
      router.replace("/scan")
    }
  }, [isValid, router])

  const club = useMemo(() => {
    if (!code) return undefined

    return club_data.find((c) => c.code.toLowerCase() === code.toLowerCase())
  }, [code])

  function openBox() {
    if (opened) return
    setOpened(true)

    setTimeout(() => {
      setShowResult(true)
    }, 2000)
  }

  if (!isValid) return null

  return (
    <div className="mx-auto min-h-screen bg-brownie">
      {/* Header */}
      <section className="w-full bg-[linear-gradient(180deg,#2D3542_0%,#934E43_100%)] text-black">
        <Header2 url="/game" title="เกมส์" />
        <div className="px-4 pb-8 flex w-full flex-col items-center justify-center gap-8 text-center">
          <h1 className="whitespace-nowrap text-[64px] font-sov-yeehor font-normal leading-12.5 letter-spacing-[1.92px] text-cream">
            เช็คอินดาว
          </h1>
          <p className="max-w-75 text-[20px] font-normal font-fc-quantum leading-none text-clay-light">
            {club?.name.th ?? code}
          </p>
        </div>
        <div className="w-full relative h-3 [@media(min-width:480px)]:h-5">
          <img src="/explore/clay_curve.svg" alt="" className="w-full absolute z-20" />
          <img src="/explore/light_clay_curve.svg" alt="" className="w-full absolute z-30" />
        </div>
      </section>

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
                  {score}
                </span>
              </div>

              <p className="mb-8 font-sov-yeehor text-5xl text-brownie">คะแนน</p>

              <button
                onClick={() => router.replace(`/scan?justScored=${score}`)}
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
