"use server";

import { db } from "@/lib/db";
import { newsSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import { z } from "zod";

export async function getAllNews(options?: {
  status?: "DRAFT" | "PUBLISHED" | "UNPUBLISHED";
  category?: string;
  search?: string;
  limit?: number;
}) {
  try {
    const where: Record<string, unknown> = {};
    if (options?.status) where.status = options.status;
    if (options?.category) where.category = options.category;
    if (options?.search) {
      where.OR = [
        { title: { contains: options.search, mode: "insensitive" } },
        { content: { contains: options.search, mode: "insensitive" } },
      ];
    }

    return await db.news.findMany({
      where,
      include: { author: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      take: options?.limit,
    });
  } catch {
    return [];
  }
}

export async function getNewsBySlug(slug: string) {
  try {
    return await db.news.findUnique({
      where: { slug },
      include: { author: { select: { name: true } } },
    });
  } catch {
    return null;
  }
}

export async function createNews(data: z.infer<typeof newsSchema>, authorId: string) {
  const parsed = newsSchema.safeParse(data);
  if (!parsed.success) return { error: "Invalid data" };

  try {
    const news = await db.news.create({
      data: {
        ...parsed.data,
        tags: parsed.data.tags || [],
        authorId,
        publishedAt: parsed.data.status === "PUBLISHED" ? new Date() : null,
      },
    });
    revalidatePath("/news");
    revalidatePath("/dashboard/news");
    return { success: true, news };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create news" };
  }
}

export async function updateNews(id: string, data: z.infer<typeof newsSchema>) {
  const parsed = newsSchema.safeParse(data);
  if (!parsed.success) return { error: "Invalid data" };

  try {
    const existing = await db.news.findUnique({ where: { id } });
    const news = await db.news.update({
      where: { id },
      data: {
        ...parsed.data,
        tags: parsed.data.tags || [],
        publishedAt:
          parsed.data.status === "PUBLISHED" && !existing?.publishedAt
            ? new Date()
            : existing?.publishedAt,
      },
    });
    revalidatePath("/news");
    revalidatePath(`/news/${news.slug}`);
    revalidatePath("/dashboard/news");
    return { success: true, news };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update news" };
  }
}

export async function deleteNews(id: string) {
  try {
    const news = await db.news.delete({ where: { id } });
    revalidatePath("/news");
    revalidatePath(`/news/${news.slug}`);
    revalidatePath("/dashboard/news");
    return { success: true };
  } catch {
    return { error: "Failed to delete news" };
  }
}

export async function getNewsCategories() {
  try {
    const result = await db.news.findMany({
      select: { category: true },
      distinct: ["category"],
      where: { status: "PUBLISHED" },
    });
    return result.map((r) => r.category);
  } catch {
    return [];
  }
}

export async function generateSlug(title: string): Promise<string> {
  const base = slugify(title, { lower: true, strict: true });
  const existing = await db.news.findUnique({ where: { slug: base } });
  if (!existing) return base;
  return `${base}-${Date.now()}`;
}
