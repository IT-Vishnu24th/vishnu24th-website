"use client"

import { useEffect } from "react"
import { notFound, useParams, useRouter } from "next/navigation"
import { getMissionQuestionById } from "@/features/game-mission/constants/questions"
import { MissionQuestionScreen } from "@/features/game-mission/components/MissionQuestionScreen"
import { useServerTime } from "@/utils/useServerTime"
import { usePhase } from "@/hooks/useApi"

export default function GameMissionPage() {
  const params = useParams<{ missionId: string }>()
  const router = useRouter()
  const { data: serverTime, isPending, isError } = useServerTime()
  const { data: phaseData, isPending: isPhasePending } = usePhase()

  const question = getMissionQuestionById(params.missionId)
  // phase.current is "mission-N" - same q1..q7 numbering as the question id
  const currentPhaseNumber = Number(phaseData?.data?.vishnuMission?.current?.at(-1) ?? "0")
  const questionNumber = question ? Number(question.id.replace("q", "")) : 0
  const isLocked = questionNumber > currentPhaseNumber

  useEffect(() => {
    if (!isPhasePending && isLocked) router.replace("/game")
  }, [isPhasePending, isLocked, router])

  if (isPending || isPhasePending) {
    return <></>
  }

  if (!question || isError) {
    notFound()
  }

  if (isLocked) {
    return <></>
  }

  return <MissionQuestionScreen question={question} serverTime={serverTime} />
}
