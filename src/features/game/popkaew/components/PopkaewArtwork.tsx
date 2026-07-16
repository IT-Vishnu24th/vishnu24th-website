import Image from "next/image"

export const PopkaewArtwork = () => {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-x-0 top-[62px] z-0 h-[72px] bg-[linear-gradient(180deg,#2d3542_0%,#934e43_100%)]" />
      <div className="absolute inset-x-0 top-[134px] z-0 h-[740px] bg-[linear-gradient(180deg,#aeefe7_0%,#aeefe7_16%,#f2e6d0_45%,#f2e6d0_63%,#ba604e_76%,#f0865c_100%)]" />
      <Image
        src="/game-popkaew/top-canopy-section.png"
        alt=""
        width={393}
        height={100}
        priority
        className="absolute inset-x-0 top-[62px] z-[2] h-[100px] w-full object-fill"
      />
      <Image
        src="/game-popkaew/orange-planet-left-edge.png"
        alt=""
        width={66}
        height={157}
        className="absolute left-0 top-[152px] z-[2] h-[157px] w-[66px] object-contain"
      />
      <Image
        src="/game-popkaew/orange-planet.png"
        alt=""
        width={65}
        height={87}
        className="absolute left-[-14px] top-[338px] z-[2]"
      />
      <Image
        src="/game-popkaew/aqua-planet-right-edge.png"
        alt=""
        width={215}
        height={237}
        className="absolute left-[178px] top-[136px] z-[1] h-[237px] w-[222px] object-cover"
      />
      <Image
        src="/game-popkaew/popkaew-title-sign.png"
        alt=""
        width={284}
        height={142}
        priority
        className="absolute left-[55px] top-[134px] z-[2]"
      />
      <Image
        src="/game-popkaew/crystal-left.png"
        alt=""
        width={38}
        height={42}
        className="absolute left-[28px] top-[307px] z-[2]"
      />
      <Image
        src="/game-popkaew/floating-rock-left.png"
        alt=""
        width={65}
        height={87}
        className="absolute right-[0px] top-[338px] z-[2]"
      />
      <Image
        src="/game-popkaew/crystal-right-small.png"
        alt=""
        width={31}
        height={36}
        className="absolute right-[12px] top-[307px] z-[2]"
      />
      <Image
        src="/game-popkaew/floating-rock-right.png"
        alt=""
        width={45}
        height={61}
        className="absolute right-[62px] top-[338px] z-[2]"
      />
      <Image
        src="/game-popkaew/leaf-01.png"
        alt=""
        width={142}
        height={141}
        className="absolute left-[-31px] top-[439px] z-[2]"
      />
      <Image
        src="/game-popkaew/leaf-02.png"
        alt=""
        width={151}
        height={123}
        className="absolute left-[-15px] top-[518px] z-[3]"
      />
      <Image
        src="/game-popkaew/leaf-03.png"
        alt=""
        width={166}
        height={170}
        className="absolute right-[-28px] top-[417px] z-[2]"
      />
      <Image
        src="/game-popkaew/leaf-04.png"
        alt=""
        width={158}
        height={160}
        className="absolute right-[-41px] top-[502px] z-[3]"
      />
      <Image
        src="/game-popkaew/perch-log.png"
        alt=""
        width={274}
        height={121}
        priority
        className="absolute left-[59px] top-[493px] z-[2]"
      />
      <Image
        src="/game-popkaew/orange-divider-brush.png"
        alt=""
        width={274}
        height={121}
        priority
        className="absolute left-[59px] top-[590px] z-[2]"
      />
    </div>
  )
}
