import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getNewsBySlug, getAllNews } from "@/actions/news";
import { formatDate } from "@/lib/utils";
import { Calendar, User, Tag, ChevronLeft } from "lucide-react";

export const revalidate = 3600;

export async function generateStaticParams() {
  const news = await getAllNews({ status: "PUBLISHED" });
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: article.title,
    description: article.excerpt || article.content.replace(/<[^>]*>/g, "").slice(0, 155),
    openGraph: {
      title: article.title,
      description: article.excerpt || "",
      images: article.featuredImage ? [article.featuredImage] : [],
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
    },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [article, relatedNews] = await Promise.all([
    getNewsBySlug(slug),
    getAllNews({ status: "PUBLISHED", limit: 4 }),
  ]);

  if (!article || article.status !== "PUBLISHED") notFound();

  const related = relatedNews
    .filter((n) => n.slug !== slug && n.category === article.category)
    .slice(0, 3);

  return (
    <div>
      {/* Article Header */}
      <div className="bg-gradient-to-r from-[#0f2560] to-[#1a3a8f] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-blue-200 hover:text-white text-sm mb-4 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to News
          </Link>
          <span className="inline-block bg-[#f97316] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
            {article.category}
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold leading-tight">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-blue-200 text-sm">
            {article.publishedAt && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> {formatDate(article.publishedAt)}
              </span>
            )}
            {article.author && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" /> {article.author.name}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {article.featuredImage && (
        <div className="relative h-64 md:h-96 w-full">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div
              className="tiptap-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-4 h-4 text-gray-400" />
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {related.length > 0 && (
              <div className="sticky top-24">
                <h3 className="font-bold text-[#0f2560] mb-4 text-base section-title-left">
                  Related News
                </h3>
                <div className="space-y-4">
                  {related.map((item) => (
                    <Link
                      key={item.id}
                      href={`/news/${item.slug}`}
                      className="flex gap-3 group"
                    >
                      {item.featuredImage && (
                        <div className="relative w-16 h-14 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={item.featuredImage}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-semibold text-[#f97316]">{item.category}</p>
                        <p className="text-sm text-gray-700 group-hover:text-[#1a3a8f] font-medium leading-snug line-clamp-2 transition-colors">
                          {item.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
