"use server";

import { db } from "@/lib/db";
import { statisticsSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getStatistics() {
  try {
    let stats = await db.studentStatistics.findFirst();
    if (!stats) {
      stats = await db.studentStatistics.create({
        data: {
          totalStudents: 1200,
          boys: 650,
          girls: 550,
          teachers: 85,
          staff: 40,
          graduationRate: 94.5,
          yearEstablished: 2014,
          resourceRatio: "1 teacher for every 14 students — ensuring personalized attention and quality learning outcomes.",
        },
      });
    }
    return stats;
  } catch {
    return null;
  }
}

export async function updateStatistics(data: z.infer<typeof statisticsSchema>) {
  const parsed = statisticsSchema.safeParse(data);
  if (!parsed.success) {
    console.error("updateStatistics error:", parsed.error.format());
    return { error: "Invalid statistics data" };
  }
  try {
    let stats = await db.studentStatistics.findFirst();
    if (stats) {
      stats = await db.studentStatistics.update({ where: { id: stats.id }, data: parsed.data });
    } else {
      stats = await db.studentStatistics.create({ data: parsed.data });
    }
    revalidatePath("/statistics");
    revalidatePath("/");
    revalidatePath("/dashboard/statistics");
    return { success: true, stats };
  } catch (err: any) {
    console.error("Failed to update statistics:", err);
    return { error: err?.message || "Failed to update statistics" };
  }
}
