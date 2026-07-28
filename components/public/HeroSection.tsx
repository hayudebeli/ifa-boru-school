"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const defaultSlides = [
  {
    image: "/school-photos/ifa_group_amphitheater.jpg",
    title: "Excellence in Education",
    subtitle: "Shaping Tomorrow's Leaders Today at Ifa Boru Boarding School",
    cta: { label: "Learn More", href: "/about" },
  },
  {
    image: "/school-photos/ifa_building_dorm.jpg",
    title: "A Community of Achievers",
    subtitle: "Join hundreds of students thriving at Ifa Boru Boarding School Haramaya",
    cta: { label: "View Achievements", href: "/achievements" },
  },
  {
    image: "/school-photos/ifa_courtyard_students.jpg",
    title: "World-Class Boarding Experience",
    subtitle: "Safe, nurturing environment for holistic academic & personal growth",
    cta: { label: "Our Vision", href: "/vision-mission" },
  },
];

import { useLanguage } from "@/lib/language-context";

interface HeroProps {
  heroImages?: string[];
  slides?: { image: string; title: string; subtitle: string; cta: { label: string; href: string } }[];
}

export default function HeroSection({ heroImages, slides: customSlides }: HeroProps) {
  const { t, language } = useLanguage();

  const translatedDefaultSlides = [
    {
      image: "/school-photos/ifa_group_amphitheater.jpg",
      title: t("heroTitle1"),
      subtitle: t("heroSub1"),
      cta: { label: t("btnLearnMore"), href: "/about" },
    },
    {
      image: "/school-photos/ifa_building_dorm.jpg",
      title: t("heroTitle2"),
      subtitle: t("heroSub2"),
      cta: { label: t("btnViewAchievements"), href: "/achievements" },
    },
    {
      image: "/school-photos/ifa_courtyard_students.jpg",
      title: t("heroTitle3"),
      subtitle: t("heroSub3"),
      cta: { label: t("btnOurVision"), href: "/vision-mission" },
    },
  ];

  const dynamicSlides = heroImages && heroImages.length > 0
    ? heroImages.map((img, idx) => ({
        image: img,
        title: idx === 0 ? t("heroTitle1") : idx === 1 ? t("heroTitle2") : t("heroTitle3"),
        subtitle: idx === 0 ? t("heroSub1") : idx === 1 ? t("heroSub2") : t("heroSub3"),
        cta: { label: idx === 0 ? t("btnLearnMore") : idx === 1 ? t("btnViewAchievements") : t("btnOurVision"), href: idx === 0 ? "/about" : idx === 1 ? "/achievements" : "/vision-mission" },
      }))
    : customSlides || translatedDefaultSlides;

  const slides = dynamicSlides;
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning]
  );

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo, slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[680px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={i === 0}
          />
          {/* Overlay */}
          <div className="absolute inset-0 hero-overlay" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="max-w-2xl">
                {/* School name badge */}
                <div className="inline-flex items-center gap-2 bg-[#f97316]/20 border border-[#f97316]/40 rounded-full px-4 py-1.5 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse" />
                  <span className="text-white text-xs font-medium">
                    {t("schoolBadge")}
                  </span>
                </div>

                <h1
                  className={`text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 transition-all duration-700 ${
                    i === current ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  {slide.title}
                </h1>

                <p
                  className={`text-lg md:text-xl text-blue-100 mb-6 max-w-xl leading-relaxed transition-all duration-700 delay-100 ${
                    i === current ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  {slide.subtitle}
                </p>

                <div className={`flex items-center gap-4 transition-all duration-700 delay-200 ${
                  i === current ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}>
                  <Link
                    href={slide.cta.href}
                    className="inline-flex items-center gap-2 bg-[#f97316] hover:bg-[#ea6d0a] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 group"
                  >
                    {slide.cta.label}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg border border-white/30 transition-all duration-200 backdrop-blur-sm"
                  >
                    {t("btnContactUs")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 border border-white/30 text-white flex items-center justify-center backdrop-blur-sm transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 border border-white/30 text-white flex items-center justify-center backdrop-blur-sm transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-8 h-2 bg-[#f97316]" : "w-2 h-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
