import { Save } from "lucide-react"

export const SaveButton = () => {
  return (
    <button className="relative flex h-45 w-full shrink-0 cursor-pointer items-start justify-center overflow-hidden pt-10 text-black">
      <div className="absolute left-1/2 top-41.25 h-82.75 w-116 -translate-x-1/2 -translate-y-1/2 rounded-t-[50%] bg-[#d9d9d9]" />
      <div className="relative flex w-13 shrink-0 flex-col items-center gap-4">
        <Save aria-hidden="true" className="size-6" strokeWidth={2.2} />
        <p className="w-full text-left text-[20px] leading-[1.2]">บันทึก</p>
      </div>
    </button>
  )
}
