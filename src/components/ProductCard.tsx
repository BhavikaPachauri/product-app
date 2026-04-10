import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="group block">
      <div className="relative flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out">

        {/* Image container */}
        <div className="relative w-full h-52 bg-gray-50 overflow-hidden">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={300}
            height={220}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Category badge */}
          <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm text-gray-600 text-[11px] font-medium uppercase tracking-wide px-2.5 py-1 rounded-full border border-gray-200/60">
            {product.category}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 p-4">
          <h2 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-emerald-600 transition-colors duration-200">
            {product.title}
          </h2>

          {/* Price row */}
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
            <span className="text-lg font-bold text-emerald-600">
              ${product.price}
            </span>

           
          </div>
        </div>
      </div>
    </div>
  );
}