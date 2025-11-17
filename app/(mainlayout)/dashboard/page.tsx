"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchProducts } from "@/lib/products";

export default function DashboardPage() {
  const [totalProducts, setTotalProducts] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [latestProducts, setLatestProducts] = useState<any[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setTotalProducts(data.total);
      setLatestProducts(data.products.slice(-5).reverse());
    };
    loadProducts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded shadow flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-3xl font-bold">{totalProducts}</p>
        </div>
        <Link
          href="/products"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Manage Products
        </Link>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Latest Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {latestProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition"
            >
              <h4 className="font-bold">{p.title}</h4>
              <p className="text-gray-500">${p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
