"use client"
import { useFeatureFlags } from "@/hooks/useApi"
import type { User } from "@/types/user"
import { useMemo } from "react"

type YarnSectionProps = {
  user?: User
}

export const YarnSection = ({ user }: YarnSectionProps) => {
  const { data: featureFlagsData } = useFeatureFlags()

  const showYarn = useMemo(() => {
    const showVessel = featureFlagsData?.data.filter((e) => e.id === "reveal-vessel")
    if (!showVessel || showVessel?.length === 0) return false
    return showVessel[0].enabled ?? false
  }, [featureFlagsData?.data])

  const yarnAccepted = user?.yarnAccepted ?? false

  if (!user || !showYarn || !yarnAccepted) return null
  return (
    <section className="mt-12 w-full text-center text-mint">
      <h2 className="mt-2.75 font-sov-yeehor tracking-[0.96px] text-[48px] leading-none">
        {user.group.vesselName?.th}
      </h2>
    </section>
  )
}
