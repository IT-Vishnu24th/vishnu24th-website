import NavigationFooter from "@/components/NavigationFooter"
import SponsorFooter from "@/components/SponsorFooter"
import MissionCard, { MissionStatus } from "@/features/game/components/MissionCard"
import MissionHeroSection from "@/features/game/components/MissionHeroSection"

const missions = [
  {
    title: "เสี่ยงโชคปล้นจักรวาล",
    reward: 50000,
    img: "/game/treasure_banner.png",
    status: "locked" as MissionStatus,
  },
  {
    title: "ปริศนาฟ้าลิขิต",
    reward: 50000,
    banner: "",
    status: "locked" as MissionStatus,
  },
  {
    title: "Pop Kaew",
    reward: 50000,
    img: "/game/popkaew_banner.png",
    status: "locked" as MissionStatus,
  },
  {
    title: "ความจริงน่ะมีเพียง\nหนึ่งเดียวเท่านั้น",
    reward: 50000,
    img: "/game/trash_banner.png",
    status: "locked" as MissionStatus,
  },
]

export default function GamePage() {
  return (
    <>
      <div className="w-full overflow-x-hidden">
        <MissionHeroSection />
        <section className="w-full bg-[linear-gradient(0deg,#2D3542_5.3%,#F0865C_96.95%)] pb-6 pt-20">
          <div className="w-full flex flex-col items-center pb-15">
            {missions.map((mission) => (
              <MissionCard key={mission.title} {...mission} deadline="br" />
            ))}
          </div>
        </section>
        <SponsorFooter />
      </div>
      <NavigationFooter />
    </>
  )
}
