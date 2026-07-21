"use client"

import {
  useFeatureFlags,
  useMissionsState,
  useMyMissions,
  usePhase,
  usePopkaewState,
  useSustainState,
} from "@/hooks/useApi"
import MissionCard, { MissionCardProps, MissionStatus } from "./MissionCard"
import { useMemo } from "react"
import { useServerTime } from "@/utils/useServerTime"
import { GameState } from "../types/game"

const QuestionBanner = ({ day }: { day: number }) => {
  return (
    <div className="p-5">
      <div className="flex">
        {[1, 3, 5, 7].map((num) => (
          <div key={num}>
            <div className="flex items-center flex-col w-[60.75px]">
              <img src="/game/sun.png" />
              <img
                src={
                  day === num
                    ? "/game/unanswered_card.png"
                    : day < num
                      ? "/game/future_card.png"
                      : "/game/done_card.png"
                }
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex">
        {[2, 4, 6].map((num) => (
          <div key={num}>
            <div className="flex items-center flex-col w-[60.75px]">
              <img src="/game/moon.png" />
              <img
                src={
                  day === num
                    ? "/game/unanswered_card.png"
                    : day < num
                      ? "/game/future_card.png"
                      : "/game/done_card.png"
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const MissionCardContainer = () => {
  const { data: featureFlagsData } = useFeatureFlags()
  const { data: phaseData } = usePhase()
  const { data: missionData } = useMyMissions()
  const { data: popkaewStateData } = usePopkaewState()
  const { data: sustainStateData } = useSustainState()
  const { data: missionStateData } = useMissionsState()
  const { data: serverTime } = useServerTime()

  // day 0 = missions disabled (phase null/missing) or phase not yet loaded
  const value = Number(phaseData?.data?.vishnuMission?.current?.at(-1) ?? "0")
  const day = Number.isNaN(value) ? 0 : value

  const latestAnswer = useMemo(() => {
    const answers = missionData?.data
    if (!answers?.length) return undefined

    return answers.reduce((latest, current) => {
      const latestId = parseInt(latest.id.replace("q", ""), 10)
      const currentId = parseInt(current.id.replace("q", ""), 10)

      return currentId > latestId ? current : latest
    })
  }, [missionData?.data])

  const latestAnswerId = latestAnswer?.id[1] ?? undefined

  const defaultMissions: (MissionCardProps & {
    id?: string
    openTime?: string
    gameState?: GameState
  } & { now?: Date })[] = useMemo(
    () => [
      {
        title: "เสี่ยงโชคปล้นจักรวาล",
        id: "game-clubscan",
        reward: 20000,
        img: "/game/treasure_banner.png",
        status: "locked",
        openTime: "2026-07-18T16:10:00+07:00",
        deadline: "2026-07-18T21:00:00+07:00",
        href: "/scan",
      },
      {
        title: "ปริศนาฟ้าลิขิต",
        id: "game-mission",
        reward: 290000,
        banner: "",
        status: "locked",
        openTime: "2026-07-21T08:00:00+07:00",
        deadline: "2026-07-24T12:30:00+07:00",
        href: "",
        gameState: missionStateData?.data,
      },
      {
        title: "Pop Kaew",
        id: "game-popkaew",
        reward: 2000,
        img: "/game/popkaew_banner.png",
        status: "locked",
        openTime: "2026-07-21T16:18:00+07:00",
        deadline: "2026-07-22T16:08:00+07:00",
        href: "/game/popkaew",
        gameState: popkaewStateData?.data,
      },
      {
        title: "ความจริงน่ะมีเพียง\nหนึ่งเดียวเท่านั้น",
        id: "game-sustain",
        reward: "100 x ขยะที่แยกถูก",
        img: "/game/trash_banner.png",
        status: "locked",
        openTime: "2026-07-21T16:11:50+07:00",
        deadline: "2026-07-24T16:13:30+07:00",
        href: "/game/sustain",
        gameState: sustainStateData?.data,
      },
    ],
    [popkaewStateData?.data, sustainStateData?.data, missionStateData?.data]
  )

  const missions = useMemo(() => {
    return defaultMissions.map((mission) => {
      const now = serverTime !== undefined ? serverTime : new Date()
      const flag = featureFlagsData?.data.find((f) => f.id === mission.id)

      const openTime = mission.openTime ? new Date(mission.openTime) : null
      const deadline = mission.deadline ? new Date(mission.deadline) : null

      let status: MissionStatus = "locked"

      if (flag?.enabled) {
        status = "active"
      } else if (openTime && now < openTime) {
        status = "upcoming"
      } else if (mission?.gameState === undefined) {
        status = "locked"
      } else if (deadline && now > deadline) {
        status = "completed"
      } else status = "active"
      const href = mission.id === "game-mission" && day ? `/game/q${day}` : mission.href

      return {
        ...mission,
        status,
        href,
      }
    })
  }, [featureFlagsData?.data, missionData?.data, latestAnswerId, day, defaultMissions])

  return (
    <section className="w-full pb-6">
      <div className="w-full grid grid-cols-1 place-items-center pb-15 [@media(min-width:748px)]:grid-cols-2">
        {missions.map((mission) => (
          <MissionCard
            key={mission.title}
            {...mission}
            banner={mission.id === "game-mission" ? <QuestionBanner day={day} /> : undefined}
          />
        ))}
      </div>
    </section>
  )
}
