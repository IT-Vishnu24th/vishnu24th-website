"use client"

import useAuth from "@/hooks/useAuth"
import { QuestionaireSeciton } from "./QuestionaireSection"
import { YarnSection } from "./YarnSection"
import { useEffect, useMemo, useState } from "react"
import { useFeatureFlags } from "@/hooks/useApi"
import { useRouter } from "next/navigation"

export const AnnouncementSection = () => {
  const { data: featureFlagsData } = useFeatureFlags()
  const router = useRouter()
  const { user } = useAuth()
  const [yarnAccepted, setYarnAccepted] = useState(user?.yarnAccepted || false)

  const showYarn = useMemo(() => {
    const flagMap = new Map((featureFlagsData?.data ?? []).map((flag) => [flag.id, flag.enabled]))

    return flagMap.get("reveal-vessel") ?? false
  }, [featureFlagsData?.data])

  useEffect(() => {
    if (user === null || !showYarn) {
      router.push("/")
    }
  }, [user, showYarn])

  if (user === null || !showYarn) return null
  return (
    <>
      {yarnAccepted ? <YarnSection /> : <QuestionaireSeciton setYarnAccepted={setYarnAccepted} />}
    </>
  )
}
