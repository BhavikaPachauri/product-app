"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  categories: string[];
  defaultValue?: string;
}

export default function CategoryFilter({
  categories,
  defaultValue = "",
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }

    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const isFiltered = defaultValue !== "";

  return (
    <div className="relative w-full group">
      {/* Filter icon */}
      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
        <svg
          className={`w-4 h-4 transition-colors duration-200 ${
            isFiltered
              ? "text-emerald-500"
              : "text-gray-400 group-focus-within:text-emerald-500"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            d="M3 6h18M7 12h10M11 18h2"
            strokeLinecap="round"
            strokeLinejoin="round"
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
            isFiltered
              ? "border-emerald-400 text-emerald-700 ring-2 ring-emerald-100"
              : "border-gray-200 text-gray-500"
          }
        `}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {/* Capitalize first letter */}
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>

      {/* Chevron icon */}
      <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none">
        <svg
          className={`w-4 h-4 transition-colors duration-200 ${
            isFiltered
              ? "text-emerald-500"
              : "text-gray-400 group-focus-within:text-emerald-500"
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