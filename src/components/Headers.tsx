import { LoginButton } from "@/features/auth/components/LoginButton"
import { LanguageChangerButton } from "@/features/i18n/components/LanguageChangerButton"
import { UserInfoButton } from "@/features/userInfo/components/UserInfoButton"

export const Header = () => {
  return (
    <div className="flex justify-between items-center px-6 py-5">
      <LanguageChangerButton />
      <div className="flex items-center gap-2">
        <UserInfoButton />
        <LoginButton />
      </div>
    </div>
  )
}
