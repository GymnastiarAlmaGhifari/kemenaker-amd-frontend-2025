// app/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white px-4 text-center">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Selamat Datang!</h1>
      <p className="text-lg text-gray-700 mb-6 max-w-md">
        Saya <span className="font-semibold">Gymnastiar Alma Ghifari </span>
        dari Madiun, sekolah di Politeknik Negeri Jember. Ini adalah test
        Frontend Developer Next.js saya.
      </p>
      <Link href="/login">
        <Button className="bg-blue-500 hover:bg-blue-600 px-8 py-3 text-lg">
          Login
        </Button>
      </Link>
    </div>
  );
}
