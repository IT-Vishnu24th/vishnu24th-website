import type { User } from "@/types/user"

type YarnSectionProps = {
  user: User
}

export const YarnSection = ({ user }: YarnSectionProps) => {
  return (
    <section className="mt-11 w-full text-center text-mint">
      <h2 className="mt-2.75 font-serif text-[38px] leading-none tracking-[-0.045em]">
        {user.group.vesselName.th}
      </h2>
    </section>
  )
}
