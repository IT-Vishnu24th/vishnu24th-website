"use client";

import { useState } from "react";

type Props = {
  onClose: () => void;
  onSearch: (studentId: string) => void;
};

export default function SearchModal({ onClose, onSearch }: Props) {
  const [studentId, setStudentId] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 px-4">
      
      {/* Modal Box */}
      <div className="w-full max-w-sm rounded-2xl bg-gray-100 p-6 shadow-xl">

        {/* Icon */}
        <div className="flex justify-center">
          <div className="text-2xl">🔍</div>
        </div>

        {/* Title */}
        <h2 className="mt-3 text-center text-2xl font-bold text-black">
          ค้นหาด้วยเลขนิสิต
        </h2>

        {/* Subtitle */}
        <p className="mt-2 text-center text-sm text-gray-600 leading-relaxed">
          กรอกเลขประจำตัวนิสิต 10 หลัก เพื่อดูจุดลงทะเบียนสำหรับค่ายวิษณุ
        </p>

        {/* Input */}
        <input
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="69XXXXXX21"
          className="mt-5 w-full rounded-lg bg-white px-4 py-3 text-sm text-black placeholder-gray-400 outline-none"
        />

        {/* Button */}
        <button
          onClick={() => onSearch(studentId)}
          className="mt-5 w-full rounded-full bg-black py-3 text-white font-medium hover:bg-gray-900 transition"
        >
          ยืนยัน
        </button>

        {/* Optional Close (tap outside is still possible, but this helps UX) */}
        <button
          onClick={onClose}
          className="mt-4 w-full text-xs text-gray-500 hover:text-black"
        >
          ปิด
        </button>

      </div>
    </div>
  );
}