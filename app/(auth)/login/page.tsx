"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/Store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const schema = z.object({
  username: z.string().min(1, "Username wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
});

type LoginFormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await login(data.username, data.password);
      setToken(res.token);
      router.push("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert("Login gagal: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h1>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Username
          </label>
          <Input
            placeholder="Masukkan username"
            {...register("username")}
            className="focus:ring-blue-400 focus:border-blue-400"
          />
          {errors.username?.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="mb-4 relative">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Password
          </label>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Masukkan password"
            {...register("password")}
            className="focus:ring-blue-400 focus:border-blue-400 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.password?.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 transition"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
