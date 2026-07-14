"use client"

import useAuth from "@/hooks/useAuth"
import { QuestionaireSeciton } from "./QuestionaireSection"
import { YarnSection } from "./YarnSection"
import { useMemo, useState } from "react"

export const AnnouncementSection = () => {
  const { user } = useAuth()
  const [yarnAccepted, setYarnAccepted] = useState(user?.yarnAccepted || false)
  return (
    <>
      {yarnAccepted ? <YarnSection /> : <QuestionaireSeciton setYarnAccepted={setYarnAccepted} />}
    </>
  )
}
