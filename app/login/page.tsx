"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, Mail, AlertCircle, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/lib/validations";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError(null);
    try {
      const { data: resData, error: authError } = await signIn.email({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        setError(authError.message || "Invalid email or password");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: any) {
      setError(err?.message || "Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1a3a8f]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#f97316]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link href="/" className="flex items-center gap-3 justify-center mb-6 hover:opacity-80 transition-opacity">
          <div className="relative w-16 h-16 bg-white rounded-full p-1 shadow-sm border border-gray-100">
            <Image src="/logo.png?v=2" alt="School Logo" fill unoptimized className="object-contain" priority />
          </div>
          <div className="text-left hidden sm:block">
            <p className="font-bold text-[#1a3a8f] leading-tight">Ifa Boru</p>
            <p className="text-[#f97316] text-xs font-semibold">Boarding School</p>
          </div>
        </Link>
        <h2 className="text-center text-2xl font-extrabold text-gray-900 mb-2">
          Admin Portal
        </h2>
        <p className="text-center text-sm text-gray-500 mb-8">
          Sign in to manage website content
        </p>

        <div className="bg-white py-8 px-4 shadow-xl shadow-[#1a3a8f]/5 sm:rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-start gap-2 border border-red-100">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("email")}
                  type="email"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#1a3a8f] focus:border-[#1a3a8f] text-sm"
                  placeholder="admin@ifaboru.edu.et"
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("password")}
                  type="password"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#1a3a8f] focus:border-[#1a3a8f] text-sm"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#1a3a8f] hover:bg-[#0f2560] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a3a8f] disabled:opacity-70 transition-colors"
              >
                {loading ? "Signing in..." : "Sign in to Dashboard"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#f97316] transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
