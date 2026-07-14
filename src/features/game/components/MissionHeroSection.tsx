import { Header } from "@/components/Headers"

export default function MissionHeroSection() {
  return (
    <section className="w-full bg-[linear-gradient(180deg,#2D3542_38.94%,#2D4B5F_100%)] text-black">
      <Header />
      <div className="px-4 pb-8 flex w-full flex-col items-center justify-center gap-5 text-center">
        <h1 className="whitespace-nowrap text-[96px] font-sov-yeehor font-normal leading-none letter-spacing-[1.92px] text-turqoise-cream">
          เกมส์
        </h1>
        <p className="max-w-75 text-[20px] font-normal font-fc-quantum leading-none text-turqoise">
          ค้นพบชมรม กิจกรรม <br />
          และข้อมูลต่างๆอีกมากมาย
        </p>
      </div>
      <div className="w-full relative h-3 [@media(min-width:480px)]:h-5">
        <img src="/explore/dark_blue_curve.svg" alt="" className="w-full absolute z-10" />
        <img src="/explore/blue_curve.svg" alt="" className="w-full absolute z-20" />
      </div>
    </section>
  )
}
