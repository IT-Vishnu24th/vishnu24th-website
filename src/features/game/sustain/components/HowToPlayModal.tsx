import { SUSTAIN_BINS } from "../data/sustainGame"

type HowToPlayModalProps = {
  open: boolean
  onClose: () => void
}

export function HowToPlayModal({ open, onClose }: HowToPlayModalProps) {
  if (!open) return null

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/12 px-6">
      <section
        aria-modal="true"
        role="dialog"
        className="w-full max-w-[302px] rounded-2xl bg-[#eeeeee] px-5 pb-6 pt-7 text-center text-black shadow-sm"
      >
        <h2 className="text-2xl font-semibold">วิธีเล่น</h2>
        <p className="mx-auto mt-3 max-w-[230px] text-sm leading-5">
          จะมีขยะหลายชนิดตกลงมาจากด้านบน ลากขยะลงถังให้ถูกประเภทภายในเวลา 30 วินาที
        </p>

        <div className="mt-5 flex flex-col gap-3 text-left">
          {SUSTAIN_BINS.map((bin) => (
            <div key={bin.type} className="flex items-center gap-3">
              <div className="flex h-[54px] w-[48px] shrink-0 items-center justify-center bg-[#aaaaaa] text-center text-[10px] font-semibold text-white">
                {bin.label}
              </div>
              <p className="text-xs leading-4 text-black/80">{bin.hint}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 rounded-full bg-[#2c2c2c] px-5 py-2 text-xs font-semibold text-white transition active:scale-95"
        >
          เข้าใจแล้ว
        </button>
      </section>
    </div>
  )
}
