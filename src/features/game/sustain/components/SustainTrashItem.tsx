import type { SustainFallingTrash } from "../types/sustain"

const trashColor = {
  general: "border-[#3f3f3f] bg-[#f7f7f7] text-[#3f3f3f]",
  recycle: "border-[#2f7d7a] bg-[#dff5f1] text-[#205c59]",
  food: "border-[#85703e] bg-[#fff1c8] text-[#6d5728]",
}

type SustainTrashItemProps = {
  trash: SustainFallingTrash
}

export function SustainTrashItem({ trash }: SustainTrashItemProps) {
  return (
    <div
      className={`absolute flex touch-none select-none flex-col items-center justify-center rounded-lg border-2 text-center shadow-sm ${trashColor[trash.type]} ${
        trash.isDragging ? "z-30 scale-105 shadow-md" : "z-20"
      }`}
      style={{
        left: `${(trash.x / 360) * 100}%`,
        top: `${(trash.y / 600) * 100}%`,
        width: `${(trash.size / 360) * 100}%`,
        height: `${(trash.size / 600) * 100}%`,
      }}
    >
      <span className="text-lg leading-none">{trash.icon}</span>
      <span className="mt-1 max-w-full px-1 text-[9px] font-bold leading-3">{trash.label}</span>
    </div>
  )
}
