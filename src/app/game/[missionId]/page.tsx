"use client"

import { notFound, useParams } from "next/navigation"
import { getMissionQuestionById } from "@/features/game-mission/constants/questions"
import { MissionQuestionScreen } from "@/features/game-mission/components/MissionQuestionScreen"
import { useServerTime } from "@/utils/useServerTime"

export default function GameMissionPage() {
  const params = useParams<{ missionId: string }>()
  const { data: serverTime, isPending, isError } = useServerTime()

  if (isPending) {
    return <></>
  }

  const question = getMissionQuestionById(params.missionId)

  if (!question || isError) {
    notFound()
  }

  return <MissionQuestionScreen question={question} serverTime={serverTime} />
}
