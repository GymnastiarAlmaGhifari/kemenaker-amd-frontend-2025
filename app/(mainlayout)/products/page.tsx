"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images?: string[];
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data.products);
        setFilteredProducts(res.data.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [search, products]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure to delete this product?")) return;
    axios.delete(`/api/products/${id}`).then(() => {
      setProducts(products.filter((prod) => prod.id !== id));
    });
  };

  return (
    <div className="space-y-6 px-4 md:px-8 py-6">
      {/* Header + Add Product */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Products</h2>
        <Link href="/products/add">
          <Button variant="default">Add Product</Button>
        </Link>
      </div>

      {/* Search Input */}
      <Input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      {loading ? (
        <p className="text-center text-gray-500 mt-8">Loading...</p>
      ) : currentItems.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentItems.map((p) => (
            <Card key={p.id} className="hover:shadow-xl transition rounded-xl">
              {p.images?.[0] && (
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              )}
              <CardHeader className="pt-4 px-4">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="text-green-600 font-bold mt-1">${p.price}</p>
              </CardHeader>
              <CardContent className="px-4">
                <p className="text-gray-600 text-sm line-clamp-3">
                  {p.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between px-4 pb-4">
                <Link href={`/products/${p.id}`}>
                  <Button variant="secondary" size="sm">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <Button
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              size="sm"
              variant={page === currentPage ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
