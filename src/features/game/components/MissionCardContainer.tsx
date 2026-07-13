"use client"

import { useFeatureFlags } from "@/hooks/useApi"
import MissionCard, { MissionCardProps, MissionStatus } from "./MissionCard"
import { useMemo } from "react"

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
    reward: 50000,
    banner: "",
    status: "locked" as MissionStatus,
    deadline: "",
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

export const MissionCardContainer = () => {
  const { data: featureFlags } = useFeatureFlags()

  const missions = useMemo(() => {
    const now = new Date()

    return defaultMissions.map((mission) => {
      const flag = featureFlags?.data.find((f) => f.id === mission.id)

      const openTime = mission.openTime ? new Date(mission.openTime) : null
      const deadline = mission.deadline ? new Date(mission.deadline) : null

      let status: MissionStatus = "locked"

      if (flag?.enabled) {
        status = "active"
      } else if (openTime && now < openTime) {
        status = "upcoming"
      } else if (deadline && now > deadline) {
        status = "completed"
      }

      return {
        ...mission,
        status,
      }
    })
  }, [featureFlags])
  return (
    <section className="w-full bg-[linear-gradient(0deg,#2D3542_5.3%,#F0865C_96.95%)] pb-6 pt-20">
      <div className="w-full grid grid-cols-1 place-items-center pb-15 [@media(min-width:748px)]:grid-cols-2">
        {missions.map((mission) => (
          <MissionCard key={mission.title} {...mission} />
        ))}
      </div>
    </section>
  )
}
