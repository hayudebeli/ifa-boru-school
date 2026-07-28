import { getStatistics } from "@/actions/statistics";
import StatisticsManager from "@/components/dashboard/StatisticsManager";

export const dynamic = "force-dynamic";

export default async function AdminStatisticsPage() {
  const stats = await getStatistics();
  return <StatisticsManager initialData={stats} />;
}
