import * as Label from "@radix-ui/react-label"
import * as Switch from "@radix-ui/react-switch"

interface WebsitePhaseToggleRowProps {
  id: string
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

export const WebsitePhaseToggleRow = ({
  id,
  label,
  checked,
  onCheckedChange,
}: WebsitePhaseToggleRowProps) => {
  return (
    <Label.Root
      htmlFor={id}
      className="flex py-2 items-center justify-between gap-6 text-brownie-light px-4 text-base"
    >
      <span className="font-fc-quantum text-[18px] leading-[25.2px]">{label}</span>

      <Switch.Root
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="relative h-8 w-13 shrink-0 rounded-full transition-colors px-1 py-0.5 border-2 bg-none data-[state=checked]:opacity-100 opacity-55 border-brick-orange data-[state=checked]:bg-brick-orange"
      >
        <Switch.Thumb className="block size-6 bg-brick-orange rounded-full transition-transform data-[state=checked]:bg-cream data-[state=checked]:translate-x-4.75 -translate-x-px" />
      </Switch.Root>
    </Label.Root>
  )
}
