"use client"

import { modalStore } from "@/stores/modalStore"
import { LoginModal } from "./LoginModal"
import { LogIn } from "lucide-react"

export const LoginButton = () => {
  return (
    <button
      onClick={() => modalStore.open(<LoginModal />)}
      className="bg-black text-white rounded-4xl px-4 py-3 flex items-center gap-2 hover:bg-neutral-800 transition"
    >
      <LogIn size={20} />
      <span className="text-lg">เข้าสู่ระบบ</span>
    </button>
  )
}
