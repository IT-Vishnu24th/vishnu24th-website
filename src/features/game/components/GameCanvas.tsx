"use client"

import { useCallback, useRef } from "react"

import Trash from "./Trash"
import TrashBin from "./TrashBin"

import type { FallingTrash, BinState } from "../types/game"

type PointerPosition = {
  x: number
  y: number
}

type DragState = {
  id: string

  offsetX: number
  offsetY: number
}

type GameCanvasProps = {
  trash: FallingTrash[]

  bins: BinState[]

  onDragStart?: (id: string) => void

  onDragMove?: (id: string, x: number, y: number) => void

  onDragEnd?: (id: string) => void
}

const WIDTH = 800
const HEIGHT = 600

export default function GameCanvas({
  trash,

  bins,

  onDragStart,

  onDragMove,

  onDragEnd,
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLDivElement | null>(null)

  const dragRef = useRef<DragState | null>(null)

  const getPointerPosition = useCallback((event: React.PointerEvent): PointerPosition => {
    const element = canvasRef.current

    if (!element) {
      return {
        x: 0,
        y: 0,
      }
    }

    const rect = element.getBoundingClientRect()

    const scaleX = WIDTH / rect.width

    const scaleY = HEIGHT / rect.height

    return {
      x: (event.clientX - rect.left) * scaleX,

      y: (event.clientY - rect.top) * scaleY,
    }
  }, [])

  const findTrash = useCallback(
    (x: number, y: number) => {
      return trash
        .slice()
        .reverse()
        .find((item) => {
          return x >= item.x && x <= item.x + item.width && y >= item.y && y <= item.y + item.height
        })
    },
    [trash]
  )

  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      const position = getPointerPosition(event)

      const target = findTrash(position.x, position.y)

      if (!target) {
        return
      }

      event.currentTarget.setPointerCapture(event.pointerId)

      dragRef.current = {
        id: target.id,

        offsetX: position.x - target.x,

        offsetY: position.y - target.y,
      }

      onDragStart?.(target.id)
    },
    [getPointerPosition, findTrash, onDragStart]
  )

  const handlePointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (!dragRef.current) {
        return
      }

      const position = getPointerPosition(event)

      onDragMove?.(
        dragRef.current.id,
        position.x - dragRef.current.offsetX,
        position.y - dragRef.current.offsetY
      )
    },
    [getPointerPosition, onDragMove]
  )

  const handlePointerUp = useCallback(
    (event: React.PointerEvent) => {
      if (!dragRef.current) {
        return
      }

      onDragEnd?.(dragRef.current.id)

      dragRef.current = null
    },
    [onDragEnd]
  )

  return (
    <div
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{
        width: WIDTH,

        height: HEIGHT,

        aspectRatio: `${WIDTH} / ${HEIGHT}`,
      }}
      className="
        relative
        mx-auto
        w-full
        max-w-3xl
        overflow-hidden
        rounded-2xl
        border-4
        border-gray-300
        bg-gradient-to-b
        from-cyan-100
        to-blue-100
        shadow-lg
      "
    >
      {trash.map((item) => (
        <Trash key={item.id} trash={item} />
      ))}

      {bins.map((bin) => (
        <TrashBin key={bin.type} bin={bin} />
      ))}
    </div>
  )
}
