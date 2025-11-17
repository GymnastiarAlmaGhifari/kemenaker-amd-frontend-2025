'use client'

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MainLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-500 text-white p-4 font-bold">
        Dashboard
      </header>
      <main className="p-6 flex-1">{children}</main>
    </div>
  );
}
