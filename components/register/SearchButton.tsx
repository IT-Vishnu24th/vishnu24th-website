type SearchButtonProps = {
  onClick: () => void;
};

export default function SearchButton({
  onClick,
}: SearchButtonProps) {
  return (
    <div className="mt-12 flex justify-center">
      <button
        onClick={onClick}
        className="flex items-center gap-2 rounded-full bg-gray-200 px-6 py-3 text-sm font-medium shadow-sm transition hover:bg-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="black"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>

        ค้นหาด้วยเลขนิสิต
      </button>
    </div>
  );
}