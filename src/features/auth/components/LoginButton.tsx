"use client"

import { modalStore } from "@/stores/modalStore"
import { LoginModal } from "./LoginModal"
import { LogIn } from "lucide-react"

type LoginButtonProps = {
  callbackUrl?: string
}

export const LoginButton = ({ callbackUrl }: LoginButtonProps = {}) => {
  return (
    <button
      onClick={() => modalStore.open(<LoginModal callbackUrl={callbackUrl} />)}
      className="bg-midnight border-3 border-midnight-light text-white rounded-4xl px-4 py-2 flex items-center gap-2 hover:bg-neutral-800 transition"
    >
      <LogIn size={20} color="turquoise" strokeWidth={2.5} />
      <span className={`text-md font-fc-quantum text-turqoise mb-1`}>เข้าสู่ระบบ</span>
    </button>
  )
}
