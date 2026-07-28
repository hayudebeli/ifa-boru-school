import { db } from "@/lib/db";
import NewsForm from "@/components/dashboard/NewsForm";
import { notFound } from "next/navigation";

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await db.news.findUnique({ where: { id } });

  if (!article) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit News Article</h1>
      <p className="text-sm text-gray-500 mb-8">Update the article contents and status.</p>
      <NewsForm initialData={article} />
    </div>
  );
}
