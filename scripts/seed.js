const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create School Info
  const schoolInfo = await prisma.schoolInformation.upsert({
    where: { id: "default_school_info" },
    update: {},
    create: {
      id: "default_school_info",
      name: "Ifa Boru Special Boarding Secondary School",
      address: "Haramaya, Oromia, Ethiopia",
      phone: "+251 911 234 567",
      email: "info@ifaboru.edu.et",
      about: "Ifa Boru Special Boarding Secondary School is a premier educational institution...",
      vision: "To be a leading center of excellence in secondary education...",
      mission: "To provide a holistic, high-quality education in a safe and supportive boarding environment...",
    }
  });

  // Create Statistics
  const stats = await prisma.studentStatistics.upsert({
    where: { id: "default_statistics" },
    update: {},
    create: {
      id: "default_statistics",
      totalStudents: 1200,
      boys: 650,
      girls: 550,
      teachers: 85,
      staff: 40,
      graduationRate: 98,
      yearEstablished: 1998,
    }
  });

  // Create Gallery Items with real photos
  const realPhotos = [
    { title: "Ifa Boru Special Boarding School Students & Staff", image: "/school-photos/ifa_group_amphitheater.jpg", category: "Campus" },
    { title: "Student Dormitory & Boarding Facilities", image: "/school-photos/ifa_building_dorm.jpg", category: "Boarding Life" },
    { title: "Students at Dormitory Balcony & Grounds", image: "/school-photos/ifa_dorm_balcony.jpg", category: "Campus" },
    { title: "School Courtyard & Water Facility", image: "/school-photos/ifa_courtyard_students.jpg", category: "Academics" },
    { title: "Ifa Boru School Teachers & Staff Members", image: "/school-photos/ifa_teachers_staff.jpg", category: "Ceremonies" },
  ];

  for (const item of realPhotos) {
    const existing = await prisma.gallery.findFirst({ where: { image: item.image } });
    if (!existing) {
      await prisma.gallery.create({ data: item });
    }
  }

  console.log("Database seeded successfully with real school photos.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
