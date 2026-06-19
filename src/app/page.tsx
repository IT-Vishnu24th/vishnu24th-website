import AuthResult from "@/features/auth/components/AuthResult"
import { LoginButton } from "@/features/auth/components/LoginButton"

export default function HomePage() {
  return (
    <div>
      <h1>VISHNU 24th</h1>
      <LoginButton />
      <AuthResult isSucess={true} />
    </div>
  )
}
