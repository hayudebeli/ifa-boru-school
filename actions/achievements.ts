"use server";

import { db } from "@/lib/db";
import { achievementSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getAllAchievements(limit?: number) {
  try {
    return await db.achievement.findMany({
      orderBy: { date: "desc" },
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function createAchievement(data: z.infer<typeof achievementSchema>) {
  const parsed = achievementSchema.safeParse(data);
  if (!parsed.success) return { error: "Invalid data" };
  try {
    const achievement = await db.achievement.create({
      data: { ...parsed.data, date: new Date(parsed.data.date) },
    });
    revalidatePath("/achievements");
    revalidatePath("/dashboard/achievements");
    return { success: true, achievement };
  } catch {
    return { error: "Failed to create achievement" };
  }
}

export async function updateAchievement(id: string, data: z.infer<typeof achievementSchema>) {
  const parsed = achievementSchema.safeParse(data);
  if (!parsed.success) return { error: "Invalid data" };
  try {
    const achievement = await db.achievement.update({
      where: { id },
      data: { ...parsed.data, date: new Date(parsed.data.date) },
    });
    revalidatePath("/achievements");
    revalidatePath("/dashboard/achievements");
    return { success: true, achievement };
  } catch {
    return { error: "Failed to update achievement" };
  }
}

export async function deleteAchievement(id: string) {
  try {
    await db.achievement.delete({ where: { id } });
    revalidatePath("/achievements");
    revalidatePath("/dashboard/achievements");
    return { success: true };
  } catch {
    return { error: "Failed to delete achievement" };
  }
}
