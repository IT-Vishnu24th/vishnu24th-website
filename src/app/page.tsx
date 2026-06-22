import AuthResult from "@/features/auth/components/AuthResult"
import { LoginButton } from "@/features/auth/components/LoginButton"
import Image from "next/image"
import SponsorFooter from "@/components/SponsorFooterForHome"
import NavigationFooter from "@/components/NavigationFooter"
import { Header } from "@/components/Headers"

export default function HomePage() {
  return (
    <div className="min-h-screen px-6 py-10">
      <Header />
      <div className="flex flex-col items-center justify-center text-center mt-36 md:mt-24 space-y-3">
        <h1 className="text-5xl md:text-8xl font-bold">INTANIA</h1>

        <h1 className="text-5xl md:text-7xl font-bold">FIRST DATE</h1>

        <h2 className="text-lg md:text-2xl">Intania First Date 2026</h2>

        <h3 className="text-lg md:text-xl">19 กรกฎาคม 2569</h3>

        <h1 className="text-4xl md:text-6xl font-bold mt-8">VISHNU 24th</h1>

        <h2 className="text-lg md:text-2xl">ค่ายวิศณุกรรมบุตรครั้งที่ 24</h2>

        <h3 className="text-lg md:text-xl">21–24 กรกฎาคม 2569</h3>
      </div>
      <AuthResult isSucess={true} />
      <SponsorFooter />
      <NavigationFooter />
    </div>
  )
}
