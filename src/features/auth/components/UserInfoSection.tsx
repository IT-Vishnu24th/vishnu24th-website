import type { User } from "@/types/user"

type UserInfoSectionProps = {
  user?: User
}

export const UserInfoSection = ({ user }: UserInfoSectionProps) => {
  if (!user) return null
  return (
    <section className="mt-12 w-full pb-8">
      <div className="text-center">
        <p className="text-[32px] leading-none font-sov-yeehor tracking-[0.64px] text-mint">
          รหัสนิสิต
        </p>
        <p className="mt-1 text-[18px] leading-[25.2px] font-fc-quantum text-turqoise">{user.id}</p>

        <p className="text-[32px] leading-none font-sov-yeehor tracking-[0.64px] text-mint">
          ภาควิชา
        </p>
        <p className="mt-1 text-[18px] leading-[25.2px] font-fc-quantum text-turqoise">
          {user.department.th}
        </p>
      </div>
    </section>
  )
}
