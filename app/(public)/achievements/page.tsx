import { Metadata } from "next";
import { getAllAchievements } from "@/actions/achievements";
import AchievementCard from "@/components/public/AchievementCard";
import { Trophy } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Achievements",
  description: "Celebrating the outstanding achievements of Ifa Boru Special Boarding Secondary School Haramaya students and staff.",
};

export default async function AchievementsPage() {
  const achievements = await getAllAchievements();

  return (
    <div>
      <div className="bg-gradient-to-r from-[#0f2560] to-[#1a3a8f] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="w-12 h-12 bg-[#f97316] rounded-xl flex items-center justify-center shrink-0">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-[#f97316] font-semibold text-sm mb-1">Our Pride</p>
            <h1 className="text-3xl md:text-4xl font-extrabold">Achievements</h1>
            <p className="text-blue-200 text-sm mt-1">Celebrating excellence and success</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border-b border-gray-200 py-2 px-4">
        <div className="max-w-7xl mx-auto text-xs text-gray-500">Home › Achievements</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {achievements.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.id} {...achievement} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No achievements posted yet</p>
            <p className="text-sm mt-1">Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
