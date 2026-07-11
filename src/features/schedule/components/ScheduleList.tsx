"use client"

import { useStages } from "@/hooks/useApi"
import { ScheduleCard } from "./ScheduleCard"
import { ScheduleTime } from "./ScheduleTime"
import Link from "next/link"

export const ScheduleList = () => {
  const { data, isLoading } = useStages()
  const schedule = data?.data
  return (
    <div className="min-h-svh w-full grow bg-midnight pt-17">
      <div className="pt-4">
        {schedule?.map((e) => (
          <>
            <Link href={"/club"} key={e.id} className="flex px-4">
              <ScheduleTime status={e.status} date={e.start} />
              <div className="ml-6 min-w-0 flex-1 py-1">
                <ScheduleCard stage={e} />
              </div>
            </Link>
          </>
        ))}
      </div>
    </div>
  )
}
