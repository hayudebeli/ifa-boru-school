"use client";

import { useState } from "react";
import { createAchievement, updateAchievement, deleteAchievement } from "@/actions/achievements";
import { Plus, Pencil, Trash2, Loader2, Trophy, Calendar } from "lucide-react";
import { toast } from "sonner";
import ImageUpload from "@/components/dashboard/ImageUpload";
import Image from "next/image";

interface AchievementItem {
  id: string;
  title: string;
  description: string;
  image: string | null;
  date: Date;
}

export default function AchievementsManager({ initialData }: { initialData: AchievementItem[] }) {
  const [achievements, setAchievements] = useState<AchievementItem[]>(initialData);
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AchievementItem | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      description: "",
      image: "",
      date: new Date().toISOString().split("T")[0],
    });
    setIsOpen(true);
  };

  const handleOpenEdit = (item: AchievementItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      image: item.image || "",
      date: new Date(item.date).toISOString().split("T")[0],
    });
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (editingItem) {
      const res = await updateAchievement(editingItem.id, formData);
      setLoading(false);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Achievement updated!");
        setAchievements((prev) =>
          prev.map((a) =>
            a.id === editingItem.id ? { ...a, ...formData, date: new Date(formData.date) } : a
          )
        );
        setIsOpen(false);
      }
    } else {
      const res = await createAchievement(formData);
      setLoading(false);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Achievement created!");
        if (res.achievement) {
          setAchievements((prev) => [res.achievement as any, ...prev]);
        }
        setIsOpen(false);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this achievement?")) return;
    const res = await deleteAchievement(id);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Achievement deleted!");
      setAchievements((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Achievements</h1>
          <p className="text-sm text-gray-500 mt-1">Record student and school accomplishments.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-[#1a3a8f] hover:bg-[#0f2560] text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Add Achievement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.length > 0 ? (
          achievements.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col justify-between">
              <div>
                <div className="relative h-44 bg-gray-100">
                  {item.image ? (
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                      <Trophy className="w-10 h-10 text-gray-300" />
                      <span className="text-xs">No image provided</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-[#f97316]" />
                    {new Date(item.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2 leading-snug">{item.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{item.description}</p>
                </div>
              </div>
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-100 rounded transition-colors"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full p-12 bg-white rounded-xl border border-gray-200 text-center text-gray-500 text-sm">
            No achievements found. Click "Add Achievement" to add one.
          </div>
        )}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-gray-900">
              {editingItem ? "Edit Achievement" : "Add Achievement"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1a3a8f]"
                  placeholder="e.g. 1st Place National Mathematics Olympiad"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1a3a8f]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1a3a8f] resize-none"
                  placeholder="Describe the achievement..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo / Trophy Image</label>
                <ImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData((p) => ({ ...p, image: url }))}
                  folder="ifa-boru/achievements"
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
                  {editingItem ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
