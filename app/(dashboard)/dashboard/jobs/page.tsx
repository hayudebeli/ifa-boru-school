import { getAllJobs } from "@/actions/jobs";
import JobsManager from "@/components/dashboard/JobsManager";

export const dynamic = "force-dynamic";

export default async function AdminJobsPage() {
  const jobs = await getAllJobs();
  return <JobsManager initialData={jobs} />;
}
