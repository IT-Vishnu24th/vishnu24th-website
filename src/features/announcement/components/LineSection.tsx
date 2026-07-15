import { LineLogo } from "@/components/icon/LineIcon"
import Link from "next/link"

export const LineSection = () => {
  return (
    <section className="relative mt-10 min-h-50 w-full shrink-0 overflow-hidden">
      <Link
        href=""
        className="absolute hover:border-white duration-300 left-1/2 top-10 rounded-full border-2 border-midnight-light bg-midnight text-turqoise -translate-x-1/2 z-20 flex px-2.5 py-1.5 items-center gap-2"
      >
        <LineLogo className="size-4" />
        <p className="mt-1.5 font-fc-quantum leading-none mb-2">เข้ากลุ่มไลน์</p>
      </Link>
      <img src="/auth/blue_planet.png" className="w-120 absolute left-1/2 -translate-x-1/2" />
    </section>
  )
}
