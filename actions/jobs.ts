"use server";

import { db } from "@/lib/db";
import { jobSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getAllJobs(options?: { status?: "OPEN" | "CLOSED" }) {
  try {
    const jobs = await db.job.findMany({
      where: options?.status ? { status: options.status } : {},
      orderBy: { createdAt: "desc" },
    });

    // Auto-close expired jobs
    const now = new Date();
    const updatedJobs = await Promise.all(
      jobs.map(async (job) => {
        if (job.status === "OPEN" && new Date(job.deadline) < now) {
          await db.job.update({ where: { id: job.id }, data: { status: "CLOSED" } });
          return { ...job, status: "CLOSED" as const };
        }
        return job;
      })
    );
    return updatedJobs;
  } catch {
    return [];
  }
}

export async function getOpenJobs(limit?: number) {
  try {
    const now = new Date();
    return await db.job.findMany({
      where: { status: "OPEN", deadline: { gte: now } },
      orderBy: { deadline: "asc" },
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function createJob(data: z.infer<typeof jobSchema>) {
  const parsed = jobSchema.safeParse(data);
  if (!parsed.success) return { error: "Invalid data" };
  try {
    const job = await db.job.create({
      data: { ...parsed.data, deadline: new Date(parsed.data.deadline) },
    });
    revalidatePath("/jobs");
    revalidatePath("/dashboard/jobs");
    return { success: true, job };
  } catch {
    return { error: "Failed to create job" };
  }
}

export async function updateJob(id: string, data: z.infer<typeof jobSchema>) {
  const parsed = jobSchema.safeParse(data);
  if (!parsed.success) return { error: "Invalid data" };
  try {
    const job = await db.job.update({
      where: { id },
      data: { ...parsed.data, deadline: new Date(parsed.data.deadline) },
    });
    revalidatePath("/jobs");
    revalidatePath("/dashboard/jobs");
    return { success: true, job };
  } catch {
    return { error: "Failed to update job" };
  }
}

export async function deleteJob(id: string) {
  try {
    await db.job.delete({ where: { id } });
    revalidatePath("/jobs");
    revalidatePath("/dashboard/jobs");
    return { success: true };
  } catch {
    return { error: "Failed to delete job" };
  }
}
