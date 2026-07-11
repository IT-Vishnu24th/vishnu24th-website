import type { User } from "@/types/user"

type UserProfileSectionProps = {
  user?: User
}

export const UserProfileSection = ({ user }: UserProfileSectionProps) => {
  if (!user) return null
  const { title, firstName, surname, nickname } = user.name.th

  return (
    <section className="flex w-full flex-col items-center px-7 pt-18 text-center">
      <img
        src={`/auth/profile/profile_${(Number(user?.id) || 0) % 4}.png`}
        className="size-25 rounded-full object-cover border-5 border-midnight"
      />

      <h1 className="text-[64px] font-sov-yeehor leading-[0.9] tracking-[1.28px] text-mint">
        {user?.role === "participant" ? "น้อง" : ""}
        {nickname}
      </h1>
      <p className="mt-2 text-[24px] font-fc-quantum leading-none tracking-[-0.24px] text-turqoise">{`${title}${firstName} ${surname}`}</p>
    </section>
  )
}
