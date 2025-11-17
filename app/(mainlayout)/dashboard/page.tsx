"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchProducts } from "@/lib/products";
import { Button } from "@/components/ui/button";

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
    <div className="space-y-8">
      {/* Total Products Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-600">Total Products</h2>
          <p className="text-4xl font-bold text-gray-800">{totalProducts}</p>
        </div>
        <Link href="/products">
          <Button className="bg-blue-500 hover:bg-blue-600 px-6 py-2">
            Manage Products
          </Button>
        </Link>
      </div>

      {/* Latest Products */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Latest Products
        </h3>
        {latestProducts.length === 0 ? (
          <p className="text-gray-500">No products yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {latestProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden flex flex-col"
              >
                {p.images?.[0] && (
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="h-32 w-full object-cover"
                  />
                )}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-gray-800 truncate">
                      {p.title}
                    </h4>
                    <p className="text-gray-500 mt-1">${p.price}</p>
                  </div>
                  <Link
                    href={`/products/${p.id}`}
                    className="mt-3 text-sm text-blue-500 hover:underline"
                  >
                    Edit Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
