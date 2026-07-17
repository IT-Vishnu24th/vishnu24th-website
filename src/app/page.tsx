import Image from "next/image"
import Link from "next/link"
import SponsorFooter from "@/features/landing-page/components/SponsorFooterForHome"
import NavigationFooter from "@/components/NavigationFooter"
import { Header } from "@/components/Headers"
import { MapPin } from "lucide-react"
import FAQFooter from "@/features/landing-page/components/QuestionFooter"
import { YarnAnnouncementButton } from "@/features/announcement/components/YarnAnnouncementButton"
import { ParallaxLayer } from "@/components/ParallaxLayer"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#2D3542] to-[#2D4D61]">
      {/* พื้นหลังลายเฟือง */}
      <ParallaxLayer className="absolute inset-0 z-0" speed={0.4}>
        <Image
          src="/landingpage/art-background.png"
          alt=""
          fill
          className="pointer-events-none object-contain object-[center_6%]"
        />
      </ParallaxLayer>

      {/* ตึกซ้าย-ขวา + เฟืองมุมบน วางทับด้านหน้า */}
      <ParallaxLayer className="absolute inset-0 z-10" speed={0.75}>
        <Image
          src="/landingpage/art-foreground.png"
          alt=""
          fill
          className="pointer-events-none object-contain object-top object-[center_22%]"
        />
      </ParallaxLayer>

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
          <h3 className="text-base md:text-2xl text-[#74DDCF] font-fc-quantum">18 กรกฎาคม 2569</h3>

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
            ค่ายวิษณุกรรมบุตรครั้งที่ 24
          </h2>
          <h3 className="text-base md:text-2xl text-[#74DDCF] font-fc-quantum">
            21–24 กรกฎาคม 2569
          </h3>

          {/* ปุ่มด้านล่าง */}
          <div className="relative z-20 flex items-center justify-center gap-3 mt-15 mb-30">
            <Link
              href="/registration-point"
              className="flex min-h-11 items-center gap-1.5 rounded-full bg-[#74DDCF] font-fc-quantum border-[#2D4B5F] border-2 px-3 py-2.5 text-[#2D4B5F] text-sm md:text-base hover:bg-[#74ddcfa0] transition-colors"
            >
              <MapPin size={18} strokeWidth={3} />
              <div className="mb-1">ดูจุดลงทะเบียน</div>
            </Link>
            <YarnAnnouncementButton />
          </div>
        </div>

        <div className="relative z-10 -mb-5 h-12 w-full md:h-14">
          <Image src="/landingpage/blue-line.svg" alt="" fill className="object-fill" />
        </div>

        {/* <AuthResult isSucess={true} /> */}

        <div className="z-20">
          <div className="-mt-5 md:-mt-6 relative ">
            <SponsorFooter />
          </div>

          <div className="relative -top-40 -mt-1 h-[72px] w-full md:h-20">
            <Image
              src="/landingpage/cream-line.svg"
              alt=""
              fill
              className="object-fill scale-105"
            />
          </div>
        </div>
        <div className="relative -top-47 -mb-30">
          <FAQFooter />
        </div>

        <NavigationFooter />
      </div>
    </div>
  )
}
