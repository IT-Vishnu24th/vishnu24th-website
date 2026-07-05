"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { faqData } from "@/features/landing-page/const/FAQmock"

export default function FAQFooter() {
  // key: "categoryIndex-itemIndex" ของ item ที่เปิดอยู่ (เปิดได้ทีละ 1 อัน)
  const [openKey, setOpenKey] = useState<string | null>(null)

  const toggle = (key: string) => {
    setOpenKey((prev) => (prev === key ? null : key))
  }

  return (
    <section className="relative overflow-hidden bg-cream pb-20 px-6">
      {/* ลายกระดาษฉีกมุมล่าง */}
      <div className="absolute bottom-6 -right-10 w-140 h-40 pointer-events-none opacity-90">
        <Image src="/landingpage/art-faq.png" alt="" fill className="object-contain" />
      </div>

      <div className="relative z-10 max-w-md mx-auto mt-10">
        <h2 className="text-center text-3xl md:text-4xl font-kanit font-bold text-brownie-light mb-4">
          คำถามที่พบบ่อย
        </h2>

        {faqData.map((category, catIdx) => (
          <div key={catIdx} className="mb-8">
            <h3 className="text-center text-lg font-kanit font-semibold text-brownie-light mb-2">
              {category.title}
            </h3>

            <div className="flex flex-col gap-2">
              {category.items.map((item, itemIdx) => {
                const key = `${catIdx}-${itemIdx}`
                const isOpen = openKey === key

                return (
                  <div key={key}>
                    <button
                      onClick={() => toggle(key)}
                      className={`w-full flex items-center justify-between gap-2 bg-[#F0DCC4] px-4 py-2 text-left text-sm md:text-base text-brownie-light transition-colors hover:bg-[#F6E2C9] ${
                        isOpen ? "rounded-t-xl" : "rounded-xl"
                      }`}
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        size={18}
                        strokeWidth={2.5}
                        className={`shrink-0 text-brownie-light transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="rounded-b-2xl bg-[#F0DCC4] px-4 py-3 text-sm md:text-base text-brick-orange">
                        {item.answer}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
