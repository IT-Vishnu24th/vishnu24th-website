"use client"

import { Globe } from "lucide-react"
import { useState } from "react"

export const LanguageChangerButton = () => {
  const [lang, setLang] = useState("TH")

  const toggleLanguage = () => {
    setLang((prev) => (prev === "TH" ? "EN" : "TH"))
  }

  return (
    <button
      onClick={toggleLanguage}
      className="bg-black text-white rounded-4xl px-4 py-3 flex items-center gap-2 hover:bg-neutral-800 transition"
    >
      <Globe size={20} />
      <span className="text-lg">{lang}</span>
    </button>
  )
}
