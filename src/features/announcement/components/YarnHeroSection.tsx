import { Header2 } from "@/components/Headers"

export const YarnHeroSection = ({ yarnName }: { yarnName?: string }) => {
  return (
    <section className="w-full bg-[linear-gradient(180deg,#2D3542_38.94%,#2D4B5F_100%)] text-black">
      <Header2 url="/" title="หน้าหลัก" />
      <div className="px-4 pb-8 flex w-full flex-col items-center justify-center text-center">
        <p className="max-w-75 text-[20px] h-0 font-normal font-fc-quantum leading-none text-turqoise">
          ยินดีด้วย คุณได้สังกัดใน
        </p>
        <h1 className="leading-18.5 text-[96px] font-sov-yeehor font-normal letter-spacing-[1.92px] text-turqoise-cream [@media">
          {yarnName}
        </h1>
      </div>
      <div className="w-full relative h-3 [@media(min-width:480px)]:h-5">
        <img src="/explore/dark_blue_curve.svg" alt="" className="w-full absolute z-10" />
        <img src="/explore/blue_curve.svg" alt="" className="w-full absolute z-20" />
      </div>
    </section>
  )
}
