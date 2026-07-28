"use client";

import Image from "next/image";
import { Target, Globe } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

interface AboutClientContentProps {
  schoolInfo: any;
  statistics: any;
}

export default function AboutClientContent({ schoolInfo, statistics }: AboutClientContentProps) {
  const { t, language } = useLanguage();

  const aboutText = language === "om"
    ? (schoolInfo?.aboutOm || schoolInfo?.about || "Mana Barumsa Sadarkaa 2ffaa Addaa Bultii Ifa Boruu Haramayaatti magaalaa Haramayaa, Oromiyaa, Itoophiyaatti kan argamudha. Barnoota qulqullina qabu kennuudhaan barattoota keenya guddina barnootaa fi amala cimaatiin ijaaruuf kutannoodhaan hojjenna.")
    : (schoolInfo?.about || "Haramaya Ifa Boru Special Boarding Secondary School is a premier educational institution located in Haramaya, Oromia, Ethiopia. We are committed to providing quality education that empowers students to excel academically, develop strong character, and contribute positively to their communities.");

  const visionText = language === "om"
    ? (schoolInfo?.visionOm || schoolInfo?.vision || "Mana barumsa sadarkaa 2ffaa addaa barnoota olaanaa, hoogganummaa fi guddina amalaatiif Haramayaa, Oromiyaatti tajaajilu ta'uu.")
    : (schoolInfo?.vision || "To be a leading center of excellence in secondary education, nurturing well-rounded individuals who are academically distinguished, morally upright, and socially responsible.");

  const missionText = language === "om"
    ? (schoolInfo?.missionOm || schoolInfo?.mission || "Barnoota qulqullina qabu haala mijeessaa fi nageenya qabuun barattootaaf kennuu.")
    : (schoolInfo?.mission || "To provide a holistic, high-quality education in a safe and supportive boarding environment that challenges students to reach their full potential, fosters critical thinking, and instills values of integrity, discipline, and service.");

  return (
    <div>
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#0f2560] to-[#1a3a8f] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#f97316] font-semibold text-sm mb-2">{t("navAbout")}</p>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
            Ifa Boru Special Boarding<br />Secondary School
          </h1>
          <p className="text-blue-200 mt-3 text-sm">
            {language === "om" ? "Haramayaa, Oromiyaa, Itoophiyaa" : "Haramaya, Oromia, Ethiopia"}
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200 py-2 px-4">
        <div className="max-w-7xl mx-auto text-xs text-gray-500">
          {t("navHome")} › {t("navAbout")}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0f2560] mb-4 section-title-left">
              {language === "om" ? "Eenyummaa Keenya" : "Who We Are"}
            </h2>
            <div
              className="prose prose-gray max-w-none text-gray-600 text-sm leading-relaxed space-y-3"
              dangerouslySetInnerHTML={{ __html: aboutText }}
            />
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={schoolInfo?.introImage || "/school-photos/ifa_building_dorm.jpg"}
              alt="School Campus"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f2560]/60 to-transparent flex items-end p-6">
              <p className="text-white font-semibold text-sm">
                {language === "om" ? "Hundeeffama " : "Established "}
                {statistics?.yearEstablished || 1998} · {language === "om" ? "Haramayaa, Itoophiyaa" : "Haramaya, Ethiopia"}
              </p>
            </div>
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-[#1a3a8f]" />
            </div>
            <h3 className="text-xl font-bold text-[#0f2560] mb-3">
              {t("btnOurVision")}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">{visionText}</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-[#f97316]" />
            </div>
            <h3 className="text-xl font-bold text-[#0f2560] mb-3">
              {language === "om" ? "Ergama Keenya" : "Our Mission"}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">{missionText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
