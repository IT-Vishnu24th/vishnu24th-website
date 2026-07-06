import type { User } from "@/types/user"

type UserInfoSectionProps = {
  user: User
}

export const UserInfoSection = ({ user }: UserInfoSectionProps) => {
  return (
    <section className="mt-11.75 w-full pb-8">
      <div className="text-center">
        <p className="font-serif text-[25px] leading-none tracking-[-0.03em] text-mint">
          รหัสนิสิต
        </p>
        <p className="mt-1 text-[19px] leading-none text-turqoise">{user.id}</p>

        <p className="mt-4.75 font-serif text-[25px] leading-none tracking-[-0.03em] text-mint">
          ภาควิชา
        </p>
        <p className="mt-1 text-[19px] leading-none text-turqoise">{user.department.th}</p>
      </div>
    </section>
  )
}
