"use client"

import type { CSSProperties } from "react"

import type { FallingTrash } from "../types/game"

type TrashProps = {
  trash: FallingTrash
}

export default function Trash({ trash }: TrashProps) {
  const style: CSSProperties = {
    position: "absolute",

    left: trash.x,

    top: trash.y,

    width: trash.width,

    height: trash.height,

    touchAction: "none",

    userSelect: "none",

    pointerEvents: "none",
  }

  return (
    <div
      style={style}
      className="
        flex
        items-center
        justify-center
        
        text-5xl
      "
    >
      {trash.emoji}
    </div>
  )
}
