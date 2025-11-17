"use client";

import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Redirect jika tidak ada token
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }

  // Derived page title langsung dari pathname
  let pageTitle = "Dashboard";
  if (pathname.includes("/products/add")) pageTitle = "Add Product";
  else if (pathname.includes("/products/") && pathname !== "/products")
    pageTitle = "Edit Product";
  else if (pathname.includes("/products")) pageTitle = "Products";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-blue-500 text-white p-4 shadow flex justify-between items-center">
        <h1 className="text-xl font-bold">{pageTitle}</h1>
        <button
          onClick={() => router.back()}
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded transition"
        >
          Back
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
