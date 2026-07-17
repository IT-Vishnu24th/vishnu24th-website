"use client"

import { useFeatureFlags, useMyMissions, usePhase } from "@/hooks/useApi"
import MissionCard, { MissionCardProps, MissionStatus } from "./MissionCard"
import { useMemo } from "react"
import { RegistrationPhase, VishnuMissionPhase } from "@/types/phase"

const defaultMissions: (MissionCardProps & { id?: string; openTime?: string })[] = [
  {
    title: "เสี่ยงโชคปล้นจักรวาล",
    id: "game-clubscan",
    reward: 50000,
    img: "/game/treasure_banner.png",
    status: "locked" as MissionStatus,
    openTime: "2026-07-18T16:10:00+07:00",
    deadline: "2026-07-18T21:00:00+07:00",
    href: "/scan",
  },
  {
    title: "ปริศนาฟ้าลิขิต",
    id: "game-mission",
    reward: 50000,
    banner: "",
    status: "locked" as MissionStatus,
    openTime: "2026-07-21T16:08:00+07:00",
    deadline: "2026-07-24T16:12:00+07:00",
    href: "/",
  },
  {
    title: "Pop Kaew",
    id: "game-popkaew",
    reward: 50000,
    img: "/game/popkaew_banner.png",
    status: "locked" as MissionStatus,
    openTime: "2026-07-21T16:18:00+07:00",
    deadline: "2026-07-22T16:08:00+07:00",
    href: "/game/popkaew",
  },
  {
    title: "ความจริงน่ะมีเพียง\nหนึ่งเดียวเท่านั้น",
    id: "game-sustain",
    reward: 50000,
    img: "/game/trash_banner.png",
    status: "locked" as MissionStatus,
    openTime: "2026-07-21T16:11:50+07:00",
    deadline: "2026-07-24T16:13:30+07:00",
    href: "/game/sustain",
  },
]

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
        {[2, 4, 6, 8].map((num) => (
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
    </div>
  )
}

export const MissionCardContainer = () => {
  const { data: featureFlagsData } = useFeatureFlags()
  const { data: phaseData } = usePhase()
  const { data: missionData } = useMyMissions()

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

  const missions = useMemo(() => {
    const now = new Date()

    return defaultMissions.map((mission) => {
      const flag = featureFlagsData?.data.find((f) => f.id === mission.id)

      const openTime = mission.openTime ? new Date(mission.openTime) : null
      const deadline = mission.deadline ? new Date(mission.deadline) : null

      let status: MissionStatus = "locked"

      if (flag?.enabled) {
        status = "active"
      } else if (openTime && now < openTime) {
        status = "upcoming"
      } else if (deadline && now > deadline) {
        status = "completed"
      } else if (mission.id === "game-mission") {
        if (day === 0) {
          status = "locked"
        } else if (latestAnswerId === day.toString()) {
          status = "completed"
        } else status = "active"
      }

      return {
        ...mission,
        status,
      }
    })
  }, [featureFlagsData?.data, missionData?.data, latestAnswerId, day])
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
