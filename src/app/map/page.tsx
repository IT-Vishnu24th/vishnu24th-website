"use client"
import { Header } from "@/components/Headers"
import { Hand } from "lucide-react"

export default function MapPage() {
  return (
    <div className="mx-auto pb-8 font-sans">
      <Header />
      {/* Top Bar */}
      <div className="flex items-center px-4 pt-4 pb-2">
        <button
          onClick={() => window.history.back()}
          className="text-2xl bg-transparent border-none cursor-pointer p-0 mr-2"
          aria-label="กลับ"
        >
          ←
        </button>
        <h1 className="flex-1 text-center text-3xl font-bold font-serif pr-8">แผนที่</h1>
      </div>

      {/* Map Area */}
      <div className="mx-4 my-3 overflow-hidden rounded-2xl bg-white">
        <iframe
          src="/map/engineer.html"
          title="แผนที่"
          className="w-full h-[260px] border-0 block"
        />
      </div>

      {/* text */}
      <div className="flex items-center gap-2 px-4 py-3 text-base">
        <Hand size={20} className="text-gray-700" />
        <span>แตะบนอาคารที่ต้องการดูแผนที่ชมรม</span>
      </div>
    </div>
  )
}
