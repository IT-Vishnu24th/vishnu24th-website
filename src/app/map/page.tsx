export default function MapPage() {
  return (
    <div className="max-w-[420px] mx-auto pb-8 font-sans">
      {/* Top Bar */}
      <div className="flex items-center px-4 pt-4 pb-2">
        <button
          onClick={() => window.history.back()}
          className="text-2xl bg-transparent border-none cursor-pointer p-0 mr-2"
          aria-label="กลับ"
        >
          ←
        </button>
        <h1 className="flex-1 text-center text-3xl font-bold font-serif pr-8">แผนที่</h1>
      </div>

      {/* Map Area */}
      <div className="mx-4 my-3 rounded-2xl border-[3px] border-gray-400 bg-gray-300 p-2 min-h-[260px] flex items-center justify-center">
        {/* ใส่รูปแผนที่ที่นี่ */}
        {/* <Image src="/map.png" alt="แผนที่" width={400} height={260} className="w-full rounded-xl" /> */}
      </div>

      {/* Hint */}
      <div className="flex items-center gap-2 px-4 py-3 text-base">
        <span className="text-xl">👆</span>
        <span>แตะบนอาคารที่ต้องการดูแผนที่ชมรม</span>
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2 px-4 py-2">
        {["ลานเทียร์", "ตึก 3", "อาคารวิศวฯ 100 ปี"].map((label) => (
          <button
            key={label}
            className="bg-white border border-gray-300 rounded-full px-5 py-2 text-base cursor-pointer hover:bg-gray-100 transition-colors"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
