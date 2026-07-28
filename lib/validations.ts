import { z } from "zod";

export const newsSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  excerpt: z.string().optional(),
  featuredImage: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "UNPUBLISHED"]),
});

export const announcementSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  isActive: z.boolean().default(true),
});

export const achievementSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().optional(),
  date: z.string().min(1, "Date is required"),
});

export const jobSchema = z.object({
  title: z.string().min(3, "Job title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  requirements: z.string().min(10, "Requirements must be at least 10 characters"),
  deadline: z.string().min(1, "Deadline is required"),
  status: z.enum(["OPEN", "CLOSED"]).default("OPEN"),
});

export const gallerySchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  image: z.string().min(1, "Image is required"),
  category: z.string().min(1, "Category is required"),
  publicId: z.string().optional(),
});

export const schoolInfoSchema = z.object({
  name: z.string().min(1, "School name is required"),
  tagline: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  mapEmbed: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  youtube: z.string().optional(),
  telegram: z.string().optional(),
  about: z.string().optional(),
  aboutOm: z.string().optional(),
  vision: z.string().optional(),
  visionOm: z.string().optional(),
  mission: z.string().optional(),
  missionOm: z.string().optional(),
  introImage: z.string().optional(),
});

export const statisticsSchema = z.object({
  totalStudents: z.number().min(0),
  boys: z.number().min(0),
  girls: z.number().min(0),
  teachers: z.number().min(0),
  staff: z.number().min(0),
  graduationRate: z.number().min(0).max(100),
  yearEstablished: z.number().min(1900).max(new Date().getFullYear()),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type NewsFormData = z.infer<typeof newsSchema>;
export type AnnouncementFormData = z.infer<typeof announcementSchema>;
export type AchievementFormData = z.infer<typeof achievementSchema>;
export type JobFormData = z.infer<typeof jobSchema>;
export type GalleryFormData = z.infer<typeof gallerySchema>;
export type SchoolInfoFormData = z.infer<typeof schoolInfoSchema>;
export type StatisticsFormData = z.infer<typeof statisticsSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
