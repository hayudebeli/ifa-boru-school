import { Metadata } from "next";
import { getAllJobs } from "@/actions/jobs";
import JobCard from "@/components/public/JobCard";
import { formatDate, isJobExpired } from "@/lib/utils";
import { Briefcase, Calendar, CheckCircle, XCircle, ChevronDown } from "lucide-react";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Job Vacancies",
  description: "Current job openings at Haramaya Ifa Boru Special Boarding Secondary School. Apply to join our team.",
};

export default async function JobsPage() {
  const jobs = await getAllJobs();
  const openJobs = jobs.filter((j) => j.status === "OPEN" && !isJobExpired(j.deadline));
  const closedJobs = jobs.filter((j) => j.status === "CLOSED" || isJobExpired(j.deadline));

  return (
    <div>
      <div className="bg-gradient-to-r from-[#0f2560] to-[#1a3a8f] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="w-12 h-12 bg-[#f97316] rounded-xl flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-[#f97316] font-semibold text-sm mb-1">Career Opportunities</p>
            <h1 className="text-3xl md:text-4xl font-extrabold">Job Vacancies</h1>
            <p className="text-blue-200 text-sm mt-1">Join the Ifa Boru family</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border-b border-gray-200 py-2 px-4">
        <div className="max-w-7xl mx-auto text-xs text-gray-500">Home › Job Vacancies</div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Open Positions */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-extrabold text-[#0f2560]">
              Open Positions ({openJobs.length})
            </h2>
          </div>

          {openJobs.length > 0 ? (
            <div className="space-y-4">
              {openJobs.map((job) => (
                <div key={job.id} id={`job-${job.id}`} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-[#1a3a8f]" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#0f2560] text-lg">{job.title}</h3>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Deadline: {formatDate(job.deadline)}
                          </span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                        <CheckCircle className="w-3.5 h-3.5" /> Open
                      </span>
                    </div>

                    <div
                      className="text-gray-600 text-sm leading-relaxed mb-4 tiptap-content"
                      dangerouslySetInnerHTML={{ __html: job.description }}
                    />

                    <details className="group">
                      <summary className="flex items-center gap-2 text-sm font-semibold text-[#1a3a8f] cursor-pointer hover:text-[#f97316] transition-colors">
                        <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                        View Requirements
                      </summary>
                      <div
                        className="mt-3 pl-4 border-l-4 border-[#1a3a8f]/20 text-gray-600 text-sm leading-relaxed tiptap-content"
                        dangerouslySetInnerHTML={{ __html: job.requirements }}
                      />
                    </details>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200 text-gray-400">
              <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No open positions at this time</p>
              <p className="text-sm mt-1">Please check back soon for new opportunities.</p>
            </div>
          )}
        </div>

        {/* Closed Positions */}
        {closedJobs.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <XCircle className="w-5 h-5 text-red-400" />
              <h2 className="text-xl font-extrabold text-gray-500">
                Closed Positions ({closedJobs.length})
              </h2>
            </div>
            <div className="space-y-3 opacity-70">
              {closedJobs.map((job) => (
                <JobCard key={job.id} {...job} status="CLOSED" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
