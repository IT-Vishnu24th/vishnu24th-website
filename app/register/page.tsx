"use client";

import { useState } from "react";

import Header from "../../components/register/Header";
import Hero from "../../components/register/Hero";
import SearchButton from "../../components/register/SearchButton";
import SearchModal from "../../components/register/SearchModal";

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

  const handleSearch = async (studentId: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId }),
      });

      if (!res.ok) {
        throw new Error("Student not found");
      }

      const data = await res.json();
      setLocationData(data);
      setIsModalOpen(false);
    } catch (err: any) {
      setError(err.message);
      setLocationData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col bg-white shadow-lg md:flex-row">

        {/* LEFT SIDE */}
        <div className="flex w-full flex-col px-6 py-6 md:w-1/2">
          <Header />
          <Hero />

          <div className="mt-auto">
            <SearchButton onClick={() => setIsModalOpen(true)} />
          </div>

          {/* Error */}
          {error && (
            <p className="mt-4 text-center text-sm text-red-500">
              {error}
            </p>
          )}

          {/* Loading */}
          {loading && (
            <p className="mt-4 text-center text-sm text-gray-500">
              Searching location...
            </p>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden w-full md:flex md:w-1/2 bg-gray-100 p-6">
          <div className="w-full space-y-4">

            {!locationData ? (
              <div className="flex h-full items-center justify-center text-center text-gray-500">
                🗺️
                <br />
                Enter student ID to view location
              </div>
            ) : (
              <>
                {/* Title */}
                <h2 className="text-xl font-bold text-gray-800">
                  {locationData.name}
                </h2>

                {/* Image */}
                <img
                  src={locationData.image}
                  className="w-full rounded-lg object-cover"
                  alt="location"
                />

                {/* GOOGLE MAP (PRO VERSION) */}
                <div className="w-full overflow-hidden rounded-lg">
                  <iframe
                    width="100%"
                    height="320"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${locationData.lat},${locationData.lng}&z=17&output=embed`}
                  />
                </div>
              </>
            )}

          </div>
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