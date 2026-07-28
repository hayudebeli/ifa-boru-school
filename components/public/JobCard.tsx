import { formatDate, isJobExpired } from "@/lib/utils";
import { Briefcase, Calendar, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

interface JobCardProps {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  status: "OPEN" | "CLOSED";
  compact?: boolean;
}

export default function JobCard({ id, title, description, deadline, status, compact = false }: JobCardProps) {
  const expired = isJobExpired(deadline);
  const isOpen = status === "OPEN" && !expired;

  if (compact) {
    return (
      <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-[#1a3a8f]/30 transition-colors">
        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${isOpen ? "bg-green-500" : "bg-red-400"}`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800 line-clamp-1">{title}</p>
          <p className="text-xs text-gray-400 mt-0.5">Deadline: {formatDate(deadline)}</p>
        </div>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${
          isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}>
          {isOpen ? "Open" : "Closed"}
        </span>
      </div>
    );
  }

  return (
    <article className="group bg-white rounded-xl border border-gray-200 hover:border-[#1a3a8f] hover:shadow-lg transition-all duration-300 p-6">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5 text-[#1a3a8f]" />
          </div>
          <h3 className="font-bold text-gray-900 group-hover:text-[#1a3a8f] text-base leading-snug transition-colors">
            {title}
          </h3>
        </div>
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full shrink-0 ${
          isOpen
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}>
          {isOpen ? (
            <><CheckCircle className="w-3 h-3" /> Open</>
          ) : (
            <><AlertCircle className="w-3 h-3" /> Closed</>
          )}
        </span>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
        {description.replace(/<[^>]*>/g, "")}
      </p>

      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <Calendar className="w-3.5 h-3.5" />
          <span>Deadline: {formatDate(deadline)}</span>
        </div>
        {isOpen && (
          <Link
            href={`/jobs#job-${id}`}
            className="text-xs font-semibold text-[#1a3a8f] hover:text-[#f97316] transition-colors"
          >
            View Details →
          </Link>
        )}
      </div>
    </article>
  );
}
