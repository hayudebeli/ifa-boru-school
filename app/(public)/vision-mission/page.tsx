import { Metadata } from "next";
import { getSchoolInfo } from "@/actions/school";
import { Eye, Target, Lightbulb, CheckCircle } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Vision & Mission",
  description:
    "The vision and mission of Haramaya Ifa Boru Special Boarding Secondary School — guiding our commitment to excellence.",
};

export default async function VisionMissionPage() {
  const schoolInfo = await getSchoolInfo();

  return (
    <div>
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#0f2560] to-[#1a3a8f] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#f97316] font-semibold text-sm mb-2">Our Direction</p>
          <h1 className="text-3xl md:text-4xl font-extrabold">Vision &amp; Mission</h1>
          <p className="text-blue-200 mt-3 text-sm">
            Guiding principles that shape everything we do
          </p>
        </div>
      </div>

      <div className="bg-gray-50 border-b border-gray-200 py-2 px-4">
        <div className="max-w-7xl mx-auto text-xs text-gray-500">
          Home › Vision &amp; Mission
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid lg:grid-cols-2 gap-8 mb-14">
          {/* Vision */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a3a8f]/5 rounded-full -translate-y-8 translate-x-8" />
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-5">
              <Eye className="w-7 h-7 text-[#1a3a8f]" />
            </div>
            <h2 className="text-xl font-extrabold text-[#0f2560] mb-4 section-title-left">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              {schoolInfo?.vision ||
                "To be a leading center of excellence in secondary education, nurturing well-rounded individuals who are academically distinguished, morally upright, and socially responsible citizens contributing to the development of Ethiopia and beyond."}
            </p>
          </div>

          {/* Mission */}
          <div className="bg-[#0f2560] rounded-2xl shadow-sm p-8 relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#f97316]/10 rounded-full -translate-y-8 translate-x-8" />
            <div className="w-14 h-14 bg-[#f97316]/20 rounded-2xl flex items-center justify-center mb-5">
              <Target className="w-7 h-7 text-[#f97316]" />
            </div>
            <h2 className="text-xl font-extrabold text-white mb-4">Our Mission</h2>
            <div className="w-16 h-1 bg-[#f97316] rounded mb-4" />
            <p className="text-blue-200 leading-relaxed text-sm">
              {schoolInfo?.mission ||
                "To provide a holistic, high-quality education in a safe and supportive boarding environment that challenges students to reach their full potential, fosters critical thinking, and instills values of integrity, discipline, and service to community."}
            </p>
          </div>
        </div>

        {/* Strategic Goals */}
        <div>
          <h2 className="text-2xl font-extrabold text-[#0f2560] text-center mb-8 section-title">
            Strategic Goals
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Academic Excellence", desc: "Achieve consistently high academic performance and university admission rates." },
              { title: "Character Development", desc: "Build graduates with strong moral character, leadership skills, and civic responsibility." },
              { title: "Inclusive Education", desc: "Provide equal educational opportunities for all students regardless of background." },
              { title: "Teacher Excellence", desc: "Recruit, develop, and retain highly qualified, motivated teaching staff." },
              { title: "Modern Infrastructure", desc: "Maintain and improve world-class facilities including labs, library, and sports." },
              { title: "Community Engagement", desc: "Foster strong ties between the school, parents, and the broader Haramaya community." },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm card-hover flex gap-3">
                <CheckCircle className="w-5 h-5 text-[#f97316] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Banner */}
        <div className="mt-12 bg-orange-50 border border-orange-200 rounded-2xl p-8 text-center">
          <Lightbulb className="w-12 h-12 text-[#f97316] mx-auto mb-4" />
          <h3 className="text-xl font-extrabold text-[#0f2560] mb-3">Our Guiding Philosophy</h3>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">
            &quot;Education is not the filling of a pail, but the lighting of a fire.&quot; At Ifa Boru Boarding School,
            we believe every student carries the spark of greatness within them. Our role is to fan that flame
            through exceptional teaching, supportive mentorship, and a nurturing environment.
          </p>
        </div>
      </div>
    </div>
  );
}
