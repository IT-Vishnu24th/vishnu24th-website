import { LineLogo } from "@/components/icon/LineIcon"

export const LineSection = () => {
  return (
    <section className="relative mt-10 min-h-50 w-full shrink-0 overflow-hidden">
      <div className="absolute left-1/2 top-0 flex aspect-square w-[150%] pt-16 -translate-x-1/2 flex-col items-center rounded-[50%] bg-neutral-300">
        <LineLogo />
        <p className="mt-1.5 font-serif text-[clamp(1.25rem,4.8vw,1.625rem)] leading-none">
          เข้ากลุ่มไลน์
        </p>
      </div>
    </section>
  )
}
