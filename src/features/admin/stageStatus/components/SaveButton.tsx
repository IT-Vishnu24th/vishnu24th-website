import { Save } from "lucide-react"
import { cn } from "@/utils/cn"

export const SaveButton = ({ onSave, disabled }: { onSave: () => void; disabled?: boolean }) => {
  return (
    <div
      className={cn(
        "w-full h-fit pt-20 cursor-pointer",
        disabled && "cursor-not-allowed opacity-50"
      )}
      onClick={() => {
        if (!disabled) onSave()
      }}
      aria-disabled={disabled}
    >
      <div className="relative flex h-75 w-full justify-center text-brownie hover:text-brownie-dark overflow-hidden transition-colors">
        <img src="/admin/tanned_globe.png" className="absolute max-w-140" alt="" />
        <div className="absolute duration-300 flex flex-col items-center pt-17">
          <Save className="size-8" />
          <div className="font-fc-quantum text-[32px]">บันทึก</div>
        </div>
      </div>
    </div>
  )
}
