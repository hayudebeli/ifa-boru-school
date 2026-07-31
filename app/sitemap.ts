import { MetadataRoute } from "next";
import { getAllNews } from "@/actions/news";

export const dynamic = "force-dynamic";

const BASE_URL = "https://haramayaifaboruschool.xyz";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const news = await getAllNews({
    status: "PUBLISHED",
  });

  const newsUrls = news.map((article) => ({
    url: `${BASE_URL}/news/${article.slug}`,
    lastModified: new Date(article.updatedAt || article.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...newsUrls,
  ];
}
