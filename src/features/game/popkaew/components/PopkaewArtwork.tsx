import Image from "next/image"

export const PopkaewArtwork = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative min-h-screen inset-0 w-full bg-[linear-gradient(180deg,#AEEFE7_0%,#F2E6D0_51.44%,#BA604E_70.19%)]"
    >
      <Image
        src="/game-popkaew/orange-planet-left-edge.png"
        alt=""
        width={66}
        height={157}
        className="absolute left-0 top-5 z-2"
      />
      <Image
        src="/game-popkaew/orange-planet.png"
        alt=""
        width={65}
        height={87}
        className="absolute -left-3.5 top-51.5 z-2"
      />
      <Image
        src="/game-popkaew/aqua-planet-right-edge.png"
        alt=""
        width={215}
        height={237}
        className="absolute right-0 top-0 z-1 h-26.25 w-55.5 object-cover"
      />
      <Image
        src="/game-popkaew/popkaew-title-sign.png"
        alt=""
        width={284}
        height={142}
        priority
        className="absolute left-1/2 -translate-x-1/2 top-5 z-2"
      />
      <Image
        src="/game-popkaew/crystal-left.png"
        alt=""
        width={38}
        height={42}
        className="absolute left-7 top-43.75 z-2"
      />
      <Image
        src="/game-popkaew/floating-rock-left.png"
        alt=""
        width={65}
        height={87}
        className="absolute right-0 top-51.5 z-2"
      />
      <Image
        src="/game-popkaew/crystal-right-small.png"
        alt=""
        width={31}
        height={36}
        className="absolute right-3 top-43.75 z-2"
      />
      <Image
        src="/game-popkaew/floating-rock-right.png"
        alt=""
        width={45}
        height={61}
        className="absolute right-15.5 top-51.5 z-2"
      />
      <Image
        src="/game-popkaew/leaf-01.png"
        alt=""
        width={142}
        height={141}
        className="absolute -left-7.75 top-76.75 z-2"
      />
      <Image
        src="/game-popkaew/leaf-02.png"
        alt=""
        width={151}
        height={123}
        className="absolute -left-3.75 top-96.5 z-3"
      />
      <Image
        src="/game-popkaew/leaf-03.png"
        alt=""
        width={166}
        height={170}
        className="absolute -right-7 top-71.25 z-2"
      />
      <Image
        src="/game-popkaew/leaf-04.png"
        alt=""
        width={158}
        height={160}
        className="absolute -right-10.25 top-92.5 z-3"
      />
      <Image
        src="/game-popkaew/perch-log.png"
        alt=""
        width={274}
        height={121}
        priority
        className="absolute left-1/2 -translate-x-1/2 top-95.25 z-2"
      />
    </div>
  )
}
