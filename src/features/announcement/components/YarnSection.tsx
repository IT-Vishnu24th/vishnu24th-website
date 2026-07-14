"use client"

import { LineSection } from "./LineSection"
import { YarnHeroSection } from "./YarnHeroSection"
import { useMe } from "@/hooks/useApi"

export const YarnSection = () => {
  const { data } = useMe()
  return (
    <div className="w-full bg-white min-h-screen">
      <YarnHeroSection yarnName={data?.data.group.vesselName?.th} />
      <div className="w-full pt-20 flex flex-col items-center">
        <div className="text-turqoise font-[20px] font-fc-quantum">ขอให้โชคดีกับการล่าสมบัติ</div>
      </div>
      <LineSection />
    </div>
  )
}
