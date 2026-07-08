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
      className="bg-midnight border-3 border-midnight-light text-white rounded-4xl px-3 py-2 flex items-center gap-2 transition"
    >
      <Globe size={20} color="turquoise" strokeWidth={2.5} />
      <span className="text-md text-turqoise font-kanit">{lang}</span>
    </button>
  )
}
