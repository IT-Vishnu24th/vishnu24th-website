import AuthResult from "@/features/auth/components/AuthResult"
import { LoginButton } from "@/features/auth/components/LoginButton"
import Image from "next/image"
import SponsorFooter from "@/features/landing-page/components/SponsorFooterForHome"
import NavigationFooter from "@/components/NavigationFooter"
import { Header } from "@/components/Headers"
import { MapPin, Ship } from "lucide-react"
import FAQFooter from "@/features/landing-page/components/QuestionFooter"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#2D3542] to-[#2D4D61]">
      {/* พื้นหลังลายเฟือง */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/landingpage/art-background.png"
          alt=""
          fill
          className="object-contain object-[center_10%]"
        />
      </div>

      {/* ตึกซ้าย-ขวา + เฟืองมุมบน วางทับด้านหน้า */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Image
          src="/landingpage/art-foreground.png"
          alt=""
          fill
          className="object-contain object-top object-[center_22%]"
        />
      </div>

      <div className="relative z-10">
        <Header />

        <div className="flex flex-col items-center justify-center text-center mt-3 md:mt-14 px-6">
          {/* Intania First Date logo */}
          <div className="relative w-full max-w-[340px] md:max-w-[480px] mb-3">
            <Image
              src="/landingpage/FirstDate.svg"
              alt="Intania First Date 2026"
              width={480}
              height={260}
              className="w-[70%] md:w-[80%] h-auto mx-auto"
              priority
            />
          </div>

          <h2 className="text-base md:text-2xl text-[#74DDCF] font-fc-quantum">
            Intania First Date 2026
          </h2>
          <h3 className="text-base md:text-2xl text-[#74DDCF] font-fc-quantum">19 กรกฎาคม 2569</h3>

          {/* Vishnu 24th logo */}
          <div className="relative w-full max-w-[300px] md:max-w-[420px] mt-10 mb-3">
            <Image
              src="/landingpage/Vishnu.svg"
              alt="Vishnu 24th"
              width={420}
              height={220}
              className="w-[80%] md:w-[80%] h-auto mx-auto"
            />
          </div>

          <h2 className="text-base md:text-2xl text-[#74DDCF] font-fc-quantum">
            ค่ายวิศณุกรรมบุตรครั้งที่ 24
          </h2>
          <h3 className="text-base md:text-2xl text-[#74DDCF] font-fc-quantum">
            21–24 กรกฎาคม 2569
          </h3>

          {/* ปุ่มด้านล่าง */}
          <div className="flex items-center justify-center gap-3 mt-15 mb-30">
            <button className="flex items-center gap-1 rounded-full bg-[#74DDCF] border border-[#2D4B5F] border-2 px-2 py-2.5 text-[#2D4B5F] text-sm md:text-base hover:bg-[#74ddcfa0] transition-colors">
              <MapPin size={18} strokeWidth={3} />
              ดูจุดลงทะเบียน
            </button>
            <button className="flex items-center gap-1 rounded-full bg-[#2D3542] border border-[#2D3542] border-2 px-2 py-2.5 text-[#74DDCF] text-sm md:text-base hover:bg-[#0F2A3D] transition-colors">
              <Ship size={18} strokeWidth={3} />
              ยานอาคาเรียม
            </button>
          </div>
        </div>

        <div className="relative w-full h-6 md:h-8 z-10">
          <Image src="/landingpage/blue-line.png" alt="" fill className="object-fill" />
        </div>

        {/* <AuthResult isSucess={true} /> */}
        <div className="-mt-3 md:-mt-4 relative ">
          <div className="absolute -top-30 inset-0 z-50 pointer-events-none">
            <Image src="/landingpage/sponsor-art.png" fill className="object-fill" alt="" />
          </div>

          <div className="z-20">
            <SponsorFooter />
          </div>

          <div className="relative -top-40 w-full h-10 md:h-8 -mt-1">
            <Image
              src="/landingpage/cream-line.png"
              alt=""
              fill
              className="object-fill scale-105"
            />
          </div>
        </div>
        <div className="relative -top-44 -mb-30">
          <FAQFooter />
        </div>

        <NavigationFooter />
      </div>
    </div>
  )
}
