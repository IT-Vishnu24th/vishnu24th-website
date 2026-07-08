import * as Label from "@radix-ui/react-label"
import * as Switch from "@radix-ui/react-switch"

interface WebsitePhaseToggleRowProps {
  id: string
  label: string
  defaultChecked?: boolean
}

export const WebsitePhaseToggleRow = ({
  id,
  label,
  defaultChecked = false,
}: WebsitePhaseToggleRowProps) => {
  return (
    <Label.Root
      htmlFor={id}
      className="flex min-h-18 items-center justify-between gap-6 px-8 text-base"
    >
      <span>{label}</span>
      <Switch.Root
        id={id}
        defaultChecked={defaultChecked}
        className="relative h-10 w-16 shrink-0 rounded-full bg-black transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        <Switch.Thumb className="block size-8 translate-x-1 rounded-full bg-white transition-transform data-[state=checked]:translate-x-7" />
      </Switch.Root>
    </Label.Root>
  )
}
