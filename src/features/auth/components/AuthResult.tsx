"use client"

import useAuth from "@/hooks/useAuth"
import { Home } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const AuthResult = () => {
  const { user } = useAuth()
  const isSuccess = user !== null
  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-b from-[#2D3542] to-[#2D4D61]">
      {/* พื้นหลังลายเฟือง */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/landingpage/art-background.png"
          alt=""
          fill
          className="object-cover object-center"
        />
      </div>

      {/* ตึกซ้าย-ขวา + เฟืองมุมบน วางทับด้านหน้า */}
      <div className="absolute inset-0 z-10">
        <Image
          src="/landingpage/art-foreground.png"
          alt=""
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center min-h-screen font-fc-quantum justify-center">
        <img className="w-50 mb-2" src={isSuccess ? "/auth/moon_up.png" : "/auth/moon_down.png"} />
        {isSuccess ? (
          <>
            <div className="text-[18px]">ยืนยันตัวตน</div>
            <div className="text-[24px]">โจรสลัดอวกาศรุ่น 110</div>
          </>
        ) : (
          <div className="text-[18px]">ยืนยันตัวตนไม่สำเร็จ</div>
        )}
      </div>
      <Link
        href="/"
        className="z-40 absolute cursor-pointer left-1/2 -translate-x-1/2 bottom-1/12 flex font-fc-quantum rounded-full items-center text-[16px] gap-1.5 border-2 text-midnight px-2 py-1 border-midnight-light bg-turqoise animate-bounce hover:bg-clay-light duration-300"
      >
        <Home className="size-5" />
        <div className="mb-0.5">กลับหน้าหลัก</div>
      </Link>
    </div>
  )
}

export default AuthResult
