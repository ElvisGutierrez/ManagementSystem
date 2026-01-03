const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 bg-[#2b2738] flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <svg
          className="animate-spin h-10 w-10 text-[#6e54b5]"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>

        <p className="text-white text-lg">Cargando...</p>
      </div>
    </div>
  );
};

export default FullScreenLoader;
