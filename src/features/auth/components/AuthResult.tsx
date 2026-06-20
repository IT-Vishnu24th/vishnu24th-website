import { CircleCheck, CircleX } from "lucide-react"

export interface AuthResultProps {
  isSucess: boolean
}

export const AuthResult = ({ isSucess }: AuthResultProps) => {
  const ResultIcon = isSucess ? CircleCheck : CircleX

  return (
    <section
      aria-live="polite"
      className="grid min-h-svh place-items-center bg-white px-6 text-[#171717]"
    >
      <div
        role={isSucess ? "status" : "alert"}
        className="flex -translate-y-8 flex-col items-center text-center"
      >
        <ResultIcon aria-hidden="true" className="size-13" strokeWidth={1.25} />

        {isSucess ? (
          <>
            <div className="mt-7 text-2xl font-normal leading-[1.2]">
              <p>ยืนยันตัวตน</p>
              <p>โจรสลัดอวกาศรุ่น 110</p>
            </div>
            <p className="mt-7 text-2xl font-normal leading-[1.2]">สวัสดีน้องคิน</p>
          </>
        ) : (
          <p className="mt-7 text-2xl font-normal leading-[1.2]">ยืนยันตัวตนไม่สำเร็จ</p>
        )}
      </div>
    </section>
  )
}

export default AuthResult
