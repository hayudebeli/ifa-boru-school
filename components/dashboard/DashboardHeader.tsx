"use client";

import { useSession } from "@/lib/auth-client";
import { User, Bell } from "lucide-react";
import Image from "next/image";

export default function DashboardHeader() {
  const { data: session } = useSession();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex-1" />

      <div className="flex items-center gap-6">
        <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-700 leading-tight" suppressHydrationWarning>
              {session?.user?.name || "Admin User"}
            </p>
            <p className="text-xs text-gray-500" suppressHydrationWarning>
              {session?.user?.email || ""}
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#1a3a8f] text-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm border-2 border-white ring-1 ring-gray-100">
            {session?.user?.image ? (
              <Image src={session.user.image} alt="User" width={36} height={36} className="object-cover" />
            ) : (
              <User className="w-5 h-5" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
