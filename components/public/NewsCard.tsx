import Image from "next/image";
import Link from "next/link";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { formatDateShort, truncateText } from "@/lib/utils";

interface NewsCardProps {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  featuredImage?: string | null;
  category: string;
  publishedAt?: Date | null;
  author?: { name: string } | null;
  compact?: boolean;
}

export default function NewsCard({
  title,
  slug,
  excerpt,
  content,
  featuredImage,
  category,
  publishedAt,
  author,
  compact = false,
}: NewsCardProps) {
  const displayExcerpt =
    excerpt || truncateText(content.replace(/<[^>]*>/g, ""), 120);

  if (compact) {
    return (
      <Link href={`/news/${slug}`} className="flex gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors">
        {featuredImage && (
          <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0">
            <Image src={featuredImage} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-[#f97316] font-medium mb-0.5">{category}</p>
          <h4 className="text-sm font-semibold text-gray-800 group-hover:text-[#1a3a8f] leading-snug line-clamp-2 transition-colors">
            {title}
          </h4>
          {publishedAt && (
            <p className="text-xs text-gray-400 mt-1">{formatDateShort(publishedAt)}</p>
          )}
        </div>
      </Link>
    );
  }

  return (
    <article className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 card-hover transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {featuredImage ? (
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a8f] to-[#2952c4] flex items-center justify-center">
            <span className="text-white text-4xl font-bold opacity-20">NEWS</span>
          </div>
        )}
        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-[#f97316] text-white text-xs font-semibold px-3 py-1 rounded-full">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 group-hover:text-[#1a3a8f] text-base leading-snug mb-2 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
          {displayExcerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-3">
            {publishedAt && (
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Calendar className="w-3.5 h-3.5" />
                {formatDateShort(publishedAt)}
              </span>
            )}
            {author && (
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Tag className="w-3.5 h-3.5" />
                {author.name}
              </span>
            )}
          </div>
          <Link
            href={`/news/${slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#1a3a8f] hover:text-[#f97316] transition-colors group/link"
          >
            Read more
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
