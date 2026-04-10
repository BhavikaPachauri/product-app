import Link from "next/link";

interface Props {
  currentPage: number;
  totalPages: number;
  search?: string;
  category?: string;
  sort?: string; 
}

function href(
  page: number,
  search?: string,
  category?: string,
  sort?: string
) {
  return `/?page=${page}&search=${search || ""}&category=${
    category || ""
  }&sort=${sort || ""}`;
}

export default function Pagination({
  currentPage,
  totalPages,
  search,
  category,
  sort, 
}: Props) {
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const pages: (number | "…")[] = [];
  const add = new Set<number>();

  [1, totalPages, currentPage - 1, currentPage, currentPage + 1]
    .filter((p) => p >= 1 && p <= totalPages)
    .forEach((p) => add.add(p));

  [...add].sort((a, b) => a - b).forEach((p, i, arr) => {
    if (i > 0 && p - arr[i - 1] > 1) pages.push("…");
    pages.push(p);
  });

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10">
      {/* Prev */}
      {hasPrev ? (
        <Link
          href={href(currentPage - 1, search, category, sort)}
          className="flex items-center gap-1 px-3 py-2 text-sm text-gray-500 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:text-gray-800 hover:shadow-sm transition-all duration-150"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              d="M15 18l-6-6 6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Prev
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3 py-2 text-sm text-gray-300 bg-white border border-gray-100 rounded-xl cursor-not-allowed select-none">
          Prev
        </span>
      )}

      {/* Page slots */}
      {pages.map((p, i) =>
        p === "…" ? (
          <span
            key={`gap-${i}`}
            className="px-2 py-2 text-sm text-gray-400 select-none"
          >
            …
          </span>
        ) : (
          <Link
            key={p}
            href={href(p, search, category, sort)}
            className={`min-w-[38px] px-3 py-2 text-sm text-center rounded-xl border transition-all duration-150
              ${
                currentPage === p
                  ? "bg-emerald-500 text-white border-emerald-500 shadow-sm font-medium"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm"
              }`}
          >
            {p}
          </Link>
        )
      )}

      {/* Next */}
      {hasNext ? (
        <Link
          href={href(currentPage + 1, search, category, sort)}
          className="flex items-center gap-1 px-3 py-2 text-sm text-gray-500 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:text-gray-800 hover:shadow-sm transition-all duration-150"
        >
          Next
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              d="M9 18l6-6-6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3 py-2 text-sm text-gray-300 bg-white border border-gray-100 rounded-xl cursor-not-allowed select-none">
          Next
        </span>
      )}
    </div>
  );
}