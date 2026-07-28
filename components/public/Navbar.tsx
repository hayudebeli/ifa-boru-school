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
            
            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <a
                href={schoolInfo?.facebook || "https://www.facebook.com/61588790410182/posts/122099072523293013/?app=fbl"}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook Page"
                className="w-6 h-6 rounded-full bg-[#1877f2] flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
              >
                <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={schoolInfo?.telegram || "https://t.me/+Dz7TPl163oFhODY0"}
                target="_blank"
                rel="noopener noreferrer"
                title="Telegram Channel"
                className="w-6 h-6 rounded-full bg-[#229ed9] flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
              >
                <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </a>
            </div>

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
