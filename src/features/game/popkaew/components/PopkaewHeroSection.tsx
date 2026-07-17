import { Header2 } from "@/components/Headers"

export const PopkaewHeroSection = () => {
  return (
    <section className="w-full bg-[linear-gradient(180deg,#2D3542_0%,#934E43_100%)] text-black">
      <Header2 title="เกมส์" url="/game" />
      <div className="w-full h-7"></div>
      <div className="w-full relative h-3 [@media(min-width:480px)]:h-5">
        <img src="/explore/clay_curve.svg" alt="" className="w-full absolute z-10" />
        <img src="/explore/light_clay_curve.svg" alt="" className="w-full absolute z-20" />
      </div>
    </section>
  )
}
