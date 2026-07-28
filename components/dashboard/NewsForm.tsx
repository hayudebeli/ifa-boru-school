"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsSchema, NewsFormData } from "@/lib/validations";
import { createNews, updateNews, generateSlug } from "@/actions/news";
import TiptapEditor from "./TiptapEditor";
import ImageUpload from "./ImageUpload";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

interface NewsFormProps {
  initialData?: any;
}

export default function NewsForm({ initialData }: NewsFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NewsFormData>({
    resolver: zodResolver(newsSchema),
    defaultValues: initialData || {
      title: "",
      slug: "",
      content: "",
      category: "",
      status: "DRAFT",
      tags: [],
    },
  });

  const title = watch("title");

  const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue("title", val);
    if (!initialData && val.length > 2) {
      const slug = await generateSlug(val);
      setValue("slug", slug);
    }
  };

  const onSubmit = async (data: NewsFormData) => {
    if (!session?.user?.id) {
      setError("You must be logged in to save news.");
      return;
    }
    setIsSubmitting(true);
    setError(null);

    const res = initialData
      ? await updateNews(initialData.id, data)
      : await createNews(data, session.user.id);

    if (res.error) {
      setError(res.error);
      setIsSubmitting(false);
    } else {
      router.push("/dashboard/news");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/news"
          className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to News
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 bg-[#1a3a8f] hover:bg-[#0f2560] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors disabled:opacity-70"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {initialData ? "Update Article" : "Save Article"}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-200">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Article Title *</label>
            <input
              {...register("title")}
              onChange={handleTitleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a3a8f] focus:border-[#1a3a8f] outline-none transition-all"
              placeholder="Enter title"
            />
            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug *</label>
            <input
              {...register("slug")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a3a8f] focus:border-[#1a3a8f] outline-none transition-all"
              placeholder="url-friendly-slug"
            />
            {errors.slug && <p className="mt-1 text-xs text-red-500">{errors.slug.message}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <input
              {...register("category")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a3a8f] focus:border-[#1a3a8f] outline-none transition-all"
              placeholder="e.g., Academics, Sports, Events"
              list="categories"
            />
            <datalist id="categories">
              <option value="Academics" />
              <option value="Sports" />
              <option value="Events" />
              <option value="Campus Life" />
              <option value="Alumni" />
            </datalist>
            {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              {...register("status")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a3a8f] focus:border-[#1a3a8f] outline-none transition-all bg-white"
            >
              <option value="DRAFT">Draft (Hidden)</option>
              <option value="PUBLISHED">Published (Visible)</option>
              <option value="UNPUBLISHED">Unpublished (Archived)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Short Excerpt (Optional)</label>
          <textarea
            {...register("excerpt")}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a3a8f] focus:border-[#1a3a8f] outline-none transition-all resize-none"
            placeholder="Brief summary for the news card"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
          <Controller
            control={control}
            name="featuredImage"
            render={({ field }) => (
              <ImageUpload
                value={field.value || ""}
                onChange={field.onChange}
                folder="ifa-boru/news"
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Article Content *</label>
          <Controller
            control={control}
            name="content"
            render={({ field }) => (
              <TiptapEditor
                content={field.value}
                onChange={field.onChange}
                placeholder="Write the full article content here..."
              />
            )}
          />
          {errors.content && <p className="mt-1 text-xs text-red-500">{errors.content.message}</p>}
        </div>
      </div>
    </form>
  );
}
