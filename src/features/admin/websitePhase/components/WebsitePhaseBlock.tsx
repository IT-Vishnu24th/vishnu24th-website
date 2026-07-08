"use client"

import * as Accordion from "@radix-ui/react-accordion"
import { WebsitePhaseHeader } from "./WebsitePhaseHeader"
import { WebsitePhaseToggleRow } from "./WebsitePhaseToggleRow"

interface WebsitePhaseToggle {
  id: string
  label: string
  defaultChecked?: boolean
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
      className="w-full"
    >
      <Accordion.Item value={value}>
        <WebsitePhaseHeader title={title} />

        <Accordion.Content className="overflow-hidden">
          <div className="py-1">
            {toggles.map((toggle) => (
              <WebsitePhaseToggleRow
                key={toggle.id}
                id={toggle.id}
                label={toggle.label}
                defaultChecked={toggle.defaultChecked}
              />
            ))}
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}
