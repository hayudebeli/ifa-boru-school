"use client";

import { useState } from "react";
import { createGalleryItem, deleteGalleryItem } from "@/actions/gallery";
import { Plus, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import ImageUpload from "@/components/dashboard/ImageUpload";
import Image from "next/image";

interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category: string;
  createdAt: Date;
}

export default function GalleryManager({ initialData }: { initialData: GalleryItem[] }) {
  const [items, setItems] = useState<GalleryItem[]>(initialData);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    category: "Campus",
  });

  const handleOpenCreate = () => {
    setFormData({ title: "", image: "", category: "Campus" });
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      toast.error("Please upload an image.");
      return;
    }
    setLoading(true);
    const res = await createGalleryItem(formData);
    setLoading(false);

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Photo added to gallery!");
      if (res.item) {
        setItems((prev) => [res.item as any, ...prev]);
      }
      setIsOpen(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this photo from the gallery?")) return;
    const res = await deleteGalleryItem(id);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Photo removed!");
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Gallery</h1>
          <p className="text-sm text-gray-500 mt-1">Upload and categorize school photos.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-[#1a3a8f] hover:bg-[#0f2560] text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Upload Photo
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="relative group h-48 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
              <Image src={item.image} alt={item.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between">
                <span className="self-start text-[10px] uppercase font-bold bg-[#f97316] text-white px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <div>
                  <p className="text-white text-xs font-semibold line-clamp-1 mb-2">{item.title}</p>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="w-full bg-red-600 text-white text-xs py-1.5 rounded-lg flex items-center justify-center gap-1 hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full p-12 bg-white rounded-xl border border-gray-200 text-center text-gray-500 text-sm flex flex-col items-center gap-3">
            <ImageIcon className="w-10 h-10 text-gray-300" />
            <p>No photos in the gallery yet. Click "Upload Photo" to add one.</p>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-gray-900">Upload Photo to Gallery</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title / Caption</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1a3a8f]"
                  placeholder="e.g. Annual Sports Day Ceremony"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1a3a8f]"
                >
                  <option value="Campus">Campus & Buildings</option>
                  <option value="Academics">Academics & Labs</option>
                  <option value="Sports">Sports & Events</option>
                  <option value="Boarding Life">Boarding Life</option>
                  <option value="Ceremonies">Ceremonies & Awards</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo Upload</label>
                <ImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData((p) => ({ ...p, image: url }))}

                  folder="ifa-boru/gallery"
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
                  disabled={loading || !formData.image}
                  className="inline-flex items-center gap-2 bg-[#1a3a8f] hover:bg-[#0f2560] text-white font-semibold px-5 py-2 rounded-lg transition-colors disabled:opacity-70 text-sm"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  Save to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
