export default function Hero() {
  return (
    <section className="flex flex-col items-center px-8 pt-20 text-center">
      {/* Location Icon */}
      <div className="mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="72"
          height="72"
          viewBox="0 0 24 24"
          fill="black"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/>
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold leading-tight text-black">
        เข้าสู่ระบบเพื่อดู
        <br />
        จุดลงทะเบียนของน้อง
      </h1>

      {/* Description */}
      <p className="mt-6 max-w-sm text-lg leading-8 text-gray-600">
        ตำแหน่งการลงทะเบียนของน้อง
        <br />
        แต่ละคนอาจไม่เหมือนกัน
      </p>
    </section>
  );
}