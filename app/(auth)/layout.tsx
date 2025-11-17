// app/(auth)/layout.tsx
import React from "react";

export const metadata = {
  title: "Login - Manajemen Produk",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
