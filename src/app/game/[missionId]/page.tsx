"use client"

import { notFound, useParams } from "next/navigation"
import { getMissionQuestionById } from "@/features/game-mission/constants/questions"
import { MissionQuestionScreen } from "@/features/game-mission/components/MissionQuestionScreen"
import { getMissionStatus } from "@/features/game-mission/utils/schedule"

export default function GameMissionPage() {
  const params = useParams<{ missionId: string }>()
  const question = getMissionQuestionById(params.missionId)

  if (!question || getMissionStatus(question) === "locked") {
    notFound()
  }

  return <MissionQuestionScreen question={question} />
}
