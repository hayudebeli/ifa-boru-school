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
              <a
                href={schoolInfo?.facebook || "https://www.facebook.com/61588790410182/posts/122099072523293013/?app=fbl"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#1877f2] flex items-center justify-center hover:scale-110 transition-transform shadow-md"
              >
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={schoolInfo?.telegram || "https://t.me/+Dz7TPl163oFhODY0"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="w-9 h-9 rounded-full bg-[#229ed9] flex items-center justify-center hover:scale-110 transition-transform shadow-md"
              >
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
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
            {language === "om" ? "Barnoota Olaanaa Bara 2014 irraa eegalee" : "Excellence in Education since 2014 EC / 2022 GC"}
          </p>
        </div>
      </div>
    </footer>
  );
}
