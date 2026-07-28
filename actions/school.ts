"use server";

import { db } from "@/lib/db";
import { schoolInfoSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getSchoolInfo() {
  try {
    let info = await db.schoolInformation.findFirst();
    if (!info) {
      info = await db.schoolInformation.create({
        data: {
          name: "Ifa Boru Special Boarding Secondary School Haramaya",
          tagline: "Excellence in Education, Character, and Community",
          address: "Haramaya, Oromia, Ethiopia",
          phone: "+251 25 XXX XXXX",
          email: "info@ifaboru.edu.et",
          about: "Ifa Boru Special Boarding Secondary School is a premier educational institution located in Haramaya, Oromia, Ethiopia. We are committed to providing quality education that empowers students to excel academically, develop strong character, and contribute positively to their communities.",
          aboutOm: "Mana Barumsa Sadarkaa 2ffaa Addaa Bultii Ifa Boruu Haramayaatti magaalaa Haramayaa, Oromiyaa, Itoophiyaatti kan argamudha. Barnoota qulqullina qabu kennuudhaan barattoota keenya guddina barnootaa fi amala cimaatiin ijaaruuf kutannoodhaan hojjenna.",
          vision: "To be a leading center of excellence in secondary education, nurturing well-rounded individuals who are academically distinguished, morally upright, and socially responsible.",
          visionOm: "Mana barumsa sadarkaa 2ffaa addaa barnoota olaanaa, hoogganummaa fi guddina amalaatiif Haramayaa, Oromiyaatti tajaajilu ta'uu.",
          mission: "To provide a holistic, high-quality education in a safe and supportive boarding environment that challenges students to reach their full potential, fosters critical thinking, and instills values of integrity, discipline, and service.",
          missionOm: "Barnoota qulqullina qabu haala mijeessaa fi nageenya qabuun barattootaaf kennuu.",
          introImage: "/school-photos/ifa_building_dorm.jpg",
          facebook: "https://www.facebook.com/61588790410182/posts/122099072523293013/?app=fbl",
          telegram: "https://t.me/+Dz7TPl163oFhODY0",
          heroImages: [
            "/school-photos/ifa_group_amphitheater.jpg",
            "/school-photos/ifa_dorm_balcony.jpg",
            "/school-photos/ifa_courtyard_students.jpg",
          ],
        },
      });
    }
    return info;
  } catch {
    return null;
  }
}

export async function updateSchoolInfo(data: z.infer<typeof schoolInfoSchema>) {
  const parsed = schoolInfoSchema.safeParse(data);
  if (!parsed.success) {
    console.error("updateSchoolInfo validation error:", parsed.error.format());
    return { error: "Invalid data: Please check the form fields." };
  }
  try {
    let info = await db.schoolInformation.findFirst();
    if (info) {
      info = await db.schoolInformation.update({ where: { id: info.id }, data: parsed.data });
    } else {
      info = await db.schoolInformation.create({ data: parsed.data });
    }
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/vision-mission");
    revalidatePath("/contact");
    revalidatePath("/dashboard/school-info");
    return { success: true, info };
  } catch (err: any) {
    console.error("Failed to update school information:", err);
    return { error: err?.message || "Failed to update school information" };
  }
}

export async function addHeroImage(imageUrl: string) {
  try {
    const info = await db.schoolInformation.findFirst();
    if (!info) return { error: "School info not found" };
    const updatedImages = [...(info.heroImages || []), imageUrl];
    await db.schoolInformation.update({
      where: { id: info.id },
      data: { heroImages: updatedImages },
    });
    revalidatePath("/");
    return { success: true };
  } catch {
    return { error: "Failed to add hero image" };
  }
}

export async function removeHeroImage(imageUrl: string) {
  try {
    const info = await db.schoolInformation.findFirst();
    if (!info) return { error: "School info not found" };
    const updatedImages = info.heroImages.filter((img) => img !== imageUrl);
    await db.schoolInformation.update({
      where: { id: info.id },
      data: { heroImages: updatedImages },
    });
    revalidatePath("/");
    return { success: true };
  } catch {
    return { error: "Failed to remove hero image" };
  }
}
