const LineLogo = () => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      className="size-[clamp(2.25rem,9vw,3rem)] drop-shadow-sm"
    >
      <rect width="48" height="48" rx="10" fill="#06C755" />
      <path
        fill="white"
        d="M39.2 22.1c0-6.8-6.8-12.3-15.2-12.3S8.8 15.3 8.8 22.1c0 6.1 5.4 11.2 12.8 12.1.5.1 1.2.4 1.4.9.2.4.1 1.1.1 1.5l-.2 1.5c-.1.5-.4 1.8 1.3 1 1.7-.7 9-5.3 12.3-9.1 2.3-2.5 3.3-4.9 3.3-6.4"
      />
      <text
        x="24"
        y="25.2"
        fill="#06C755"
        fontSize="9"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        textAnchor="middle"
      >
        LINE
      </text>
    </svg>
  )
}

export const LineSection = () => {
  return (
    <section className="relative mt-[6.1%] min-h-[clamp(18rem,62vw,23rem)] w-full shrink-0 overflow-hidden">
      <div className="absolute left-1/2 top-0 flex aspect-[1.35] w-[130%] -translate-x-1/2 flex-col items-center rounded-[50%] bg-[#d9d9d9] pt-[clamp(4.5rem,14vw,5.75rem)]">
        <LineLogo />
        <p className="mt-1.5 font-serif text-[clamp(1.25rem,4.8vw,1.625rem)] leading-none">
          เข้ากลุ่มไลน์
        </p>
      </div>
    </section>
  )
}
