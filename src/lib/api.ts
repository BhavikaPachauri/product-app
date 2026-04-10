import { Product, ProductResponse } from "@/types/product";

const BASE_URL = "https://dummyjson.com/products";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(BASE_URL, {
    next: { revalidate: 60 }, 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: ProductResponse = await res.json();
  return data.products;
}

export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Product not found");
  }

  return res.json();
}