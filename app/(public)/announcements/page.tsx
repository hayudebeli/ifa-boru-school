import { Metadata } from "next";
import { getAllAnnouncements } from "@/actions/announcements";
import { formatDate } from "@/lib/utils";
import { Bell, Calendar } from "lucide-react";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Announcements",
  description: "Official announcements from Haramaya Ifa Boru Special Boarding Secondary School.",
};

export default async function AnnouncementsPage() {
  const announcements = await getAllAnnouncements(true);

  return (
    <div>
      <div className="bg-gradient-to-r from-[#0f2560] to-[#1a3a8f] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="w-12 h-12 bg-[#f97316] rounded-xl flex items-center justify-center shrink-0">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-[#f97316] font-semibold text-sm mb-1">Official Notices</p>
            <h1 className="text-3xl md:text-4xl font-extrabold">Announcements</h1>
            <p className="text-blue-200 text-sm mt-1">Important notices and updates</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border-b border-gray-200 py-2 px-4">
        <div className="max-w-7xl mx-auto text-xs text-gray-500">Home › Announcements</div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {announcements.length > 0 ? (
          <div className="space-y-5">
            {announcements.map((ann, i) => (
              <div
                key={ann.id}
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-[#1a3a8f]/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                    <Bell className="w-5 h-5 text-[#1a3a8f]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <h2 className="font-bold text-[#0f2560] text-base">{ann.title}</h2>
                      <span className="text-xs text-gray-400 flex items-center gap-1 shrink-0">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(ann.publishedAt)}
                      </span>
                    </div>
                    <div
                      className="text-gray-600 text-sm leading-relaxed mt-2 tiptap-content"
                      dangerouslySetInnerHTML={{ __html: ann.content }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No announcements at this time</p>
            <p className="text-sm mt-1">Check back later for updates.</p>
          </div>
        )}
      </div>
    </div>
  );
}
