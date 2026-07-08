import { WebsitePhaseBlock } from "@/features/admin/websitePhase/components/WebsitePhaseBlock"

const websitePhaseSections = [
  {
    title: "หน้าหลัก",
    toggles: [
      { id: "home-feature-1", label: "ฟีเจอร์โหด ๆ", defaultChecked: true },
      { id: "home-feature-2", label: "ฟีเจอร์โหด ๆ", defaultChecked: true },
    ],
  },
  {
    title: "สำรวจ",
    toggles: [
      { id: "explore-feature-1", label: "ฟีเจอร์โหด ๆ", defaultChecked: true },
      { id: "explore-feature-2", label: "ฟีเจอร์โหด ๆ", defaultChecked: true },
    ],
  },
  {
    title: "อันดับยาน",
    defaultOpen: false,
    toggles: [],
  },
  {
    title: "เกมส์",
    toggles: [
      { id: "game-feature-1", label: "ฟีเจอร์โหด ๆ", defaultChecked: true },
      { id: "game-feature-2", label: "ฟีเจอร์โหด ๆ", defaultChecked: true },
    ],
  },
]

export default async function WebsiteSettingsPage() {
  // const user = await getAuthenticatedUser()

  // if (!user) {
  //   return <div>not authenticated</div>
  // }

  // if (user.role !== "admin") {
  //   return <div>not authorized</div>
  // }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-120 flex-col bg-[#f7f7f7] px-5 py-10 text-black">
      <div className="flex flex-col gap-7">
        <div className="text-5xl w-full text-center">ฟีเจอร์</div>
        {websitePhaseSections.map((section) => (
          <WebsitePhaseBlock
            key={section.title}
            title={section.title}
            toggles={section.toggles}
            defaultOpen={section.defaultOpen}
          />
        ))}
      </div>
    </main>
  )
}
