import { getAllAchievements } from "@/actions/achievements";
import AchievementsManager from "@/components/dashboard/AchievementsManager";

export const dynamic = "force-dynamic";

export default async function AdminAchievementsPage() {
  const achievements = await getAllAchievements();
  return <AchievementsManager initialData={achievements} />;
}
