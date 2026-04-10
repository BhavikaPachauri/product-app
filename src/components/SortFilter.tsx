"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  defaultValue?: string;
}

export default function SortFilter({ defaultValue = "" }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const isActive = defaultValue !== "";

  return (
    <div className="relative w-full group">
      {/* Sort icon */}
      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
        <svg
          className={`w-4 h-4 transition-colors duration-200 ${
            isActive ? "text-emerald-500" : "text-gray-400 group-focus-within:text-emerald-500"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            d="M3 8h18M7 12h10M11 16h2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 3l3 3-3 3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={isActive && defaultValue === "high" ? "opacity-100" : "opacity-40"}
          />
        </svg>
      </div>

      <select
        value={defaultValue}
        onChange={handleChange}
        className={`
          w-full pl-10 pr-10 py-2.5
          text-sm bg-white
          border rounded-xl
          appearance-none cursor-pointer
          outline-none
          transition-all duration-200
          hover:border-gray-300 hover:shadow
          focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100
          shadow-sm
          ${
            isActive
              ? "border-emerald-400 text-emerald-700 ring-2 ring-emerald-100"
              : "border-gray-200 text-gray-500"
          }
        `}
      >
        <option value="">Sort by price</option>
        <option value="low">Price: low to high</option>
        <option value="high">Price: high to low</option>
      </select>

      {/* Chevron */}
      <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none">
        <svg
          className={`w-4 h-4 transition-colors duration-200 ${
            isActive ? "text-emerald-500" : "text-gray-400 group-focus-within:text-emerald-500"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

    </div>
  );
}