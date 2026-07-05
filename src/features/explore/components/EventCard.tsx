import { ExploreItem } from "../const/event"
import Image from "next/image"
import { cn } from "@/utils/cn"
import Link from "next/link"
import type { CSSProperties } from "react"

const EventImage = ({
  imageUrl,
  active,
  imagePositionStyle,
}: {
  imageUrl: string
  active?: boolean
  imagePositionStyle: CSSProperties
}) => {
  return (
    <div className="h-47.5 aspect-square relative overflow-hidden">
      <Image
        src={active ? imageUrl.replace(".png", "_active.png") : imageUrl}
        alt=""
        width={250}
        height={250}
        style={imagePositionStyle}
        className="shrink-0 absolute size-62.5 max-w-none"
      />
    </div>
  )
}

const EventText = ({
  title,
  description,
  active,
}: {
  title: string
  description: string
  active?: boolean
}) => {
  return (
    <div className="flex w-48.25 shrink-0 flex-col items-start justify-center gap-2 ml-9 h-47.5">
      {active && (
        <div className="flex items-center gap-2 px-2 py-1 bg-status-yellow rounded-full mb-2">
          <div className="w-1.5 h-1.5 bg-status-yellow-dark rounded-full"></div>
          <div className="text-[12px] text-status-yellow-dark">LIVE</div>
        </div>
      )}
      <h2
        className={cn(
          "whitespace-nowrap text-4xl font-bold leading-none tracking-[0.02em]",
          active && "text-white"
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "w-full text-left text-[16px] font-normal leading-[1.4] whitespace-pre-line",
          active && "text-status-yellow"
        )}
      >
        {description}
      </p>
    </div>
  )
}

export const EventCard = ({
  title,
  description,
  href,
  imageUrl,
  index,
  imageLeft,
  imageTop,
  imageRight,
  imageBottom,
  active,
}: ExploreItem & { index: number }) => {
  const imagePositionStyle: CSSProperties = {
    left: imageLeft,
    top: imageTop,
    right: imageRight,
    bottom: imageBottom,
  }

  return (
    <Link href={href} className="h-47.5 w-full">
      <div className="w-full relative">
        <img
          src={
            active
              ? "/explore/active_line.svg"
              : index % 2 === 0
                ? "/explore/cream_line.svg"
                : "/explore/cream_tanned_line.svg"
          }
          alt=""
          className="w-full absolute -top-1.5 z-10"
        />
      </div>
      <div
        className={cn(
          "w-full flex items-center justify-between bg-cream-tanned text-brick-orange",
          index % 2 === 0 && "bg-cream",
          active && "bg-status-yellow-dark"
        )}
      >
        {index % 2 === 0 ? (
          <>
            <EventImage
              imageUrl={imageUrl}
              active={active}
              imagePositionStyle={imagePositionStyle}
            />
            <EventText title={title} description={description} active={active} />
          </>
        ) : (
          <>
            <EventText title={title} description={description} active={active} />
            <EventImage
              imageUrl={imageUrl}
              active={active}
              imagePositionStyle={imagePositionStyle}
            />
          </>
        )}
      </div>
    </Link>
  )
}
