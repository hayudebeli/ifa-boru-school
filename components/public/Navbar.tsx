"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

interface NavbarProps {
  schoolInfo?: any;
}

export default function Navbar({ schoolInfo }: NavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const phone = schoolInfo?.phone || "+251 25 XXX XXXX";
  const email = schoolInfo?.email || "info@ifaboru.edu.et";
  const address = language === "om" ? "Haramayaa, Oromiyaa, Itoophiyaa" : (schoolInfo?.address || "Haramaya, Oromia, Ethiopia");

  const navLinks = [
    { href: "/", label: t("navHome") },
    {
      label: t("navAbout"),
      children: [
        { href: "/about", label: t("navAbout") },
        { href: "/vision-mission", label: language === "om" ? "Muldhata Keenya" : "Vision & Mission" },
      ],
    },
    { href: "/news", label: t("navNews") },
    { href: "/announcements", label: t("navAnnouncements") },
    { href: "/achievements", label: t("navAchievements") },
    { href: "/jobs", label: t("navJobs") },
    { href: "/statistics", label: t("navStatistics") },
    { href: "/gallery", label: t("navGallery") },
    { href: "/contact", label: t("navContact") },
  ];

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#0f2560] text-white text-xs py-2 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="hidden md:inline">📍 {address}</span>
          
          <div className="flex items-center gap-4 ml-auto md:ml-0">
            <span className="hidden sm:inline text-blue-200">📞 {phone} &nbsp;|&nbsp; ✉️ {email}</span>
            
            {/* Language Switcher Button */}
            <div className="flex items-center gap-1 bg-white/10 hover:bg-white/20 p-1 rounded-lg border border-white/20 transition-colors">
              <Globe className="w-3.5 h-3.5 text-[#f97316] ml-1" />
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-0.5 rounded text-xs font-semibold transition-all ${
                  language === "en" ? "bg-[#f97316] text-white shadow-sm" : "text-gray-300 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("om")}
                className={`px-2 py-0.5 rounded text-xs font-semibold transition-all ${
                  language === "om" ? "bg-[#f97316] text-white shadow-sm" : "text-gray-300 hover:text-white"
                }`}
              >
                Afaan Oromoo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-white shadow-md border-b border-gray-100"
            : "bg-white shadow-sm"
        )}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <div className="relative w-12 h-12 md:w-14 md:h-14">
                <Image
                  src="/logo.png?v=2"
                  alt="School Logo"
                  fill
                  unoptimized
                  className="object-contain"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <p className="font-bold text-[#1a3a8f] text-sm md:text-base leading-tight">
                  Ifa Boru Special
                </p>
                <p className="text-[#f97316] text-xs md:text-sm font-semibold leading-tight">
                  Boarding Secondary School
                </p>
                <p className="text-gray-500 text-xs">Haramaya</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="relative group">
                    <button
                      className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#1a3a8f] rounded-md transition-colors"
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === link.label ? null : link.label
                        )
                      }
                    >
                      {link.label}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#1a3a8f] hover:text-white first:rounded-t-lg last:rounded-b-lg transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href!}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#1a3a8f] rounded-md transition-colors hover:bg-blue-50"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <nav className="px-4 py-2 space-y-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <p className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      {link.label}
                    </p>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block pl-6 pr-3 py-2 text-sm text-gray-700 hover:text-[#1a3a8f] hover:bg-blue-50 rounded-md"
                        onClick={() => setIsOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href!}
                    className="block px-3 py-2 text-sm text-gray-700 hover:text-[#1a3a8f] hover:bg-blue-50 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
