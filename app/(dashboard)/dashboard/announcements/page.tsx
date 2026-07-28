import { getAllAnnouncements } from "@/actions/announcements";
import AnnouncementsManager from "@/components/dashboard/AnnouncementsManager";

export const dynamic = "force-dynamic";

export default async function AdminAnnouncementsPage() {
  const announcements = await getAllAnnouncements(false);
  return <AnnouncementsManager initialData={announcements} />;
}
