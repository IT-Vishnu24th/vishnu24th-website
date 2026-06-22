import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const AnnouncementSection = () => {
  return (
    <section className="flex w-full flex-col items-center">
      <header className="relative flex h-[clamp(4.75rem,19.5vw,6.375rem)] w-full items-start justify-center px-[8%] pt-[clamp(0.5rem,2.5vw,0.875rem)]">
        <Link
          href="/"
          aria-label="กลับหน้าหลัก"
          className="absolute left-[8%] top-[clamp(2rem,8vw,2.625rem)] grid size-10 -translate-y-1/2 place-items-center rounded-full transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          <ArrowLeft
            aria-hidden="true"
            className="size-[clamp(1.5rem,6vw,2rem)]"
            strokeWidth={1.8}
          />
        </Link>

        <h1 className="text-4xl leading-none">ยานอารีน่า</h1>
      </header>

      <div
        role="img"
        aria-label="พื้นที่รูปภาพประกาศ"
        className="aspect-5/8 w-[67.2%] max-w-88"
        style={{
          backgroundColor: "#f8f8f8",
          backgroundImage: "conic-gradient(#e9e9e9 25%, #f8f8f8 0 50%, #e9e9e9 0 75%, #f8f8f8 0)",
          backgroundSize: "20% 12.5%",
        }}
      />
    </section>
  )
}
