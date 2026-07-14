"use client"

import { FormEvent, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, LoaderCircle, MapPin, Search } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import useAuth from "@/hooks/useAuth"
import { LoginButton } from "@/features/auth/components/LoginButton"
import { UserInfoButton } from "@/features/auth/components/UserInfoButton"
import NavigationFooter from "@/components/NavigationFooter"
import SponsorFooter from "@/components/SponsorFooter"
import type { ApiFailure, ApiSuccess } from "@/types/apiResponse"
import type { RegistrationPointResponse } from "@/types/registrationPoint"
import { getRegistrationLocationAssets } from "@/utils/registrationPoint"

const getErrorMessage = (error: ApiFailure | null) => {
  if (!error) return "ไม่สามารถค้นหาข้อมูลได้ กรุณาลองใหม่อีกครั้ง"
  if (error.code === "USER_NOT_FOUND") return "ไม่พบเลขนิสิตนี้ในระบบ"
  if (error.code === "REGISTRATION_POINT_NOT_FOUND") return "ยังไม่พบจุดลงทะเบียนของเลขนิสิตนี้"
  if (error.code === "MISSING_PHASE") return "ยังไม่ได้ตั้งค่า phase สำหรับจุดลงทะเบียน"
  return "ไม่สามารถค้นหาข้อมูลได้ กรุณาลองใหม่อีกครั้ง"
}

const getThaiText = (value: RegistrationPointResponse["vesselName"]) => {
  return value.th || value.en || ""
}

async function fetchRegistrationPoint(targetStudentId?: string) {
  const normalizedStudentId = targetStudentId?.trim()
  const query = normalizedStudentId ? `?studentId=${encodeURIComponent(normalizedStudentId)}` : ""
  const response = await fetch(`/api/registration-point${query}`, {
    cache: "no-store",
    credentials: "include",
  })
  const body = (await response.json()) as ApiSuccess<RegistrationPointResponse> | ApiFailure

  if (!response.ok || !("data" in body)) {
    throw new Error(getErrorMessage(body as ApiFailure))
  }

  return body.data
}

export default function RegistrationPointPage() {
  const { user, loading: authLoading } = useAuth()
  const [studentId, setStudentId] = useState("")
  const [manualResult, setManualResult] = useState<RegistrationPointResponse | null>(null)
  const [manualError, setManualError] = useState<string | null>(null)
  const [manualLoading, setManualLoading] = useState(false)

  const isLoggedIn = Boolean(user)
  const userId = user?.id

  const autoLookup = useQuery({
    queryKey: ["registration-point", "me", userId],
    queryFn: () => fetchRegistrationPoint(),
    enabled: !authLoading && Boolean(userId),
    retry: false,
  })

  const result = manualResult ?? autoLookup.data ?? null
  const loading = manualLoading || autoLookup.isFetching
  const error = manualError ?? (autoLookup.error instanceof Error ? autoLookup.error.message : null)

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalizedStudentId = studentId.trim()

    if (!normalizedStudentId) {
      setManualResult(null)
      setManualError("กรุณากรอกเลขนิสิต")
      return
    }

    setManualLoading(true)
    setManualError(null)
    setManualResult(null)

    try {
      const data = await fetchRegistrationPoint(normalizedStudentId)
      setManualResult(data)
    } catch (error) {
      setManualError(error instanceof Error ? error.message : getErrorMessage(null))
    } finally {
      setManualLoading(false)
    }
  }

  if (result) {
    return <ResultView result={result} loading={loading} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-midnight via-brownie to-brick-orange pb-20 text-cream">
      <TopBar isLoggedIn={isLoggedIn} />

      <section className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-6 text-center">
        <MapPin className="mb-8 size-10 text-cream" strokeWidth={2.4} />

        <h1 className="font-sov-yeehor text-5xl leading-tight text-cream md:text-6xl">
          เข้าสู่ระบบเพื่อดู
          <br />
          จุดลงทะเบียนของน้อง
        </h1>

        <p className="mt-6 max-w-xs font-fc-quantum text-xl leading-7 text-clay-light">
          ตำแหน่งการลงทะเบียนของน้องแต่ละคนอาจไม่เหมือนกัน
        </p>

        <p className="mt-9 font-sov-yeehor text-3xl text-cream">หรือ ค้นหาด้วยเลขนิสิต</p>

        <form onSubmit={handleSearch} className="mt-4 flex w-full max-w-[300px] items-center gap-2">
          <div className="relative h-11 min-w-0 flex-1">
            <Image
              src="/regis/search_field.png"
              alt=""
              fill
              sizes="144px"
              className="pointer-events-none object-fill"
            />
            <input
              value={studentId}
              onChange={(event) => setStudentId(event.target.value.replace(/\D/g, "").slice(0, 10))}
              inputMode="numeric"
              autoComplete="off"
              placeholder="69XXXXXXXX"
              className="relative z-10 h-full w-full bg-transparent px-4 text-center font-fc-quantum text-lg text-brownie outline-none placeholder:text-clay-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
              aria-label="เลขนิสิต"
            />
          </div>
          <button
            type="submit"
            disabled={loading || authLoading}
            className="flex h-12 shrink-0 items-center gap-1 rounded-full border-2 border-cream bg-brick-orange px-4 font-fc-quantum text-lg text-cream transition hover:bg-brownie-light disabled:cursor-wait disabled:opacity-70"
          >
            {loading ? (
              <LoaderCircle className="size-5 animate-spin" />
            ) : (
              <Search className="size-5" />
            )}
            ค้นหา
          </button>
        </form>

        {authLoading && (
          <p className="mt-4 font-fc-quantum text-clay-light">กำลังตรวจสอบสถานะเข้าสู่ระบบ...</p>
        )}
        {loading && !authLoading && (
          <p className="mt-4 font-fc-quantum text-clay-light">กำลังค้นหาจุดลงทะเบียน...</p>
        )}
        {error && <p className="mt-4 max-w-xs font-fc-quantum text-status-yellow">{error}</p>}
      </section>
    </div>
  )
}

function TopBar({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div className="flex items-center justify-between px-4 py-5">
      <Link
        href="/"
        className="flex items-center gap-2 rounded-full border-2 border-midnight-light bg-midnight/50 px-3 py-2 font-fc-quantum text-turqoise transition hover:bg-midnight"
      >
        <ArrowLeft className="size-5" />
        หน้าหลัก
      </Link>

      {isLoggedIn ? <UserInfoButton /> : <LoginButton callbackUrl="/registration-point" />}
    </div>
  )
}

function ResultView({ result, loading }: { result: RegistrationPointResponse; loading: boolean }) {
  const isFirstDate = result.phase === "firstdate"
  const locationAssets = getRegistrationLocationAssets(result)
  const label =
    result.displayLabel ||
    (isFirstDate
      ? `กลุ่มที่ ${result.package}`
      : `ยาน ${getThaiText(result.vesselName) || result.groupLabel}`)
  const heading = isFirstDate ? "จุดลงทะเบียน" : `จุดลงทะเบียนที่ ${result.package}`

  const googleMapsUrl = useMemo(() => {
    const query = locationAssets.googleMapsQuery
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
  }, [locationAssets.googleMapsQuery])

  return (
    <div className="min-h-screen bg-cream-tanned pb-20 text-brownie-dark">
      <div className="bg-gradient-to-b from-midnight to-brownie pb-4 text-center text-cream">
        <TopBar isLoggedIn />

        <h1 className="mt-4 font-sov-yeehor text-5xl leading-tight md:text-6xl">
          {heading}
          <br />
          <span className="font-fc-quantum text-2xl text-clay-light">{label}</span>
        </h1>

        <div className="relative mt-4 h-6 w-full overflow-hidden">
          <Image src="/map/orange-line.png" alt="" fill className="object-fill" />
        </div>
      </div>

      <section className="-mt-1 px-6 py-8 text-center">
        <div className="flex items-center justify-center gap-4">
          <Image
            src="/regis/line_leftright.png"
            alt=""
            width={70}
            height={35}
            className="h-auto w-16"
          />
          <p className="font-sov-yeehor text-5xl text-brownie">{locationAssets.title}</p>
          <Image
            src="/regis/line_leftright.png"
            alt=""
            width={70}
            height={35}
            className="h-auto w-16 scale-x-[-1]"
          />
        </div>

        <div className="mt-5 overflow-hidden border-4 border-brownie bg-cream">
          <Image
            src={locationAssets.mapSrc}
            alt="แผนที่จุดลงทะเบียน"
            width={722}
            height={492}
            className="h-auto w-full"
            priority
          />
        </div>

        {result.registrationLocation.source === "registrationPoint" && locationAssets.realSrc && (
          <div className="mt-5 overflow-hidden border-4 border-brownie bg-cream">
            <Image
              src={locationAssets.realSrc}
              alt="สถานที่ลงทะเบียน"
              width={1108}
              height={1477}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        )}

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full bg-midnight px-4 py-2 font-fc-quantum text-turqoise transition hover:bg-midnight-light"
        >
          <Image
            src="/regis/logo_Googlemaps.png"
            alt=""
            width={20}
            height={24}
            className="h-6 w-5"
          />
          เปิดใน Google Maps
        </a>

        <div className="mt-6 space-y-2 font-fc-quantum text-lg leading-7">
          <p>
            สามารถลงทะเบียนได้ที่ {locationAssets.fullName} เวลา {result.registrationTime} น.
          </p>
          <p>ตำแหน่งการลงทะเบียนของน้องแต่ละคนอาจไม่เหมือนกัน</p>
          {loading && <p className="text-brownie">กำลังอัปเดตข้อมูล...</p>}
        </div>
      </section>

      <SponsorFooter />
      <NavigationFooter />
    </div>
  )
}
