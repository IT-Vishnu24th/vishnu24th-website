"use client"

import { ReactNode, useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { cn } from "@/utils/cn"

type ParallaxMode = "global" | "local"

interface ParallaxLayerProps {
  children: ReactNode
  className?: string
  mode?: ParallaxMode
  speed?: number
}

export function ParallaxLayer({
  children,
  className,
  mode = "global",
  speed = 1,
}: ParallaxLayerProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()

  const y = useTransform(scrollY, (latest) => {
    if (shouldReduceMotion) return 0
    if (mode === "local") {
      const frame = frameRef.current
      if (!frame || typeof window === "undefined") return 0

      const frameTop = frame.getBoundingClientRect().top + latest
      const scrollFromEntry = latest - (frameTop - window.innerHeight)

      return scrollFromEntry * (1 - speed)
    }

    return latest * (1 - speed)
  })

  return (
    <div ref={frameRef} className={cn("pointer-events-none overflow-hidden", className)}>
      <motion.div className="absolute inset-0" style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}
