import type { User } from "@/types/user"

type YarnSectionProps = {
  user?: User
}

export const YarnSection = ({ user }: YarnSectionProps) => {
  if (!user) return null
  return (
    <section className="mt-12 w-full text-center text-mint">
      <h2 className="mt-2.75 font-sov-yeehor tracking-[0.96px] text-[48px] leading-none">
        {user.group.vesselName?.th}
      </h2>
    </section>
  )
}
