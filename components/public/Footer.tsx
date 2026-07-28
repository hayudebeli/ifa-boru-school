"use client";

import Link from "next/link";
import Image from "next/image";
import { Share2, MessageCircle, Camera, Video, Mail, Phone, MapPin, Send } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function Footer({ schoolInfo }: { schoolInfo?: any }) {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f2560] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-14 h-14 bg-white rounded-full p-1">
                <Image src="/logo.png?v=2" alt="School Logo" fill unoptimized className="object-contain" />
              </div>
              <div>
                <p className="font-bold text-white text-sm leading-tight">Ifa Boru Special</p>
                <p className="text-[#f97316] text-xs font-semibold">Boarding Secondary School</p>
                <p className="text-gray-400 text-xs">Haramaya, Ethiopia</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Excellence in Education, Character, and Community. Shaping tomorrow&apos;s leaders today.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-[#1877f2] flex items-center justify-center hover:scale-110 transition-transform">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Twitter" className="w-8 h-8 rounded-full bg-[#1da1f2] flex items-center justify-center hover:scale-110 transition-transform">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center hover:scale-110 transition-transform">
                <Camera className="w-4 h-4" />
              </a>
              <a href="#" aria-label="YouTube" className="w-8 h-8 rounded-full bg-[#ff0000] flex items-center justify-center hover:scale-110 transition-transform">
                <Video className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Telegram" className="w-8 h-8 rounded-full bg-[#229ed9] flex items-center justify-center hover:scale-110 transition-transform">
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white text-base mb-4 pb-2 border-b border-[#f97316]/40">
              {t("footerQuickLinks")}
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/about", label: t("navAbout") },
                { href: "/vision-mission", label: language === "om" ? "Muldhata Keenya" : "Vision & Mission" },
                { href: "/news", label: t("navNews") },
                { href: "/announcements", label: t("navAnnouncements") },
                { href: "/achievements", label: t("navAchievements") },
                { href: "/gallery", label: t("navGallery") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-[#f97316] text-sm transition-colors flex items-center gap-1"
                  >
                    <span className="text-[#f97316]">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academics */}
          <div>
            <h3 className="font-bold text-white text-base mb-4 pb-2 border-b border-[#f97316]/40">
              {language === "om" ? "Qabeenya" : "Resources"}
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/jobs", label: t("navJobs") },
                { href: "/statistics", label: t("navStatistics") },
                { href: "/contact", label: t("navContact") },
                { href: "/login", label: language === "om" ? "Seensa Admin" : "Admin Login" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-[#f97316] text-sm transition-colors flex items-center gap-1"
                  >
                    <span className="text-[#f97316]">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white text-base mb-4 pb-2 border-b border-[#f97316]/40">
              {t("footerContactUs")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#f97316] mt-0.5 shrink-0" />
                <span className="text-gray-300 text-sm">
                  {language === "om" ? "Haramayaa, Oromiyaa, Itoophiyaa" : (schoolInfo?.address || "Haramaya, Oromia, Ethiopia")}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#f97316] shrink-0" />
                <span className="text-gray-300 text-sm">{schoolInfo?.phone || "+251 25 XXX XXXX"}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#f97316] shrink-0" />
                <span className="text-gray-300 text-sm">{schoolInfo?.email || "info@ifaboru.edu.et"}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-gray-400 text-xs text-center sm:text-left">
            &copy; {currentYear} {t("footerRights")}
          </p>
          <p className="text-gray-500 text-xs">
            {language === "om" ? "Barnoota Olaanaa Bara 1998 irraa eegalee" : "Excellence in Education since 1998"}
          </p>
        </div>
      </div>
    </footer>
  );
}
