"use client";

import { useState } from "react";

import Header from "../../components/register/Header";
import Hero from "../../components/register/Hero";
import SearchButton from "../../components/register/SearchButton";
import SearchModal from "../../components/register/SearchModal";
import ResultView from "../../components/register/ResultView";

type LocationData = {
  name: string;
  image: string;
  lat: number;
  lng: number;
};

export default function RegisterPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 🧪 TEMP MOCK (replace with backend later)
  const handleSearch = async (studentId: string) => {
    setLoading(true);
    setError(null);

    setTimeout(() => {
      setLocationData({
        name: "ตึก 100 ปี",
        image:
          "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
        lat: 13.7367,
        lng: 100.5231,
      });

      setLoading(false);
      setIsModalOpen(false);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col bg-white shadow-lg md:flex-row">

        {/* LEFT SIDE */}
        <div className="flex w-full flex-col px-4 py-6 md:w-1/2 md:px-6">
          <Header />
          <Hero />

          <div className="mt-auto">
            <SearchButton onClick={() => setIsModalOpen(true)} />
          </div>

          {error && (
            <p className="mt-4 text-center text-sm text-red-500">
              {error}
            </p>
          )}

          {loading && (
            <p className="mt-4 text-center text-sm text-gray-500">
              Searching location...
            </p>
          )}
        </div>

        {/* RIGHT SIDE (desktop only) */}
        <div className="hidden w-full bg-gray-100 p-4 md:flex md:w-1/2">
          {!locationData ? (
            <div className="flex w-full items-center justify-center text-center text-gray-500">
              🗺️ Enter student ID to view location
            </div>
          ) : (
            <ResultView
              data={{
                ...locationData,
                pointNumber: 67,
                yann: "ยานอานาคอนดี้",
                description:
                  "โถงใต้อาคารวิศวะ 100 ปี (#11) เวลา 08:00-09:00 น.",
              }}
              onBack={() => setLocationData(null)}
            />
          )}
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <SearchModal
          onClose={() => setIsModalOpen(false)}
          onSearch={handleSearch}
        />
      )}
    </main>
  );
}