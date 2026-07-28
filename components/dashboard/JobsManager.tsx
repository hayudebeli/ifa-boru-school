"use client";

import { useState } from "react";
import { createJob, updateJob, deleteJob } from "@/actions/jobs";
import { Plus, Pencil, Trash2, Loader2, Briefcase, Calendar, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { formatDateShort } from "@/lib/utils";

interface JobItem {
  id: string;
  title: string;
  description: string;
  requirements: string;
  deadline: Date;
  status: "OPEN" | "CLOSED";
  createdAt: Date;
}

export default function JobsManager({ initialData }: { initialData: JobItem[] }) {
  const [jobs, setJobs] = useState<JobItem[]>(initialData);
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<JobItem | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    status: "OPEN" as "OPEN" | "CLOSED",
  });

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      description: "",
      requirements: "",
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: "OPEN",
    });
    setIsOpen(true);
  };

  const handleOpenEdit = (item: JobItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      requirements: item.requirements,
      deadline: new Date(item.deadline).toISOString().split("T")[0],
      status: item.status,
    });
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (editingItem) {
      const res = await updateJob(editingItem.id, formData);
      setLoading(false);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Job vacancy updated!");
        setJobs((prev) =>
          prev.map((j) =>
            j.id === editingItem.id
              ? { ...j, ...formData, deadline: new Date(formData.deadline) }
              : j
          )
        );
        setIsOpen(false);
      }
    } else {
      const res = await createJob(formData);
      setLoading(false);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Job vacancy posted!");
        if (res.job) {
          setJobs((prev) => [res.job as any, ...prev]);
        }
        setIsOpen(false);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job vacancy?")) return;
    const res = await deleteJob(id);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Job vacancy deleted!");
      setJobs((prev) => prev.filter((j) => j.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Job Vacancies</h1>
          <p className="text-sm text-gray-500 mt-1">Post and manage teacher and staff openings.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-[#1a3a8f] hover:bg-[#0f2560] text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Post Job Vacancy
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {jobs.length > 0 ? (
            jobs.map((item) => (
              <div key={item.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-gray-900 text-base">{item.title}</h3>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                        item.status === "OPEN" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status === "OPEN" ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#f97316]" /> Deadline: {formatDateShort(item.deadline)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end md:self-center">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-gray-500 text-sm">
              No job vacancies posted. Click "Post Job Vacancy" to add one.
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-gray-900">
              {editingItem ? "Edit Job Vacancy" : "Post Job Vacancy"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1a3a8f]"
                  placeholder="e.g. Senior Physics Teacher"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline Date</label>
                <input
                  type="date"
                  required
                  value={formData.deadline}
                  onChange={(e) => setFormData((p) => ({ ...p, deadline: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1a3a8f]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData((p) => ({ ...p, status: e.target.value as "OPEN" | "CLOSED" }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1a3a8f]"
                >
                  <option value="OPEN">OPEN</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1a3a8f] resize-none"
                  placeholder="Brief summary of duties and role..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                <textarea
                  required
                  rows={3}
                  value={formData.requirements}
                  onChange={(e) => setFormData((p) => ({ ...p, requirements: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1a3a8f] resize-none"
                  placeholder="B.Sc / B.Ed in Physics, 3+ years teaching experience, etc."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 bg-[#1a3a8f] hover:bg-[#0f2560] text-white font-semibold px-5 py-2 rounded-lg transition-colors disabled:opacity-70 text-sm"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {editingItem ? "Update" : "Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
