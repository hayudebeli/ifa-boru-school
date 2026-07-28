import NewsForm from "@/components/dashboard/NewsForm";

export default function CreateNewsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Create News Article</h1>
      <p className="text-sm text-gray-500 mb-8">Write and publish a new article to the school website.</p>
      <NewsForm />
    </div>
  );
}
