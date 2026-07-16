"use client"

import { QuestionaireSeciton } from "./QuestionaireSection"
import { YarnSection } from "./YarnSection"
import { useEffect, useMemo, useState } from "react"
import { useFeatureFlags, useMe } from "@/hooks/useApi"
import { useRouter } from "next/navigation"

export const AnnouncementSection = () => {
  const { data: featureFlagsData, isLoading } = useFeatureFlags()
  const { data, isLoading: userLoading } = useMe()

  const user = data?.data
  const router = useRouter()
  const [yarnAccepted, setYarnAccepted] = useState(false)
  const hasYarnAccepted = yarnAccepted || (user?.yarnAccepted ?? false)

  const showYarn = useMemo(() => {
    const showVessel = featureFlagsData?.data.filter((e) => e.id === "reveal-vessel")
    if (!showVessel || showVessel?.length === 0) return false
    return showVessel[0].enabled ?? false
  }, [featureFlagsData?.data])

  useEffect(() => {
    if (isLoading) return
    if (user === null || !showYarn) {
      router.push("/")
    }
  }, [user, showYarn, isLoading, router])

  if (user === null || !showYarn || userLoading) return null
  return (
    <>
      {hasYarnAccepted ? (
        <YarnSection />
      ) : (
        <QuestionaireSeciton setYarnAccepted={setYarnAccepted} />
      )}
    </>
  )
}
