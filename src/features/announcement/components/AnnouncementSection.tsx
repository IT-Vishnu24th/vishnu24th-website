"use client"

import useAuth from "@/hooks/useAuth"
import { QuestionaireSeciton } from "./QuestionaireSection"
import { YarnSection } from "./YarnSection"
import { useEffect, useMemo, useState } from "react"
import { useFeatureFlags } from "@/hooks/useApi"
import { useRouter } from "next/navigation"

export const AnnouncementSection = () => {
  const { data: featureFlagsData, isLoading } = useFeatureFlags()
  const router = useRouter()
  const { user } = useAuth()
  const [yarnAccepted, setYarnAccepted] = useState(user?.yarnAccepted || false)

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
  }, [user, showYarn, isLoading])

  if (user === null || !showYarn) return null
  return (
    <>
      {yarnAccepted ? <YarnSection /> : <QuestionaireSeciton setYarnAccepted={setYarnAccepted} />}
    </>
  )
}
