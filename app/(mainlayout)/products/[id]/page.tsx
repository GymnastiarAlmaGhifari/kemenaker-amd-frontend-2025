"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchProducts, updateProduct } from "@/lib/products";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProducts();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const prod = data.products.find((p: any) => p.id === id);
      if (!prod) return router.push("/products");
      setTitle(prod.title);
      setPrice(prod.price);
      setDescription(prod.description);
      setPreview(prod.images?.[0] || null);
    };
    loadProduct();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !description) {
      alert("Please fill all required fields!");
      return;
    }
    setLoading(true);
    try {
      const data = {
        title,
        price,
        description,
        images: image ? [preview] : preview ? [preview] : [],
      };
      await updateProduct(id, data);
      router.push("/products");
    } catch (err) {
      console.error(err);
      alert("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Edit Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="title">Name *</Label>
            <Input
              id="title"
              placeholder="Enter product name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="price">Price *</Label>
            <Input
              id="price"
              type="number"
              placeholder="Enter product price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="image">Image (optional)</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1"
            />
            {preview && (
              <div className="mt-3">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-xl border border-gray-200 shadow-sm"
                />
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full py-3 mt-4 bg-yellow-400 hover:bg-yellow-500 text-white text-lg font-semibold transition-all"
            disabled={loading}
          >
            {loading ? "Saving..." : "Update Product"}
          </Button>
        </form>
      </div>
    </div>
  );
}
