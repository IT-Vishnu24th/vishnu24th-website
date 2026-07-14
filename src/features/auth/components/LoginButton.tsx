"use client"

import { modalStore } from "@/stores/modalStore"
import { LoginModal } from "./LoginModal"
import { LogIn } from "lucide-react"

export const LoginButton = () => {
  return (
    <button
      onClick={() => modalStore.open(<LoginModal />)}
      className="bg-midnight border-3 border-midnight-light text-white rounded-4xl px-4 py-2 flex items-center gap-2 hover:bg-neutral-800 transition"
    >
      <LogIn size={20} color="turquoise" strokeWidth={2.5} />
      <span className={`text-md font-fc-quantum text-turqoise mb-1`}>เข้าสู่ระบบ</span>
    </button>
  )
}
