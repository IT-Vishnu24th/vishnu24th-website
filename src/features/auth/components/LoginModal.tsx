"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { GoogleIcon } from "@/components/icon/GoogleIcon"
import useAuth from "@/hooks/useAuth"

interface LoginModalProps {
  callbackUrl?: string
}

export const LoginModal = ({ callbackUrl = "/" }: LoginModalProps) => {
  const { signInWithGoogle } = useAuth()
  return (
    <section className="fixed left-1/2 top-1/2 min-h-42.5 w-[calc(100%-2rem)] max-w-90.25 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white px-5.5 pb-6 pt-6.75 text-[#171717] shadow-[0_12px_40px_rgba(0,0,0,0.24)]">
      <Dialog.Close asChild>
        <button
          type="button"
          aria-label="ปิดหน้าต่างเข้าสู่ระบบ"
          className="absolute right-2.75 top-2.5 grid size-8 cursor-pointer place-items-center rounded-full transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          <X aria-hidden="true" className="size-6" strokeWidth={2} />
        </button>
      </Dialog.Close>

      <Dialog.Title className="text-center text-xl font-normal leading-7">เข้าสู่ระบบ</Dialog.Title>
      <Dialog.Description className="sr-only">
        เข้าสู่ระบบด้วยบัญชี Google ของจุฬาลงกรณ์มหาวิทยาลัย
      </Dialog.Description>

      <button
        type="button"
        className="mt-3.5 flex h-10 w-full cursor-pointer items-center rounded-full border border-[#4b4b4b] bg-white px-3 text-base font-normal transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-wait disabled:opacity-60"
        onClick={() => signInWithGoogle(callbackUrl)}
      >
        <GoogleIcon />
        <span className="flex-1 pr-6 text-center">&quot;ลงชื่อเข้าใช้ด้วย Google&quot;</span>
      </button>

      <p className="mt-2.5 text-center text-sm leading-5">
        ใช้บัญชีที่ลงท้ายด้วย @student.chula.ac.th
      </p>
    </section>
  )
}
