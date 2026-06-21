import { LoginButton } from "@/features/auth/components/LoginButton"
import { LanguageChangerButton } from "@/features/i18n/components/LanguageChangerButton"

export const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <LanguageChangerButton />
      <LoginButton />
    </div>
  )
}
