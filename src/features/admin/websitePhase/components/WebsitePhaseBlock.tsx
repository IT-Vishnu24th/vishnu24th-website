"use client"

import * as Accordion from "@radix-ui/react-accordion"

import { WebsitePhaseHeader } from "./WebsitePhaseHeader"
import { WebsitePhaseToggleRow } from "./WebsitePhaseToggleRow"

interface WebsitePhaseToggle {
  id: string
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

interface WebsitePhaseBlockProps {
  title: string
  toggles?: WebsitePhaseToggle[]
  defaultOpen?: boolean
}

export const WebsitePhaseBlock = ({
  title,
  toggles = [],
  defaultOpen = true,
}: WebsitePhaseBlockProps) => {
  const value = `website-phase-${title}`

  return (
    <Accordion.Root
      type="single"
      collapsible
      defaultValue={defaultOpen ? value : undefined}
      className="w-full max-w-120"
    >
      <Accordion.Item value={value}>
        <WebsitePhaseHeader title={title} />

        <Accordion.Content className="accordion-content">
          <div className="py-1">
            {toggles.map((toggle) => (
              <WebsitePhaseToggleRow key={toggle.id} {...toggle} />
            ))}
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}
