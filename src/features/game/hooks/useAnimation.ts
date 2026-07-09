"use client"

import { useCallback, useEffect, useRef } from "react"

type AnimationCallback = (deltaTime: number) => void

export default function useAnimation(callback: AnimationCallback, isRunning: boolean) {
  const callbackRef = useRef(callback)
  const frameRef = useRef<number | null>(null)
  const previousTimeRef = useRef<number | null>(null)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current === null) {
      previousTimeRef.current = time
    }

    const deltaTime = (time - previousTimeRef.current) / 1000

    previousTimeRef.current = time

    callbackRef.current(deltaTime)

    frameRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if (!isRunning) {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }

      previousTimeRef.current = null
      return
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }

      previousTimeRef.current = null
    }
  }, [animate, isRunning])
}
