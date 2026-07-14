import { useUpdateMe } from "@/hooks/useApi"
import { cn } from "@/utils/cn"
import { Key } from "lucide-react"

export const YaanAcceptButton = ({
  text,
  onClick,
  className,
}: {
  text: string
  onClick: () => void
  className?: string
}) => {
  return (
    <button
      className={cn(
        "flex gap-3 bg-midnight py-2 duration-300 cursor-pointer border-2 border-midnight-light hover:border-turqoise px-2.5 rounded-full items-center text-turqoise",
        className
      )}
      onClick={onClick}
    >
      <Key className="size-4" />
      <div className="font-fc-quantum mb-1">{text}</div>
    </button>
  )
}
