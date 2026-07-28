import { Metadata } from "next";
import { getSchoolInfo } from "@/actions/school";
import { getStatistics } from "@/actions/statistics";
import AboutClientContent from "@/components/public/AboutClientContent";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Ifa Boru Special Boarding Secondary School Haramaya — our history, values, and commitment to academic excellence.",
};

export default async function AboutPage() {
  const [schoolInfo, statistics] = await Promise.all([getSchoolInfo(), getStatistics()]);

  return <AboutClientContent schoolInfo={schoolInfo} statistics={statistics} />;
}
