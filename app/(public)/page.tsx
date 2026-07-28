import { Metadata } from "next";
import { getAllNews } from "@/actions/news";
import { getAllAchievements } from "@/actions/achievements";
import { getOpenJobs } from "@/actions/jobs";
import { getStatistics } from "@/actions/statistics";
import { getSchoolInfo } from "@/actions/school";
import { getAllAnnouncements } from "@/actions/announcements";
import { getAllGallery } from "@/actions/gallery";
import HomeClientContent from "@/components/public/HomeClientContent";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to Ifa Boru Special Boarding Secondary School Haramaya — Excellence in Education, Character, and Community.",
};

export default async function HomePage() {
  const [news, achievements, openJobs, statistics, schoolInfo, announcements, gallery] =
    await Promise.all([
      getAllNews({ status: "PUBLISHED", limit: 6 }),
      getAllAchievements(3),
      getOpenJobs(4),
      getStatistics(),
      getSchoolInfo(),
      getAllAnnouncements(true),
      getAllGallery(),
    ]);

  return (
    <HomeClientContent
      news={news}
      achievements={achievements}
      openJobs={openJobs}
      statistics={statistics}
      schoolInfo={schoolInfo}
      announcements={announcements}
      gallery={gallery}
    />
  );
}
