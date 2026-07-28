import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Search, ExternalLink } from "lucide-react";
import { formatDateShort } from "@/lib/utils";
import DeleteNewsButton from "@/components/dashboard/DeleteNewsButton";

export const dynamic = "force-dynamic";

export default async function AdminNewsPage() {
  const news = await db.news.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage News</h1>
          <p className="text-sm text-gray-500 mt-1">Create, edit, or delete news articles.</p>
        </div>
        <Link
          href="/dashboard/news/new"
          className="inline-flex items-center gap-2 bg-[#1a3a8f] hover:bg-[#0f2560] text-white font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> Add News
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search news... (static UI for now)"
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1a3a8f]"
            />
          </div>
          <p className="text-sm text-gray-500 font-medium">Total: {news.length}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500">
                <th className="px-6 py-3 font-semibold">Article</th>
                <th className="px-6 py-3 font-semibold">Category</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {news.length > 0 ? (
                news.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-10 rounded bg-gray-100 shrink-0 overflow-hidden">
                          {item.featuredImage ? (
                            <Image src={item.featuredImage} alt={item.title} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm line-clamp-1">{item.title}</p>
                          <p className="text-xs text-gray-500">/{item.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          item.status === "PUBLISHED"
                            ? "bg-green-100 text-green-700"
                            : item.status === "DRAFT"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDateShort(item.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link
                        href={`/news/${item.slug}`}
                        target="_blank"
                        className="inline-flex p-1.5 text-gray-500 hover:text-[#1a3a8f] hover:bg-blue-50 rounded transition-colors"
                        title="View Public Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/dashboard/news/${item.id}`}
                        className="inline-flex p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                        title="Edit Article"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteNewsButton id={item.id} title={item.title} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 text-sm">
                    No news articles found. Click "Add News" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
