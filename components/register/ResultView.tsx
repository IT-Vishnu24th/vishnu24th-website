"use client";

type LocationData = {
  name: string;
  image: string;
  lat: number;
  lng: number;

  pointNumber: number;
  yann: string;
  description: string;
};

type Props = {
  data: LocationData;
  onBack: () => void;
};

export default function ResultView({ data, onBack }: Props) {
  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${data.lat},${data.lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex w-full flex-col gap-5 px-4 py-4 md:px-2">

      {/* TOP BAR */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <button className="text-sm text-gray-700">
            🌐 TH / EN
          </button>

          <button
            onClick={onBack}
            className="text-sm text-gray-600 hover:text-black"
          >
            ← Back
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-sm">User</div>
          <div className="h-8 w-8 rounded-full bg-gray-300" />
        </div>
      </div>

      {/* INFO */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          จุดลงทะเบียนที่ {data.pointNumber}
        </p>
        <p className="text-sm text-gray-600">
          {data.yann}
        </p>
      </div>

      {/* TITLE */}
      <h1 className="text-center text-xl font-bold md:text-2xl">
        {data.name}
      </h1>

      {/* MAP */}
      <div className="overflow-hidden rounded-xl shadow-sm">
        <iframe
          width="100%"
          height="220"
          loading="lazy"
          className="w-full"
          src={`https://www.google.com/maps?q=${data.lat},${data.lng}&z=17&output=embed`}
        />
      </div>

      {/* IMAGE */}
      <div className="overflow-hidden rounded-xl shadow-sm">
        <img
          src={data.image}
          className="h-48 w-full object-cover"
          alt="location"
        />
      </div>

      {/* BUTTON */}
      <button
        onClick={openGoogleMaps}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-black py-4 text-white active:scale-[0.98]"
      >
        🗺️ เปิดใน Google Maps
      </button>

      {/* DESCRIPTION */}
      <p className="text-center text-sm text-gray-700">
        สามารถลงทะเบียนได้ที่ "{data.description}"
      </p>

      <p className="text-center text-xs text-gray-500">
        ตำแหน่งการลงทะเบียนของน้องแต่ละคนอาจไม่เหมือนกัน
      </p>
    </div>
  );
}