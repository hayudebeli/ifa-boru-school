"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { UploadCloud, X, Loader2, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}

export default function ImageUpload({ value, onChange, folder = "ifa-boru" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }

      setIsUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");

        const data = await res.json();
        onChange(data.url);
      } catch (err) {
        setError("Failed to upload image. Please try again.");
      } finally {
        setIsUploading(false);
      }
    },
    [folder, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    maxFiles: 1,
    multiple: false,
  });

  const handleRemove = () => {
    onChange("");
  };

  if (value) {
    return (
      <div className="relative w-full max-w-md h-64 rounded-xl overflow-hidden border border-gray-200 group">
        <Image src={value} alt="Uploaded image" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            type="button"
            onClick={handleRemove}
            className="bg-white/20 hover:bg-red-500 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
            title="Remove image"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        {...getRootProps()}
        className={`w-full max-w-md h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer transition-colors ${
          isDragActive
            ? "border-[#1a3a8f] bg-blue-50"
            : error
            ? "border-red-300 bg-red-50"
            : "border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400"
        }`}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <div className="flex flex-col items-center text-[#1a3a8f]">
            <Loader2 className="w-10 h-10 animate-spin mb-3" />
            <p className="text-sm font-medium">Uploading image...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-gray-500 text-center">
            <UploadCloud className={`w-12 h-12 mb-4 ${isDragActive ? "text-[#1a3a8f]" : "text-gray-400"}`} />
            <p className="font-medium text-gray-700 mb-1">
              {isDragActive ? "Drop image here" : "Click or drag image to upload"}
            </p>
            <p className="text-xs text-gray-400">Supports JPG, PNG, WEBP up to 5MB</p>
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
