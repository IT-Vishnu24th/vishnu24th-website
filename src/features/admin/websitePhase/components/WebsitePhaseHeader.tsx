import * as Accordion from "@radix-ui/react-accordion"
import { ChevronDown, ChevronUp } from "lucide-react"

interface WebsitePhaseHeaderProps {
  title: string
}

export const WebsitePhaseHeader = ({ title }: WebsitePhaseHeaderProps) => {
  return (
    <Accordion.Header>
      <Accordion.Trigger className="group w-full">
        <div className="select-none rounded-xl transition-all border border-brownie-light group-data-[state=open]:rounded-b-none! flex h-14 w-full items-center justify-between bg-brownie px-7">
          <span className="text-[32px] pb-2.5 text-cream font-sov-yeehor leading-none">
            {title}
          </span>
          <img
            aria-hidden="true"
            className="size-7 shrink-0  group-data-[state=open]:rotate-0 rotate-180 duration-300"
            src="/admin/up_arrow.svg"
          />
        </div>
      </Accordion.Trigger>
    </Accordion.Header>
  )
}
