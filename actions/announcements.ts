"use server";

import { db } from "@/lib/db";
import { announcementSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getAllAnnouncements(activeOnly = false) {
  try {
    return await db.announcement.findMany({
      where: activeOnly ? { isActive: true } : {},
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    return [];
  }
}

export async function createAnnouncement(data: z.infer<typeof announcementSchema>) {
  const parsed = announcementSchema.safeParse(data);
  if (!parsed.success) return { error: "Invalid data" };
  try {
    const announcement = await db.announcement.create({ data: parsed.data });
    revalidatePath("/announcements");
    revalidatePath("/dashboard/announcements");
    return { success: true, announcement };
  } catch {
    return { error: "Failed to create announcement" };
  }
}

export async function updateAnnouncement(id: string, data: z.infer<typeof announcementSchema>) {
  const parsed = announcementSchema.safeParse(data);
  if (!parsed.success) return { error: "Invalid data" };
  try {
    const announcement = await db.announcement.update({ where: { id }, data: parsed.data });
    revalidatePath("/announcements");
    revalidatePath("/dashboard/announcements");
    return { success: true, announcement };
  } catch {
    return { error: "Failed to update announcement" };
  }
}

export async function deleteAnnouncement(id: string) {
  try {
    await db.announcement.delete({ where: { id } });
    revalidatePath("/announcements");
    revalidatePath("/dashboard/announcements");
    return { success: true };
  } catch {
    return { error: "Failed to delete announcement" };
  }
}
