"use client"

import { useFeatureFlags, useMe } from "@/hooks/useApi"
import { Ship } from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"

export const YarnAnnouncementButton = () => {
  const { data: featureFlagsData } = useFeatureFlags()
  const { data: userData } = useMe()

  const showYarn = useMemo(() => {
    const showVessel = featureFlagsData?.data.filter((e) => e.id === "reveal-vessel")
    if (!showVessel || showVessel?.length === 0) return false
    return showVessel[0].enabled ?? false
  }, [featureFlagsData?.data])

  const yarnAccepted = userData?.data?.yarnAccepted ?? false

  if (!showYarn) return null
  return (
    <Link
      href="/yaan"
      className="flex min-h-11 items-center font-fc-quantum gap-1.5 rounded-full bg-[#2D3542] border-[#2D3542] border-2 px-3 py-2.5 text-turqoise text-sm md:text-base hover:bg-[#0F2A3D] transition-colors"
    >
      <Ship size={18} strokeWidth={3} />
      <div className="mb-1">
        {!showYarn
          ? "....."
          : !yarnAccepted
            ? "เข้าการคัดสรร"
            : userData?.data.group.vesselName?.th}
      </div>
    </Link>
  )
}
