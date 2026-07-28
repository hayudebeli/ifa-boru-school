"use client";

import { useState } from "react";
import { createAnnouncement, updateAnnouncement, deleteAnnouncement } from "@/actions/announcements";
import { Plus, Pencil, Trash2, Loader2, Calendar, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { formatDateShort } from "@/lib/utils";

interface AnnouncementItem {
  id: string;
  title: string;
  content: string;
  isActive: boolean;
  publishedAt: Date;
  createdAt: Date;
}

export default function AnnouncementsManager({ initialData }: { initialData: AnnouncementItem[] }) {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(initialData);
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AnnouncementItem | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    isActive: true,
  });

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({ title: "", content: "", isActive: true });
    setIsOpen(true);
  };

  const handleOpenEdit = (item: AnnouncementItem) => {
    setEditingItem(item);
    setFormData({ title: item.title, content: item.content, isActive: item.isActive });
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (editingItem) {
      const res = await updateAnnouncement(editingItem.id, formData);
      setLoading(false);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Announcement updated!");
        setAnnouncements((prev) =>
          prev.map((a) => (a.id === editingItem.id ? { ...a, ...formData } : a))
        );
        setIsOpen(false);
      }
    } else {
      const res = await createAnnouncement(formData);
      setLoading(false);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Announcement created!");
        if (res.announcement) {
          setAnnouncements((prev) => [res.announcement as any, ...prev]);
        }
        setIsOpen(false);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    const res = await deleteAnnouncement(id);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Announcement deleted!");
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Announcements</h1>
          <p className="text-sm text-gray-500 mt-1">Post and manage official school notices.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-[#1a3a8f] hover:bg-[#0f2560] text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Add Announcement
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {announcements.length > 0 ? (
            announcements.map((item) => (
              <div key={item.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-gray-900 text-base">{item.title}</h3>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                        item.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.isActive ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{item.content}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 pt-1">
                    <Calendar className="w-3.5 h-3.5" /> Published on {formatDateShort(item.publishedAt)}
                  </p>
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
              No announcements found. Click "Add Announcement" to post one.
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h2 className="text-lg font-bold text-gray-900">
              {editingItem ? "Edit Announcement" : "Create Announcement"}
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
                  placeholder="e.g. End of Term Examination Schedule"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  required
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData((p) => ({ ...p, content: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1a3a8f] resize-none"
                  placeholder="Details of the announcement..."
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData((p) => ({ ...p, isActive: e.target.checked }))}
                  className="w-4 h-4 text-[#1a3a8f] rounded focus:ring-0"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                  Active (Visible to public)
                </label>
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
