"use client"

import { useCallback, useMemo, useState } from "react"

import { GAME_DURATION } from "../data/trash"

import { saveGameResult } from "../utils/storage"

import { removeOffscreenTrash, updateTrashPositions } from "../utils/physics"

import useAnimation from "./useAnimation"
import useSpawner from "./useSpawner"
import useTimer from "./useTimer"

import type { BinState, FallingTrash, GameStatus } from "../types/game"

const GAME_WIDTH = 800
const GAME_HEIGHT = 600

const BIN_WIDTH = 120
const BIN_HEIGHT = 90

const INITIAL_BINS: BinState[] = [
  {
    type: "recycle",
    label: "♻️ Recycle",
    x: 120,
    y: GAME_HEIGHT - 120,
    width: BIN_WIDTH,
    height: BIN_HEIGHT,
  },

  {
    type: "general",
    label: "🗑️ General",
    x: 340,
    y: GAME_HEIGHT - 120,
    width: BIN_WIDTH,
    height: BIN_HEIGHT,
  },

  {
    type: "food",
    label: "🍎 Food",
    x: 560,
    y: GAME_HEIGHT - 120,
    width: BIN_WIDTH,
    height: BIN_HEIGHT,
  },
]

function checkCollision(
  trash: {
    x: number
    y: number
    width: number
    height: number
  },

  bin: {
    x: number
    y: number
    width: number
    height: number
  }
) {
  return (
    trash.x < bin.x + bin.width &&
    trash.x + trash.width > bin.x &&
    trash.y < bin.y + bin.height &&
    trash.y + trash.height > bin.y
  )
}

export function useGame() {
  const [status, setStatus] = useState<GameStatus>("idle")

  const [trash, setTrash] = useState<FallingTrash[]>([])

  const [score, setScore] = useState(0)

  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  const [bins] = useState<BinState[]>(INITIAL_BINS)

  const addTrash = useCallback((item: FallingTrash) => {
    setTrash((current) => [...current, item])
  }, [])

  const { updateSpawner, resetSpawner } = useSpawner({
    gameWidth: GAME_WIDTH,

    onSpawn: addTrash,
  })

  const finishGame = useCallback(() => {
    setStatus("finished")

    saveGameResult({
      score,

      date: new Date().toISOString(),
    })
  }, [score])

  const {
    timeLeft,

    start: startTimer,

    stop: stopTimer,

    reset: resetTimer,
  } = useTimer({
    duration: GAME_DURATION,

    onComplete: finishGame,
  })

  const gameLoop = useCallback(
    (dt: number) => {
      setElapsedSeconds((value) => value + dt)

      updateSpawner(dt)

      setTrash((current) => {
        const updated = updateTrashPositions(
          current.filter((item) => !item.isDragging),

          dt,

          elapsedSeconds
        )

        const dragging = current.filter((item) => item.isDragging)

        return removeOffscreenTrash(
          [...updated, ...dragging],

          GAME_HEIGHT
        )
      })
    },
    [updateSpawner, elapsedSeconds]
  )

  useAnimation(gameLoop, status === "playing")
  const resetGame = useCallback(() => {
    setTrash([])

    setScore(0)

    setElapsedSeconds(0)

    resetSpawner()

    resetTimer()

    setStatus("idle")
  }, [resetSpawner, resetTimer])

  const startGame = useCallback(() => {
    resetGame()

    setStatus("playing")

    startTimer()
  }, [resetGame, startTimer])

  const handleDragStart = useCallback((id: string) => {
    setTrash((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,

              isDragging: true,
            }
          : item
      )
    )
  }, [])

  const handleDragMove = useCallback((id: string, x: number, y: number) => {
    setTrash((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,

              x,

              y,
            }
          : item
      )
    )
  }, [])

  const handleDragEnd = useCallback(
    (id: string) => {
      const droppedTrash = trash.find((item) => item.id === id)

      if (!droppedTrash) return

      let isCorrect = false

      for (const bin of bins) {
        if (checkCollision(droppedTrash, bin) && droppedTrash.type === bin.type) {
          isCorrect = true

          break
        }
      }

      setTrash((current) =>
        current
          .map((item) =>
            item.id === id
              ? {
                  ...item,

                  isDragging: false,
                }
              : item
          )
          .filter((item) => item.id !== id || !isCorrect)
      )

      if (isCorrect) {
        setScore((current) => current + 1)
      }
    },
    [trash, bins]
  )

  return useMemo(
    () => ({
      trash,

      bins,

      score,

      timeLeft,

      status,

      startGame,

      finishGame,

      resetGame,

      handleDragStart,

      handleDragMove,

      handleDragEnd,
    }),
    [
      trash,
      bins,
      score,
      timeLeft,
      status,
      startGame,
      finishGame,
      resetGame,
      handleDragStart,
      handleDragMove,
      handleDragEnd,
    ]
  )
}
