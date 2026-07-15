import { Header2 } from "@/components/Headers"

export const StageStatusHeroSection = () => {
  return (
    <section className="w-full bg-[linear-gradient(180deg,#2D3542_0%,#934E43_100%)] text-black">
      <Header2 url="/admin" title="แอดมิน" />
      <div className="px-4 pb-8 flex w-full flex-col items-center justify-center gap-8 text-center">
        <h1 className="whitespace-nowrap text-[96px] font-sov-yeehor font-normal leading-12.5 letter-spacing-[1.92px] text-cream">
          สถานะกิจกรรม
        </h1>
      </div>
      <div className="w-full relative h-3 [@media(min-width:480px)]:h-5">
        <img src="/explore/clay_curve.svg" alt="" className="w-full absolute z-10" />
        <img src="/explore/light_clay_curve.svg" alt="" className="w-full absolute z-20" />
      </div>
    </section>
  )
}
