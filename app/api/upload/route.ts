import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const isCloudinaryConfigured =
  cloudName &&
  apiKey &&
  cloudName !== "your-cloud-name" &&
  apiKey !== "your-api-key";

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "ifa-boru";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // If Cloudinary is configured, use Cloudinary
    if (isCloudinaryConfigured) {
      try {
        const result = await new Promise<{
          secure_url: string;
          public_id: string;
        }>((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder,
                resource_type: "image",
                transformation: [{ quality: "auto", fetch_format: "auto" }],
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result as { secure_url: string; public_id: string });
              }
            )
            .end(buffer);
        });

        return NextResponse.json({
          url: result.secure_url,
          publicId: result.public_id,
        });
      } catch (cloudErr) {
        console.warn("Cloudinary upload failed, falling back to local storage:", cloudErr);
      }
    }

    // Local Disk Fallback
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const ext = path.extname(file.name) || ".jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
    const filePath = path.join(uploadDir, filename);

    await fs.promises.writeFile(filePath, buffer);
    const publicUrl = `/uploads/${filename}`;

    return NextResponse.json({
      url: publicUrl,
      publicId: filename,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json({ error: "No public ID provided" }, { status: 400 });
    }

    if (isCloudinaryConfigured && !publicId.startsWith("/uploads/")) {
      await cloudinary.uploader.destroy(publicId);
    } else {
      const filePath = path.join(process.cwd(), "public", "uploads", path.basename(publicId));
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
