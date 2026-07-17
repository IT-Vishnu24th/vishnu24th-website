"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"
import { usePopkaewLeaderboard } from "@/hooks/useApi"

const REFETCH_MS = 10000

export const PopkaewBottomsheet = () => {
  const { data: leaderboardData, isLoading, refetch } = usePopkaewLeaderboard()
  const [expanded, setExpanded] = useState(false)

  const collapsedY = "calc(90vh - 180px)"

  useEffect(() => {
    const interval = setInterval(refetch, REFETCH_MS)
    return () => {
      clearInterval(interval)
      refetch()
    }
  }, [refetch])

  return (
    <motion.div
      className="fixed left-1/2 -translate-x-1/2 inset-x-0 bottom-0 z-50 h-[90vh] w-full max-w-[820px] rounded-t-3xl bg-cream-tanned shadow-2xl"
      animate={{
        y: expanded ? 50 : collapsedY,
      }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 32,
      }}
      drag="y"
      dragConstraints={{
        top: 0,
        bottom: 0,
      }}
      dragElastic={0.15}
      onDragEnd={(_, info) => {
        if (info.offset.y > 80 || info.velocity.y > 500) {
          setExpanded(false)
        } else if (info.offset.y < -80 || info.velocity.y < -500) {
          setExpanded(true)
        }
      }}
    >
      <div
        className="w-full relative h-3 [@media(min-width:480px)]:h-5 bg-brick-orange"
        onClick={() => setExpanded((v) => !v)}
      >
        <img src="/game-popkaew/brick_curve.svg" alt="" className="w-full absolute z-10 -top-8" />
        <img
          src="/game-popkaew/cream_tanned_curve.svg"
          alt=""
          className="w-full absolute -top-3 z-20"
        />
        <img
          src="/game-popkaew/cream_arrow.svg"
          className={cn(
            "z-30 absolute left-1/2 -translate-x-1/2 duration-300 top-3",
            expanded && "rotate-180"
          )}
        />
      </div>

      <div className="h-full overflow-y-auto px-5 bg-brick-orange">
        {!isLoading && (
          <div className="flex items-center flex-col mt-7 pb-20">
            {leaderboardData?.data.vessels.map(
              (e, index) =>
                (index < 3 || expanded) && (
                  <div
                    key={e.vesselName.en}
                    className={cn(
                      "relative w-full bg-brownie-dark mb-2.5 px-[10px] text-cream rounded-full pb-1 max-w-120",
                      index === 1 && "bg-brownie",
                      index === 2 && "bg-brownie-light",
                      index > 2 && "bg-clay-light text-brownie-dark"
                    )}
                  >
                    <div className="flex items-center text-[20px] w-full justify-between font-fc-quantum">
                      <div className="flex">
                        <div className="mr-5 flex">
                          <p className={cn("text-clay-light", index > 2 && "text-brownie-dark")}>
                            #
                          </p>
                          {e.rank}
                        </div>
                        <div>{e.vesselName.th}</div>
                      </div>
                      <div>{e.popkaewscore}</div>
                    </div>
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
