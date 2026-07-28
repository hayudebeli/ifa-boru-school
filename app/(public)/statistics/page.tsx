import { Metadata } from "next";
import { getStatistics } from "@/actions/statistics";
import StatCard from "@/components/public/StatCard";
import { Users, GraduationCap, BookOpen, Award, Calendar, BarChart2, Ratio } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Student Statistics",
  description: "Student enrollment and academic statistics for Haramaya Ifa Boru Special Boarding Secondary School.",
};

export default async function StatisticsPage() {
  const stats = await getStatistics();

  return (
    <div>
      <div className="bg-gradient-to-r from-[#0f2560] to-[#1a3a8f] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="w-12 h-12 bg-[#f97316] rounded-xl flex items-center justify-center shrink-0">
            <BarChart2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-[#f97316] font-semibold text-sm mb-1">By the Numbers</p>
            <h1 className="text-3xl md:text-4xl font-extrabold">Student Statistics</h1>
            <p className="text-blue-200 text-sm mt-1">
              Haramaya Ifa Boru Special Boarding Secondary School — Academic Year Overview
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border-b border-gray-200 py-2 px-4">
        <div className="max-w-7xl mx-auto text-xs text-gray-500">Home › Student Statistics</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {stats ? (
          <>
            {/* Main Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-12">
              <StatCard icon={Users} value={stats.totalStudents} label="Total Students" color="blue" />
              <StatCard icon={Users} value={stats.boys} label="Male Students" color="blue" />
              <StatCard icon={Users} value={stats.girls} label="Female Students" color="orange" />
              <StatCard icon={BookOpen} value={stats.teachers} label="Teachers" color="green" />
              <StatCard icon={Users} value={stats.staff} label="Support Staff" color="purple" />
              <StatCard icon={Award} value={stats.graduationRate} label="Graduation Rate" color="orange" suffix="%" />
              <StatCard icon={Calendar} value={`${stats.yearEstablished} EC`} label="Year Established" color="blue" />
              <StatCard icon={GraduationCap} value={stats.teachers + stats.staff} label="Total Faculty & Staff" color="green" />
            </div>

            {/* Gender breakdown bar */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
              <h2 className="text-xl font-extrabold text-[#0f2560] mb-6 section-title-left">
                Gender Distribution
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-[#1a3a8f]">Male Students</span>
                    <span className="text-[#1a3a8f]">
                      {stats.totalStudents > 0
                        ? Math.round((stats.boys / stats.totalStudents) * 100)
                        : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-4">
                    <div
                      className="bg-[#1a3a8f] h-4 rounded-full transition-all duration-1000"
                      style={{
                        width: `${stats.totalStudents > 0
                          ? (stats.boys / stats.totalStudents) * 100
                          : 0}%`,
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-[#f97316]">Female Students</span>
                    <span className="text-[#f97316]">
                      {stats.totalStudents > 0
                        ? Math.round((stats.girls / stats.totalStudents) * 100)
                        : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-4">
                    <div
                      className="bg-[#f97316] h-4 rounded-full transition-all duration-1000"
                      style={{
                        width: `${stats.totalStudents > 0
                          ? (stats.girls / stats.totalStudents) * 100
                          : 0}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Resource Ratio Section */}
            {stats.resourceRatio && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <BarChart2 className="w-5 h-5 text-[#1a3a8f]" />
                  </div>
                  <h2 className="text-xl font-extrabold text-[#0f2560] section-title-left">
                    Resource Ratio
                  </h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6 items-center">
                  {/* Teacher to Student ratio card */}
                  <div className="md:col-span-1 bg-gradient-to-br from-[#1a3a8f] to-[#0f2560] rounded-xl p-6 text-white text-center">
                    <p className="text-4xl font-extrabold text-[#f97316] mb-1">
                      1:{stats.teachers > 0 ? Math.round(stats.totalStudents / stats.teachers) : "—"}
                    </p>
                    <p className="text-blue-200 text-sm font-semibold">Teacher : Student</p>
                    <p className="text-blue-300 text-xs mt-1">Ratio</p>
                  </div>
                  {/* Description */}
                  <div className="md:col-span-2">
                    <p className="text-[#f97316] font-semibold text-sm mb-2">About Our Resources</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{stats.resourceRatio}</p>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-[#1a3a8f]">{stats.teachers}</p>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">Qualified Teachers</p>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-[#f97316]">{stats.staff}</p>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">Support Staff</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Graduation Rate highlight */}
            <div className="bg-gradient-to-r from-[#0f2560] to-[#1a3a8f] rounded-2xl p-8 text-center text-white">
              <p className="text-[#f97316] text-sm font-semibold mb-2">Academic Performance</p>
              <div className="text-6xl font-extrabold text-white mb-2">{stats.graduationRate}%</div>
              <p className="text-blue-200 text-base">Graduation Rate</p>
              <p className="text-blue-300 text-sm mt-2">
                Consistently high academic performance since {stats.yearEstablished} EC
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <BarChart2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Statistics not available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
