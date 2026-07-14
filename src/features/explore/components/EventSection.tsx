"use client"

import { motion } from "motion/react"
import { exploreItems } from "../const/event"
import { EventCard } from "./EventCard"
import { useStages } from "@/hooks/useApi"
import { useMemo } from "react"

export function EventSection() {
  const { data, isLoading } = useStages()
  const isShowLive = useMemo(
    () => (isLoading ? false : (data?.data.some((e) => e.status === "live") ?? false)),
    [data, isLoading]
  )
  return (
    <section aria-label="Explore" className="w-full bg-cream">
      <div className="w-full h-9 bg-cream [@media(min-width:480px)]:h-10 [@media(min-width:570px)]:h-15"></div>
      {exploreItems.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
          }}
        >
          <EventCard
            {...item}
            active={item.title === "อีเวนต์" ? isShowLive : item.active}
            index={index}
          />
        </motion.div>
      ))}
    </section>
  )
}
