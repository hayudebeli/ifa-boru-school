"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, GraduationCap, BookOpen, Award, Briefcase, Calendar, ChevronRight } from "lucide-react";
import HeroSection from "@/components/public/HeroSection";
import NewsCard from "@/components/public/NewsCard";
import AchievementCard from "@/components/public/AchievementCard";
import JobCard from "@/components/public/JobCard";
import StatCard from "@/components/public/StatCard";
import { formatDateShort } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

interface HomeClientContentProps {
  news: any[];
  achievements: any[];
  openJobs: any[];
  statistics: any;
  schoolInfo: any;
  announcements: any[];
  gallery: any[];
}

export default function HomeClientContent({
  news,
  achievements,
  openJobs,
  statistics,
  schoolInfo,
  announcements,
  gallery,
}: HomeClientContentProps) {
  const { t, language } = useLanguage();

  const latestNews = news.slice(0, 3);
  const sideNews = news.slice(3, 6);
  const galleryPreview = gallery.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <HeroSection heroImages={schoolInfo?.heroImages} />

      {/* Quick Links Bar */}
      <div className="bg-[#1a3a8f] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
            {[
              { icon: BookOpen, label: t("quickAcademics"), href: "/about" },
              { icon: Award, label: t("quickAchievements"), href: "/achievements" },
              { icon: Users, label: t("quickCommunity"), href: "/about" },
              { icon: Briefcase, label: t("quickCareers"), href: "/jobs" },
            ].map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                className="flex flex-col items-center gap-2 py-4 px-4 hover:bg-white/10 transition-colors group"
              >
                <Icon className="w-6 h-6 text-[#f97316] group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Main content (2/3) */}
            <div className="lg:col-span-2 space-y-8">
              {/* School Intro / Welcome */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <p className="text-[#f97316] font-semibold text-sm mb-1">{t("welcomeBadge")}</p>
                    <h2 className="text-2xl font-extrabold text-[#0f2560] leading-tight mb-3">
                      {t("welcomeTitle")}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {language === "om"
                        ? (schoolInfo?.aboutOm?.replace(/<[^>]*>?/gm, "").slice(0, 300) ||
                           schoolInfo?.about?.replace(/<[^>]*>?/gm, "").slice(0, 300) ||
                           "Mana Barumsa Sadarkaa 2ffaa Addaa Bultii Ifa Boruu Haramayaatti magaalaa Haramayaa, Oromiyaa, Itoophiyaatti kan argamudha...")
                        : (schoolInfo?.about?.replace(/<[^>]*>?/gm, "").slice(0, 300) ||
                           "We are committed to providing quality education that empowers students to excel academically, develop strong character, and contribute positively to their communities...")}
                      ...
                    </p>
                    <Link
                      href="/about"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a3a8f] hover:text-[#f97316] transition-colors"
                    >
                      {t("readMore")} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="relative h-48 rounded-xl overflow-hidden">
                    <Image
                      src={schoolInfo?.introImage || "/school-photos/ifa_building_dorm.jpg"}
                      alt="School building"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* News Section */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-xl font-extrabold text-[#0f2560] section-title-left">
                      {t("sectionNews")}
                    </h2>
                  </div>
                  <Link
                    href="/news"
                    className="text-sm font-semibold text-[#1a3a8f] hover:text-[#f97316] flex items-center gap-1 transition-colors"
                  >
                    {t("viewAll")} <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  {latestNews.length > 0 ? (
                    latestNews.map((item) => (
                      <NewsCard key={item.id} {...item} author={item.author} />
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm col-span-2">
                      {language === "om" ? "Oduun tokkollee hin maxxanfamne." : "No news published yet."}
                    </p>
                  )}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-xl font-extrabold text-[#0f2560] section-title-left">
                      {t("sectionAchievements")}
                    </h2>
                  </div>
                  <Link
                    href="/achievements"
                    className="text-sm font-semibold text-[#1a3a8f] hover:text-[#f97316] flex items-center gap-1 transition-colors"
                  >
                    {t("viewAll")} <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {achievements.length > 0 ? (
                    achievements.map((a) => <AchievementCard key={a.id} {...a} />)
                  ) : (
                    <p className="text-gray-400 text-sm">
                      {language === "om" ? "Milkaa'ini hin galmeeffamne." : "No achievements yet."}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Sidebar (1/3) */}
            <div className="space-y-6">
              {/* Quick Links */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-bold text-[#0f2560] text-base mb-3 pb-2 border-b border-gray-100 section-title-left">
                  {t("sectionQuickLinks")}
                </h3>
                <ul className="space-y-1.5">
                  {[
                    { href: "/about", label: t("navAbout") },
                    { href: "/vision-mission", label: language === "om" ? "Muldhata Keenya" : "Vision & Mission" },
                    { href: "/news", label: t("sectionNews") },
                    { href: "/achievements", label: t("quickAchievements") },
                    { href: "/statistics", label: t("sectionStats") },
                    { href: "/gallery", label: t("sectionGallery") },
                    { href: "/jobs", label: t("sectionJobs") },
                    { href: "/contact", label: t("navContact") },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#1a3a8f] hover:bg-blue-50 px-2 py-1.5 rounded-md transition-colors"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-[#f97316]" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Announcements */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                  <h3 className="font-bold text-[#0f2560] text-base section-title-left">
                    {t("sectionAnnouncements")}
                  </h3>
                  <Link href="/announcements" className="text-xs text-[#1a3a8f] hover:text-[#f97316]">
                    {t("seeAll")}
                  </Link>
                </div>
                {announcements.slice(0, 4).length > 0 ? (
                  <div className="space-y-3">
                    {announcements.slice(0, 4).map((ann) => (
                      <div key={ann.id} className="p-3 bg-blue-50 border-l-4 border-[#1a3a8f] rounded-r-lg">
                        <p className="font-semibold text-sm text-[#0f2560] leading-snug">
                          {ann.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDateShort(ann.publishedAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-xs">
                    {language === "om" ? "Beeksisi tokkollee hin jiru." : "No announcements yet."}
                  </p>
                )}
              </div>

              {/* Job Vacancies sidebar */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#f97316]/20">
                  <h3 className="font-bold text-[#0f2560] text-base section-title-left">
                    {t("sectionJobs")}
                  </h3>
                  <Link href="/jobs" className="text-xs text-[#1a3a8f] hover:text-[#f97316]">
                    {t("seeAll")}
                  </Link>
                </div>
                {openJobs.slice(0, 3).length > 0 ? (
                  <div className="space-y-2">
                    {openJobs.slice(0, 3).map((job) => (
                      <JobCard key={job.id} {...job} compact />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-xs">
                    {language === "om" ? "Banjama carraa hojii hin jiru." : "No open positions currently."}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Statistics */}
      {statistics && (
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0f2560] section-title">
                {t("sectionStats")}
              </h2>
              <p className="text-gray-500 mt-4 text-sm">
                {t("statsSub")}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <StatCard icon={Users} value={statistics.totalStudents} label={t("statTotalStudents")} color="blue" />
              <StatCard icon={Users} value={statistics.boys} label={t("statBoys")} color="blue" />
              <StatCard icon={Users} value={statistics.girls} label={t("statGirls")} color="orange" />
              <StatCard icon={GraduationCap} value={statistics.teachers} label={t("statTeachers")} color="green" />
              <StatCard icon={Users} value={statistics.staff} label={t("statStaff")} color="purple" />
              <StatCard icon={Award} value={statistics.graduationRate} label={t("statGraduationRate")} color="orange" suffix="%" />
              <StatCard icon={Calendar} value={statistics.yearEstablished} label={t("statEstYear")} color="blue" />
            </div>
          </div>
        </section>
      )}

      {/* Gallery Preview */}
      {galleryPreview.length > 0 && (
        <section className="py-14 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-extrabold text-[#0f2560] section-title-left">
                  {t("sectionGallery")}
                </h2>
              </div>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a3a8f] hover:text-[#f97316] transition-colors"
              >
                {t("viewAllPhotos")} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {galleryPreview.map((item) => (
                <Link key={item.id} href="/gallery" className="group relative h-40 md:h-52 rounded-xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#0f2560]/0 group-hover:bg-[#0f2560]/40 transition-all duration-300 flex items-end p-3">
                    <p className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                      {item.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="py-14 bg-gradient-to-r from-[#0f2560] via-[#1a3a8f] to-[#0f2560] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#f97316] blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white blur-2xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
            {t("ctaTitle")}
          </h2>
          <p className="text-blue-200 mb-6 text-sm max-w-xl mx-auto">
            {t("ctaDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#f97316] hover:bg-[#ea6d0a] text-white font-semibold px-8 py-3 rounded-lg transition-all hover:shadow-lg hover:shadow-orange-500/30"
            >
              {t("btnContactUs")} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-lg border border-white/30 transition-all backdrop-blur-sm"
            >
              {t("btnLearnMore")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
