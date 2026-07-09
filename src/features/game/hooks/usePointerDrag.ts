import { useRef } from "react"

type DragPosition = {
  x: number
  y: number
}

type PointerDragOptions = {
  canvasRef?: React.RefObject<HTMLElement | null>

  onDragStart?: (id: string) => void

  onDragMove?: (id: string, position: DragPosition) => void

  onDragEnd?: (id: string, position: DragPosition) => void
}

export function usePointerDrag({
  canvasRef,
  onDragStart,
  onDragMove,
  onDragEnd,
}: PointerDragOptions = {}) {
  const draggingId = useRef<string | null>(null)

  const offset = useRef<DragPosition>({
    x: 0,
    y: 0,
  })

  function getCanvasPosition(event: React.PointerEvent) {
    const canvas = canvasRef?.current

    if (!canvas) {
      return {
        x: event.clientX,
        y: event.clientY,
      }
    }

    const rect = canvas.getBoundingClientRect()

    return {
      x: event.clientX - rect.left,

      y: event.clientY - rect.top,
    }
  }

  const startDrag = (event: React.PointerEvent, id: string, element: HTMLElement) => {
    event.preventDefault()

    const pointer = getCanvasPosition(event)

    const rect = element.getBoundingClientRect()

    draggingId.current = id

    offset.current = {
      x: pointer.x - rect.left,

      y: pointer.y - rect.top,
    }

    element.setPointerCapture(event.pointerId)

    onDragStart?.(id)
  }

  const moveDrag = (event: React.PointerEvent) => {
    const id = draggingId.current

    if (!id) return

    event.preventDefault()

    const pointer = getCanvasPosition(event)

    onDragMove?.(id, {
      x: pointer.x - offset.current.x,

      y: pointer.y - offset.current.y,
    })
  }

  const endDrag = (event: React.PointerEvent) => {
    const id = draggingId.current

    if (!id) return

    event.preventDefault()

    const pointer = getCanvasPosition(event)

    onDragEnd?.(id, {
      x: pointer.x - offset.current.x,

      y: pointer.y - offset.current.y,
    })

    draggingId.current = null
  }

  return {
    startDrag,

    moveDrag,

    endDrag,
  }
}
