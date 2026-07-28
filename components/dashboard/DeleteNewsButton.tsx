"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteNews } from "@/actions/news";

export default function DeleteNewsButton({ id, title }: { id: string; title: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      setIsDeleting(true);
      await deleteNews(id);
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="inline-flex p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
      title="Delete Article"
    >
      {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
    </button>
  );
}
