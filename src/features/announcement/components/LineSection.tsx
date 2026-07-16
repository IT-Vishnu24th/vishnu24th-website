import { LineLogo } from "@/components/icon/LineIcon"
import Link from "next/link"

export const LineSection = () => {
  return (
    <Link href="" className="relative mt-10 block min-h-50 w-full shrink-0 overflow-hidden">
      <div className="absolute left-1/2 top-10 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border-2 border-midnight-light bg-midnight px-2.5 py-1.5 text-turqoise duration-300 hover:border-white">
        <LineLogo className="size-4" />
        <p className="mb-2 mt-1.5 font-fc-quantum leading-none">เข้ากลุ่มไลน์</p>
      </div>

      <img
        src="/auth/globe.png"
        alt="Globe"
        className="absolute left-1/2 -translate-x-1/2 h-auto w-auto max-w-140"
      />
    </Link>
  )
}
