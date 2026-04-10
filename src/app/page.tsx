import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import Pagination from "@/components/Pagination";
import SortFilter from "@/components/SortFilter";

const ITEMS_PER_PAGE = 8;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    category?: string;
    sort?: string; 
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const products = await getProducts();

  const search = params.search?.toLowerCase() || "";
  const category = params.category || "";
  const sort = params.sort || ""; 
  const page = Number(params.page || 1);

  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search);

    const matchesCategory =
      !category || product.category === category;

    return matchesSearch && matchesCategory;
  });


  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  const totalPages = Math.ceil(
    filteredProducts.length / ITEMS_PER_PAGE
  );

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Products</h1>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <SearchBar />

        <CategoryFilter
          categories={categories}
          defaultValue={category}
        />

   
        <SortFilter defaultValue={sort} />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        search={search}
        category={category}
        sort={sort} 
      />
    </main>
  );
}