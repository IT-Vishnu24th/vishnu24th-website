import AuthResult from "@/features/auth/components/AuthResult"
import { LoginButton } from "@/features/auth/components/LoginButton"
import Image from "next/image"
import SponsorFooter from "@/components/SponsorFooterForHome"
import NavigationFooter from "@/components/NavigationFooter"

export default function HomePage() {
  return (
    <div>
      <h1>VISHNU 24th</h1>
      <LoginButton />
      <AuthResult isSucess={true} />
      <SponsorFooter />
      <NavigationFooter />
    </div>
  )
}
