import { PrismaClient, Role, User, Plan } from "@prisma/client";
import { insurances } from "./data/insurance.data";
import { planTypes } from "./data/planType.data";
import { plans as planData } from "./data/plan.data";
import { prospects } from "./data/prospect.data";
// import { trackingNumbers } from "./data/traking-number.data";
import { users } from "./data/user.data";
import { seedQuotes } from "./quotes";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding ...");

  await prisma.trackingNumber.deleteMany({});
  await prisma.quote.deleteMany({});
  await prisma.prospect.deleteMany({});
  await prisma.plan.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.planType.deleteMany({});
  await prisma.insurance.deleteMany({});
  console.log("Existing data cleared.");

  console.log("Seeding users...");
  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });
  console.log("Users seeded.");

  console.log("Seeding insurances...");
  await prisma.insurance.createMany({
    data: insurances,
    skipDuplicates: true,
  });
  console.log("Insurances seeded.");

  console.log("Seeding plan types...");
  await prisma.planType.createMany({
    data: planTypes,
    skipDuplicates: true,
  });
  console.log("Plan types seeded.");

  console.log("Seeding plans...");
  await prisma.plan.createMany({
    data: planData,
    skipDuplicates: true,
  });
  console.log("Plans seeded.");

  console.log("Seeding general prospects...");
  await prisma.prospect.createMany({
    data: prospects,
    skipDuplicates: true,
  });
  console.log("General prospects seeded.");

  console.log("Seeding quotes and their specific prospects...");
  console.log("Quotes seeded.");

  // console.log("Seeding tracking numbers...");
  // try {
  //   await prisma.trackingNumber.createMany({
  //     data: trackingNumbers,
  //     skipDuplicates: true,
  //   });
  //   console.log("Tracking numbers seeded.");
  // } catch (error) {
  //   console.error("Error seeding tracking numbers. This might be due to missing Quote records for the specified quoteIds.", error);
  // }

  console.log("Seeding finished.");
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
