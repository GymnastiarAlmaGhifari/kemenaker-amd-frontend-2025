"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addProduct } from "@/lib/products";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AddProductPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
        images: image ? [preview] : [],
      };
      await addProduct(data);
      router.push("/products");
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Add New Product
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
            className="w-full py-3 mt-4 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold transition-all"
            disabled={loading}
          >
            {loading ? "Saving..." : "Add Product"}
          </Button>
        </form>
      </div>
    </div>
  );
}
