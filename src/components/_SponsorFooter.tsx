export default function Footer() {
  const sponsors = [
    "/sponsors/sponsor1.png",
    "/sponsors/sponsor2.png",
    "/sponsors/sponsor3.png",
    "/sponsors/sponsor4.png",
    "/sponsors/sponsor5.png",
    "/sponsors/sponsor6.png",
    "/sponsors/sponsor7.png"
  ];

  return (
    <footer className="w-full py-10">

      <div className="max-w-6xl mx-auto px-3">

        {/* Title */}
        <h2 className="text-center text-xl font-semibold mb-6">
          ขอขอบคุณผู้สนับสนุน
        </h2>

        {/* Sponsors */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">

          {sponsors.map((logo, index) => (
            <div
              key={index}
              className="w-20 h-12 flex items-center justify-center"
            >
              <img
                src={logo}
                alt={`Sp ${index + 1}`}
                className="max-h-full object-contain"
              />
            </div>
          ))}

        </div>

      </div>

    </footer>
  );
}

