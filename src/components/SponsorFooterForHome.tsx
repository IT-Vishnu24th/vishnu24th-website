export default function Footer() {
  const bigsponsors = ["/sponsors/sponsor1.png", "/sponsors/sponsor2.png"]

  const mediumsponsors = [
    "/sponsors/sponsor4.png",
    "/sponsors/sponsor5.png",
    "/sponsors/sponsor6.png",
    "/sponsors/sponsor7.png",
  ]

  const smallsponsors = [
    "/sponsors/sponsor8.png",
    "/sponsors/sponsor9.png",
    "/sponsors/sponsor10.png",
    "/sponsors/sponsor11.png",
    "/sponsors/sponsor12.png",
    "/sponsors/sponsor13.png",
    "/sponsors/sponsor14.png",
  ]

  return (
    <footer className="w-full pt-10 pb-24">
      <div className="max-w-6xl mx-auto px-3">
        <h2 className="text-center text-xl font-semibold mb-8">ขอขอบคุณผู้สนับสนุน</h2>

        {/* BIG */}
        <div className="flex justify-center gap-5 mb-8">
          {bigsponsors.map((logo, index) => (
            <div key={index} className=" w-28 h-20 flex items-center justify-center">
              <img
                src={logo}
                alt={`Big ${index}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* MEDIUM */}
        <div className="flex justify-center gap-4 mb-8">
          {mediumsponsors.map((logo, index) => (
            <div key={index} className="w-20 h-14 flex items-center justify-center">
              <img
                src={logo}
                alt={`Medium ${index}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* SMALL */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {smallsponsors.map((logo, index) => (
            <div key={index} className="w-14 h-10 flex items-center justify-center">
              <img
                src={logo}
                alt={`Small ${index}`}
                className="max-w-full max-h-full object-contain "
              />
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
