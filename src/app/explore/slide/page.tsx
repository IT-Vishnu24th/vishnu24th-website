"use client"

import { Download, FileText } from "lucide-react"
import { Header } from "@/components/Headers"
import { SLIDES } from "@/features/slide/const/mock"
import { useRouter } from "next/navigation"

export default function DownloadPage() {
  const router = useRouter()
  return (
    <div className="mx-auto min-h-screen bg-[#fafafa] pb-8">
      <Header />

      {/* Top Bar */}
      <div className="relative flex items-center px-4 pt-4 pb-2">
        <button
          onClick={() => router.push("/")}
          className="absolute left-6 ml-3 text-2xl font-bold"
          aria-label="กลับ"
        >
          ←
        </button>

        <h1 className="w-full text-center text-5xl font-bold font-serif">สไลด์</h1>
      </div>

      {/* description */}
      <div className="px-5 pt-2 pb-6">
        <p className="text-center text-lg">สไลด์รวมข้อมูลที่ชาววิศวะจุฬาควรรู้ไว้ในสไลด์เดียว</p>
      </div>

      {/* list */}
      <div className="flex flex-col gap-4 px-4 mx-2">
        {SLIDES.map((slide) => (
          <div
            key={slide.id}
            className="
              flex
              gap-4
              rounded-2xl
              bg-white
              px-4
              py-8
              shadow-sm
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-gray-100
              "
            >
              <FileText size={36} />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="break-words text-xl font-semibold">{slide.title}</h2>

              <p className="mt-2 break-words text-md text-gray-500">{slide.description}</p>
            </div>

            <a
              href={slide.file}
              download
              target="_blank"
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-black
                text-white
              "
            >
              <Download size={18} />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
