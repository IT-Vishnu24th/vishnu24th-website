export default function Footer() {
  const sponsors = Array.from({ length: 7 }, (_, index) => ({
    id: index,
    name: `Sponsor ${index + 1}`,
  }))

  return (
    <footer className="w-full pt-10 pb-24">
      <div className="max-w-6xl mx-auto px-3">
        <h2 className="text-center text-xl font-semibold mb-6">ขอขอบคุณผู้สนับสนุน</h2>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="w-28 h-16 rounded-lg bg-neutral-200 flex items-center justify-center text-sm text-neutral-500"
            >
              {sponsor.name}
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
