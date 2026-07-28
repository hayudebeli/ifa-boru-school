"use client";

import { useState } from "react";
import { updateStatistics } from "@/actions/statistics";
import { Save, Loader2, Users, GraduationCap, Award, Calendar, BarChart2 } from "lucide-react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

interface StatItem {
  totalStudents: number;
  boys: number;
  girls: number;
  teachers: number;
  staff: number;
  graduationRate: number;
  yearEstablished: number;
}

export default function StatisticsManager({ initialData }: { initialData: StatItem | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<StatItem>({
    totalStudents: initialData?.totalStudents ?? 1200,
    boys: initialData?.boys ?? 650,
    girls: initialData?.girls ?? 550,
    teachers: initialData?.teachers ?? 85,
    staff: initialData?.staff ?? 40,
    graduationRate: initialData?.graduationRate ?? 95,
    yearEstablished: initialData?.yearEstablished ?? 1998,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await updateStatistics({
      ...formData,
      totalStudents: Number(formData.totalStudents),
      boys: Number(formData.boys),
      girls: Number(formData.girls),
      teachers: Number(formData.teachers),
      staff: Number(formData.staff),
      graduationRate: Number(formData.graduationRate),
      yearEstablished: Number(formData.yearEstablished),
    });
    setLoading(false);

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("School statistics updated successfully!");
      router.refresh();
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Student Statistics</h1>
          <p className="text-sm text-gray-500 mt-1">Update school enrollment and academic performance numbers.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#1a3a8f]" /> Student Enrollment
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Students</label>
              <input
                type="number"
                required
                value={formData.totalStudents}
                onChange={(e) => setFormData((p) => ({ ...p, totalStudents: Number(e.target.value) }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1a3a8f]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Boys</label>
              <input
                type="number"
                required
                value={formData.boys}
                onChange={(e) => setFormData((p) => ({ ...p, boys: Number(e.target.value) }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1a3a8f]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Girls</label>
              <input
                type="number"
                required
                value={formData.girls}
                onChange={(e) => setFormData((p) => ({ ...p, girls: Number(e.target.value) }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1a3a8f]"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#f97316]" /> Staff & Performance
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teachers</label>
              <input
                type="number"
                required
                value={formData.teachers}
                onChange={(e) => setFormData((p) => ({ ...p, teachers: Number(e.target.value) }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1a3a8f]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Support Staff</label>
              <input
                type="number"
                required
                value={formData.staff}
                onChange={(e) => setFormData((p) => ({ ...p, staff: Number(e.target.value) }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1a3a8f]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Rate (%)</label>
              <input
                type="number"
                step="0.1"
                required
                value={formData.graduationRate}
                onChange={(e) => setFormData((p) => ({ ...p, graduationRate: Number(e.target.value) }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1a3a8f]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year Established</label>
              <input
                type="number"
                required
                value={formData.yearEstablished}
                onChange={(e) => setFormData((p) => ({ ...p, yearEstablished: Number(e.target.value) }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1a3a8f]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-[#1a3a8f] hover:bg-[#0f2560] text-white font-semibold px-6 py-2.5 rounded-lg transition-colors disabled:opacity-70 text-sm"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Statistics
          </button>
        </div>
      </form>
    </div>
  );
}
