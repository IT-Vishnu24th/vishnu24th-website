export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-5">
      {/* Language Button */}
      <button className="flex items-center gap-2 rounded-full bg-[#2D2D2D] px-4 py-2 text-white transition hover:bg-black">
        <span className="text-lg">🌐</span>
        <span className="text-sm font-medium">TH</span>
      </button>

      {/* Login Button */}
      <button className="rounded-full bg-[#2D2D2D] px-5 py-2 text-sm font-medium text-white transition hover:bg-black">
        เข้าสู่ระบบ
      </button>
    </header>
  );
}