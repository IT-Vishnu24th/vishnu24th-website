"use client";

import { useState } from "react";

type Props = {
  onClose: () => void;
  onSearch: (studentId: string) => void;
};

export default function SearchModal({ onClose, onSearch }: Props) {
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!studentId.trim()) return;

    setLoading(true);
    await onSearch(studentId);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800">
          ค้นหาจุดลงทะเบียน
        </h2>

        {/* Input */}
        <input
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="กรอกรหัสนิสิต"
          className="mt-4 w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
        />

        {/* Buttons */}
        <div className="mt-6 flex gap-3">

          <button
            onClick={onClose}
            className="flex-1 rounded-lg bg-gray-200 py-2 transition hover:bg-gray-300"
          >
            ยกเลิก
          </button>

          <button
            onClick={handleSearch}
            disabled={loading}
            className="flex-1 rounded-lg bg-black py-2 text-white transition hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "กำลังค้นหา..." : "ค้นหา"}
          </button>

        </div>

      </div>
    </div>
  );
}