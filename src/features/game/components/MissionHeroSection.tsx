import { ArrowLeft } from "lucide-react"

export default function MissionHeroSection() {
  return (
    <section className="relative flex w-full flex-col items-center gap-4 px-4 pb-2 pt-6 text-center text-black">
      <button
        type="button"
        aria-label="ย้อนกลับ"
        className="absolute left-4 top-7 flex size-10 items-center justify-center rounded-full text-black transition hover:bg-black/5"
      >
        <ArrowLeft size={18} strokeWidth={1.8} />
      </button>

      <h1 className="w-full text-[60px] leading-[1.08] tracking-[1.2px] sm:text-[72px] sm:leading-[1.2] sm:tracking-[1.44px]">
        เกมล่าสมบัติ
      </h1>

      <p className="max-w-85 text-[20px] leading-[1.2]">
        น้องจะพายานไปสู่จุดสูงสุดได้หรือไม่ บลาบลาบลา
      </p>
    </section>
  )
}
