import Image from "next/image";
import { formatDateShort } from "@/lib/utils";
import { Trophy, Calendar } from "lucide-react";

interface AchievementCardProps {
  title: string;
  description: string;
  image?: string | null;
  date: Date;
}

export default function AchievementCard({ title, description, image, date }: AchievementCardProps) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 card-hover transition-all duration-300">
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-[#1a3a8f] to-[#f97316]">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Trophy className="w-16 h-16 text-white/30" />
          </div>
        )}
        {/* Gold ribbon */}
        <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
          <Trophy className="w-3 h-3" />
          Achievement
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
          <Calendar className="w-3.5 h-3.5" />
          {formatDateShort(date)}
        </div>
        <h3 className="font-bold text-gray-900 group-hover:text-[#1a3a8f] text-base leading-snug mb-2 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{description}</p>
      </div>
    </div>
  );
}
