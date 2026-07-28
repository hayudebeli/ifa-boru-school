"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schoolInfoSchema, SchoolInfoFormData } from "@/lib/validations";
import { updateSchoolInfo, addHeroImage, removeHeroImage } from "@/actions/school";
import { Save, Loader2, MapPin, Phone, Mail, Link as LinkIcon, Building, Image as ImageIcon, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import TiptapEditor from "@/components/dashboard/TiptapEditor";
import ImageUpload from "@/components/dashboard/ImageUpload";
import Image from "next/image";

import { useRouter } from "next/navigation";

export default function SchoolInfoForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [heroImages, setHeroImages] = useState<string[]>(initialData?.heroImages || []);
  const [newHeroUrl, setNewHeroUrl] = useState("");
  const [loadingHero, setLoadingHero] = useState(false);

  const handleAddHeroImage = async (url: string) => {
    if (!url) return;
    setLoadingHero(true);
    const res = await addHeroImage(url);
    setLoadingHero(false);
    if (res.error) {
      toast.error(res.error);
    } else {
      setHeroImages((prev) => [...prev, url]);
      setNewHeroUrl("");
      toast.success("Hero background image added!");
      router.refresh();
    }
  };

  const handleRemoveHeroImage = async (url: string) => {
    setLoadingHero(true);
    const res = await removeHeroImage(url);
    setLoadingHero(false);
    if (res.error) {
      toast.error(res.error);
    } else {
      setHeroImages((prev) => prev.filter((img) => img !== url));
      toast.success("Hero image removed!");
      router.refresh();
    }
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SchoolInfoFormData>({
    resolver: zodResolver(schoolInfoSchema),
    defaultValues: {
      name: initialData?.name || "Ifa Boru Special Boarding Secondary School Haramaya",
      tagline: initialData?.tagline || "",
      address: initialData?.address || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
      mapEmbed: initialData?.mapEmbed || "",
      facebook: initialData?.facebook || "",
      twitter: initialData?.twitter || "",
      instagram: initialData?.instagram || "",
      youtube: initialData?.youtube || "",
      about: initialData?.about || "",
      aboutOm: initialData?.aboutOm || "",
      vision: initialData?.vision || "",
      visionOm: initialData?.visionOm || "",
      mission: initialData?.mission || "",
      missionOm: initialData?.missionOm || "",
      introImage: initialData?.introImage || "",
    },
  });

  const onSubmit = async (data: SchoolInfoFormData) => {
    setIsSubmitting(true);
    const res = await updateSchoolInfo(data);
    setIsSubmitting(false);

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("School information saved successfully!");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-5xl">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
          <Building className="w-5 h-5 text-[#1a3a8f]" /> Basic Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
            <input
              {...register("name")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1a3a8f] focus:border-[#1a3a8f] outline-none"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
            <input
              {...register("tagline")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1a3a8f] focus:border-[#1a3a8f] outline-none"
            />
          </div>
        </div>

        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 pt-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#f97316]" /> Contact Details
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-gray-400" /> Address
            </label>
            <input
              {...register("address")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1a3a8f] focus:border-[#1a3a8f] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-gray-400" /> Phone
            </label>
            <input
              {...register("phone")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1a3a8f] focus:border-[#1a3a8f] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-gray-400" /> Email
            </label>
            <input
              {...register("email")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1a3a8f] focus:border-[#1a3a8f] outline-none"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Embed HTML</label>
          <textarea
            {...register("mapEmbed")}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1a3a8f] focus:border-[#1a3a8f] outline-none resize-none font-mono text-xs"
            placeholder='<iframe src="..."></iframe>'
          />
        </div>

        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 pt-4 flex items-center gap-2">
          <LinkIcon className="w-5 h-5 text-green-600" /> Social Links
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
            <input {...register("facebook")} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Twitter URL</label>
            <input {...register("twitter")} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
            <input {...register("instagram")} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
            <input {...register("youtube")} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none" />
          </div>
        </div>
      </div>

      {/* Hero Slider Photos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-[#f97316]" /> Homepage Hero Slider Photos
        </h2>
        <p className="text-xs text-gray-500">
          Upload or add image URLs for the large background slider on the homepage.
        </p>

        {/* Existing photos grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {heroImages.map((img, idx) => (
            <div key={idx} className="relative group h-40 rounded-lg overflow-hidden border border-gray-200">
              <Image src={img} alt={`Hero ${idx + 1}`} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => handleRemoveHeroImage(img)}
                  disabled={loadingHero}
                  className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                  title="Remove image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Upload or Add URL */}
        <div className="border-t border-gray-100 pt-4 space-y-3">
          <label className="block text-sm font-medium text-gray-700">Upload New Background Photo</label>
          <ImageUpload
            value=""
            onChange={(url) => handleAddHeroImage(url)}

            folder="ifa-boru/hero"
          />

          <div className="flex items-center gap-2 pt-2">
            <input
              type="url"
              value={newHeroUrl}
              onChange={(e) => setNewHeroUrl(e.target.value)}
              placeholder="Or paste image URL (e.g. https://...)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1a3a8f]"
            />
            <button
              type="button"
              onClick={() => handleAddHeroImage(newHeroUrl)}
              disabled={loadingHero || !newHeroUrl}
              className="inline-flex items-center gap-1.5 bg-[#1a3a8f] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0f2560] disabled:opacity-50"
            >
              <Plus className="w-4 h-4" /> Add URL
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center justify-between">
          <span>About & Statements</span>
          <span className="text-xs font-semibold bg-blue-50 text-[#1a3a8f] px-3 py-1 rounded-full border border-blue-200">
            🇬🇧 English & 🇪🇹 Afaan Oromoo
          </span>
        </h2>

        {/* Vision Statements */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vision Statement (English)</label>
            <textarea
              {...register("vision")}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1a3a8f] outline-none resize-none"
              placeholder="To be a leading center of excellence..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Muldhata (Vision in Afaan Oromoo)</label>
            <textarea
              {...register("visionOm")}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1a3a8f] outline-none resize-none"
              placeholder="Mana barumsa sadarkaa 2ffaa addaa..."
            />
          </div>
        </div>

        {/* Mission Statements */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mission Statement (English)</label>
            <textarea
              {...register("mission")}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1a3a8f] outline-none resize-none"
              placeholder="To provide a holistic, high-quality education..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ergama (Mission in Afaan Oromoo)</label>
            <textarea
              {...register("missionOm")}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1a3a8f] outline-none resize-none"
              placeholder="Barnoota qulqullina qabu..."
            />
          </div>
        </div>

        {/* About Us English */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">About Us / Welcome Intro (English)</label>
          <Controller
            control={control}
            name="about"
            render={({ field }) => (
              <TiptapEditor
                content={field.value || ""}
                onChange={field.onChange}
                placeholder="Write the full about page content here..."
              />
            )}
          />
        </div>

        {/* About Us Afaan Oromoo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Waa'ee Keenya (About Us in Afaan Oromoo)</label>
          <Controller
            control={control}
            name="aboutOm"
            render={({ field }) => (
              <TiptapEditor
                content={field.value || ""}
                onChange={field.onChange}
                placeholder="Barruu Waa'ee Keenya Afaan Oromootiin asitti barreessaa..."
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#f97316]" />
            Welcome Section Photo
            <span className="text-xs text-gray-400 font-normal">(shown next to the school intro text on the homepage)</span>
          </label>
          <Controller
            control={control}
            name="introImage"
            render={({ field }) => (
              <ImageUpload
                value={field.value || ""}
                onChange={field.onChange}
                folder="ifa-boru/intro"
              />
            )}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 bg-[#1a3a8f] hover:bg-[#0f2560] text-white font-semibold px-6 py-2.5 rounded-lg transition-colors disabled:opacity-70"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>
    </form>
  );
}
