"use client"

import { useCallback, useRef } from "react"

import { FallingTrash } from "../types/game"
import { getRandomTrash, randomSpawnX } from "../utils/random"
import { createFallingTrash } from "../utils/physics"
import { SPAWN_INTERVAL } from "../data/trash"

interface UseSpawnerOptions {
  gameWidth: number
  onSpawn: (trash: FallingTrash) => void
}

export default function useSpawner({ gameWidth, onSpawn }: UseSpawnerOptions) {
  const elapsedRef = useRef(0)

  const updateSpawner = useCallback(
    (dt: number) => {
      elapsedRef.current += dt * 1000

      if (elapsedRef.current < SPAWN_INTERVAL) {
        return
      }

      elapsedRef.current = 0

      const template = getRandomTrash()

      const trash = createFallingTrash(crypto.randomUUID(), template, randomSpawnX(gameWidth))

      onSpawn(trash)
    },
    [gameWidth, onSpawn]
  )

  const resetSpawner = useCallback(() => {
    elapsedRef.current = 0
  }, [])

  return {
    updateSpawner,
    resetSpawner,
  }
}
