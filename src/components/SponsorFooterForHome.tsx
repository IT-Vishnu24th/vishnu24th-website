export default function Footer() {
  const bigSponsors = ["Sponsor 1", "Sponsor 2"]

  const mediumSponsors = ["Sponsor 3", "Sponsor 4", "Sponsor 5", "Sponsor 6"]

  const smallSponsors = [
    "Sponsor 7",
    "Sponsor 8",
    "Sponsor 9",
    "Sponsor 10",
    "Sponsor 11",
    "Sponsor 12",
    "Sponsor 13",
  ]

  return (
    <footer className="w-full pt-10 pb-24">
      <div className="max-w-6xl mx-auto px-3">
        <h2 className="text-center text-xl font-semibold mb-8">ขอขอบคุณผู้สนับสนุน</h2>

        {/* BIG */}
        <div className="flex justify-center gap-5 mb-8">
          {bigSponsors.map((name) => (
            <div
              key={name}
              className="w-28 h-20 rounded-xl bg-neutral-200 flex items-center justify-center text-sm text-neutral-500"
            >
              {name}
            </div>
          ))}
        </div>

        {/* MEDIUM */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {mediumSponsors.map((name) => (
            <div
              key={name}
              className="w-20 h-14 rounded-lg bg-neutral-200 flex items-center justify-center text-xs text-neutral-500"
            >
              {name}
            </div>
          ))}
        </div>

        {/* SMALL */}
        <div className="flex flex-wrap justify-center gap-3">
          {smallSponsors.map((name) => (
            <div
              key={name}
              className="w-14 h-10 rounded-md bg-neutral-200 flex items-center justify-center text-[10px] text-neutral-500"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
