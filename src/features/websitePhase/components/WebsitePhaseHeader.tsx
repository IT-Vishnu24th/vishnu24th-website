import * as Accordion from "@radix-ui/react-accordion"
import { ChevronDown, ChevronUp } from "lucide-react"

interface WebsitePhaseHeaderProps {
  title: string
}

export const WebsitePhaseHeader = ({ title }: WebsitePhaseHeaderProps) => {
  return (
    <Accordion.Header>
      <Accordion.Trigger className="group flex min-h-15 w-full items-center justify-between bg-black px-7 text-left text-white transition-colors hover:bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
        <span className="text-3xl leading-none">{title}</span>
        <ChevronUp
          aria-hidden="true"
          className="hidden size-7 shrink-0 group-data-[state=open]:block"
          strokeWidth={2.5}
        />
        <ChevronDown
          aria-hidden="true"
          className="size-7 shrink-0 group-data-[state=open]:hidden"
          strokeWidth={2.5}
        />
      </Accordion.Trigger>
    </Accordion.Header>
  )
}
