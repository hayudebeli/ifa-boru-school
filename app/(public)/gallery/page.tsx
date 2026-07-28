import { Metadata } from "next";
import { getAllGallery, getGalleryCategories } from "@/actions/gallery";
import GalleryClient from "./GalleryClient";
import { Image as ImageIcon } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photo gallery of Ifa Boru Special Boarding Secondary School Haramaya.",
};

export default async function GalleryPage() {
  const [gallery, categories] = await Promise.all([
    getAllGallery(),
    getGalleryCategories(),
  ]);

  return (
    <div>
      <div className="bg-gradient-to-r from-[#0f2560] to-[#1a3a8f] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="w-12 h-12 bg-[#f97316] rounded-xl flex items-center justify-center shrink-0">
            <ImageIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-[#f97316] font-semibold text-sm mb-1">Our Campus Life</p>
            <h1 className="text-3xl md:text-4xl font-extrabold">Photo Gallery</h1>
            <p className="text-blue-200 text-sm mt-1">Explore memories and facilities</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border-b border-gray-200 py-2 px-4">
        <div className="max-w-7xl mx-auto text-xs text-gray-500">Home › Gallery</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <GalleryClient items={gallery} categories={categories} />
      </div>
    </div>
  );
}
