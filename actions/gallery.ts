"use server";

import { db } from "@/lib/db";
import { gallerySchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getAllGallery(category?: string) {
  try {
    return await db.gallery.findMany({
      where: category ? { category } : {},
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export async function getGalleryCategories() {
  try {
    const result = await db.gallery.findMany({
      select: { category: true },
      distinct: ["category"],
    });
    return result.map((r) => r.category);
  } catch {
    return [];
  }
}

export async function createGalleryItem(data: z.infer<typeof gallerySchema>) {
  const parsed = gallerySchema.safeParse(data);
  if (!parsed.success) return { error: "Invalid data" };
  try {
    const item = await db.gallery.create({ data: parsed.data });
    revalidatePath("/gallery");
    revalidatePath("/dashboard/gallery");
    return { success: true, item };
  } catch {
    return { error: "Failed to create gallery item" };
  }
}

export async function updateGalleryItem(id: string, data: z.infer<typeof gallerySchema>) {
  const parsed = gallerySchema.safeParse(data);
  if (!parsed.success) return { error: "Invalid data" };
  try {
    const item = await db.gallery.update({ where: { id }, data: parsed.data });
    revalidatePath("/gallery");
    revalidatePath("/dashboard/gallery");
    return { success: true, item };
  } catch {
    return { error: "Failed to update gallery item" };
  }
}

export async function deleteGalleryItem(id: string) {
  try {
    await db.gallery.delete({ where: { id } });
    revalidatePath("/gallery");
    revalidatePath("/dashboard/gallery");
    return { success: true };
  } catch {
    return { error: "Failed to delete gallery item" };
  }
}
