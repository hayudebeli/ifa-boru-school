"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Newspaper,
  Bell,
  Trophy,
  Briefcase,
  BarChart2,
  Image as ImageIcon,
  Building,
  Settings,
  LogOut,
} from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/news", label: "News", icon: Newspaper },
  { href: "/dashboard/announcements", label: "Announcements", icon: Bell },
  { href: "/dashboard/achievements", label: "Achievements", icon: Trophy },
  { href: "/dashboard/jobs", label: "Job Vacancies", icon: Briefcase },
  { href: "/dashboard/statistics", label: "Statistics", icon: BarChart2 },
  { href: "/dashboard/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/dashboard/school-info", label: "School Info", icon: Building },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <aside className="fixed inset-y-0 left-0 bg-[#0f2560] w-64 text-white flex flex-col z-40 shadow-xl overflow-y-auto">
      {/* Brand */}
      <div className="flex items-center gap-3 p-6 border-b border-white/10 shrink-0">
        <div className="w-10 h-10 bg-white rounded-full p-0.5 relative shrink-0">
          <Image src="/logo.png?v=2" alt="Logo" fill unoptimized className="object-contain" />
        </div>
        <div>
          <p className="font-bold text-sm leading-tight text-white">Ifa Boru</p>
          <p className="text-xs text-[#f97316]">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#1a3a8f] text-white"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-[#f97316]" : "text-gray-400"}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-white/10 shrink-0">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-5 h-5 opacity-70" />
          Logout
        </button>
      </div>
    </aside>
  );
}
