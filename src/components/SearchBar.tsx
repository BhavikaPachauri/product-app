"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialValue = useMemo(() => searchParams.get("search") || "", []);
  const [search, setSearch] = useState(initialValue);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => {
      setIsTyping(false);

      const params = new URLSearchParams(searchParams.toString());
      const current = searchParams.get("search") || "";
      const next = search.trim();

      if (current === next) return;

      if (next) {
        params.set("search", next);
      } else {
        params.delete("search");
      }

      params.delete("page");
      router.replace(`${pathname}?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, router, pathname]);

  return (
    <div className="relative w-full group">
      {/* Search icon */}
      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
        {isTyping ? (
        
          <svg
            className="w-4 h-4 text-emerald-500 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor" strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        ) : (
          /* Static search icon */
          <svg
            className="w-4 h-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-200"
            fill="none" stroke="currentColor"
            strokeWidth="2" viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
        )}
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="
          w-full pl-10 pr-10 py-2.5
          text-sm text-gray-800 placeholder-gray-400
          bg-white border border-gray-200
          rounded-xl
          outline-none
          transition-all duration-200
          hover:border-gray-300
          focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100
          shadow-sm hover:shadow
        "
      />

      {/* Clear button */}
      {search && (
        <button
          onClick={() => setSearch("")}
          className="absolute inset-y-0 right-3 flex items-center text-gray-300 hover:text-gray-500 transition-colors duration-150"
          aria-label="Clear search"
        >
          <svg
            className="w-4 h-4"
            fill="none" stroke="currentColor"
            strokeWidth="2" viewBox="0 0 24 24"
          >
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}