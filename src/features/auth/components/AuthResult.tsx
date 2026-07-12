import { Key } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export interface AuthResultProps {
  isSuccess: boolean
  setIsOpen?: (e: boolean) => void
}

export const AuthResult = ({ isSuccess }: AuthResultProps) => {
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
        {isSuccess ? (
          <>
            <div className="text-[18px]">ยืนยันตัวตน</div>
            <div className="text-[24px]">โจรสลัดอวกาศรุ่น 110</div>
          </>
        ) : (
          <div className="text-[18px]">ยืนยันไม่ตัวตน</div>
        )}
      </div>
      {isSuccess ? (
        <button className="z-40 absolute cursor-pointer left-1/2 -translate-x-1/2 bottom-1/12 flex font-fc-quantum rounded-full items-center text-[16px] gap-1.5 border-2 text-midnight px-2 py-1 border-midnight-light bg-turqoise animate-bounce hover:bg-clay-light duration-300">
          <Key className="size-4" />
          <div className="mb-0.5">..?</div>
        </button>
      ) : (
        <Link
          href="/"
          className="z-40 absolute cursor-pointer left-1/2 -translate-x-1/2 bottom-1/12 flex font-fc-quantum rounded-full items-center text-[16px] gap-1.5 border-2 text-midnight px-2 py-1 border-midnight-light bg-turqoise animate-bounce hover:bg-clay-light duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M12.5 17.5V10.8333C12.5 10.6123 12.4122 10.4004 12.2559 10.2441C12.0996 10.0878 11.8877 10 11.6667 10H8.33333C8.11232 10 7.90036 10.0878 7.74408 10.2441C7.5878 10.4004 7.5 10.6123 7.5 10.8333V17.5M2.5 8.33333C2.49994 8.09088 2.55278 7.85135 2.65482 7.63142C2.75687 7.4115 2.90566 7.21649 3.09083 7.05999L8.92417 2.05999C9.22499 1.80575 9.60613 1.66626 10 1.66626C10.3939 1.66626 10.775 1.80575 11.0758 2.05999L16.9092 7.05999C17.0943 7.21649 17.2431 7.4115 17.3452 7.63142C17.4472 7.85135 17.5001 8.09088 17.5 8.33333V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V8.33333Z"
              stroke="#2D3542"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div className="mb-0.5">กลับหน้าหลัก</div>
        </Link>
      )}
    </div>
  )
}

export default AuthResult
