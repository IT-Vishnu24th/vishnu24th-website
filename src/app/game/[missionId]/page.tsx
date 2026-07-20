"use client"

import { notFound, useParams } from "next/navigation"
import { getMissionQuestionById } from "@/features/game-mission/constants/questions"
import { MissionQuestionScreen } from "@/features/game-mission/components/MissionQuestionScreen"
import { getMissionStatus } from "@/features/game-mission/utils/schedule"
import { useServerTime } from "@/utils/useServerTime"

export default function GameMissionPage() {
  const params = useParams<{ missionId: string }>()
  const { data: serverTime, isPending, isError } = useServerTime()

  if (isPending) {
    return <></>
  }

  const question = getMissionQuestionById(params.missionId)

  if (!question || isError || getMissionStatus(question, serverTime) === "locked") {
    notFound()
  }

  return <MissionQuestionScreen question={question} serverTime={serverTime} />
}
