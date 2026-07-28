import { Metadata } from "next";
import { getAllNews, getNewsCategories } from "@/actions/news";
import NewsClient from "./NewsClient";
import { Newspaper } from "lucide-react";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "News",
  description: "Latest news and updates from Ifa Boru Special Boarding Secondary School Haramaya.",
};

export default async function NewsPage() {
  const [news, categories] = await Promise.all([
    getAllNews({ status: "PUBLISHED" }),
    getNewsCategories(),
  ]);

  return (
    <div>
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#0f2560] to-[#1a3a8f] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="w-12 h-12 bg-[#f97316] rounded-xl flex items-center justify-center shrink-0">
            <Newspaper className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-[#f97316] font-semibold text-sm mb-1">Stay Informed</p>
            <h1 className="text-3xl md:text-4xl font-extrabold">School News</h1>
            <p className="text-blue-200 text-sm mt-1">Latest news, events, and updates</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border-b border-gray-200 py-2 px-4">
        <div className="max-w-7xl mx-auto text-xs text-gray-500">Home › News</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <NewsClient news={news} categories={categories} />
      </div>
    </div>
  );
}
