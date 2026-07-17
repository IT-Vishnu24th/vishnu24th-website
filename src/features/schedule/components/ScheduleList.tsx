"use client"

import { useStages } from "@/hooks/useApi"
import { ScheduleCard } from "./ScheduleCard"
import { ScheduleTime } from "./ScheduleTime"
import Link from "next/link"
import { motion } from "motion/react"
import { scheduleSlotImages } from "../const/schedule"

export const ScheduleList = () => {
  const { data } = useStages()
  const schedule = data?.data
  return (
    <div className=" w-full grow bg-midnight py-17 pt-20">
      <div className="pt-4">
        {schedule?.map((e, index) => (
          <Link href="/explore/club" key={e.id} className="flex px-4">
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <ScheduleTime status={e.status} date={e.start} />
            </motion.div>

            <motion.div
              className="ml-6 min-w-0 flex-1 py-1"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1 + 0.05,
                ease: "easeOut",
              }}
            >
              <ScheduleCard stage={e} images={scheduleSlotImages[index] ?? []} />
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}
