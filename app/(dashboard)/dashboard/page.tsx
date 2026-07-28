import { db } from "@/lib/db";
import StatCard from "@/components/public/StatCard";
import { Newspaper, Image as ImageIcon, Trophy, Briefcase, Bell, BarChart2 } from "lucide-react";
import Link from "next/link";
import { formatDateShort } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardIndexPage() {
  const [newsCount, galleryCount, achievementsCount, openJobsCount, recentNews] = await Promise.all([
    db.news.count(),
    db.gallery.count(),
    db.achievement.count(),
    db.job.count({ where: { status: "OPEN" } }),
    db.news.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, status: true, createdAt: true, category: true },
    }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
      <p className="text-gray-500 mb-8">Welcome to the Ifa Boru website management portal.</p>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Link href="/dashboard/news">
          <StatCard icon={Newspaper} value={newsCount} label="Total News Articles" color="blue" />
        </Link>
        <Link href="/dashboard/gallery">
          <StatCard icon={ImageIcon} value={galleryCount} label="Gallery Images" color="orange" />
        </Link>
        <Link href="/dashboard/achievements">
          <StatCard icon={Trophy} value={achievementsCount} label="Achievements" color="green" />
        </Link>
        <Link href="/dashboard/jobs">
          <StatCard icon={Briefcase} value={openJobsCount} label="Open Jobs" color="purple" />
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900">Recently Added News</h2>
            <Link href="/dashboard/news" className="text-sm text-[#1a3a8f] font-medium hover:underline">
              View All
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentNews.length > 0 ? (
              recentNews.map((item) => (
                <div key={item.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">{item.title}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="bg-gray-100 px-2 py-0.5 rounded">{item.category}</span>
                      <span>{formatDateShort(item.createdAt)}</span>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      item.status === "PUBLISHED"
                        ? "bg-green-100 text-green-700"
                        : item.status === "DRAFT"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 text-sm">No news articles found.</div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <Link
              href="/dashboard/news?action=new"
              className="bg-blue-50 hover:bg-blue-100 text-[#1a3a8f] border border-blue-200 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-colors"
            >
              <Newspaper className="w-8 h-8 mb-2" />
              <span className="font-medium text-sm">Write News</span>
            </Link>
            <Link
              href="/dashboard/gallery"
              className="bg-orange-50 hover:bg-orange-100 text-[#f97316] border border-orange-200 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-colors"
            >
              <ImageIcon className="w-8 h-8 mb-2" />
              <span className="font-medium text-sm">Upload Photos</span>
            </Link>
            <Link
              href="/dashboard/announcements"
              className="bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-colors"
            >
              <Bell className="w-8 h-8 mb-2" />
              <span className="font-medium text-sm">Post Announcement</span>
            </Link>
            <Link
              href="/dashboard/statistics"
              className="bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-colors"
            >
              <BarChart2 className="w-8 h-8 mb-2" />
              <span className="font-medium text-sm">Update Stats</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
