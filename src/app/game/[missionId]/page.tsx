"use client"

import { notFound, useParams } from "next/navigation"
import { getMissionQuestionById } from "@/features/game-mission/constants/questions"
import { MissionQuestionScreen } from "@/features/game-mission/components/MissionQuestionScreen"

export default function GameMissionPage() {
  const params = useParams<{ missionId: string }>()
  const question = getMissionQuestionById(params.missionId)

  if (!question) {
    notFound()
  }

  return <MissionQuestionScreen question={question} />
}
