import { Role, UserStatus, QuoteStatus } from "@prisma/client";
import { hash } from "bcrypt";
import { faker } from "@faker-js/faker/locale/es_MX";
import prisma from ".";
import { insurances } from "./data/insurance.data";
import { planTypes } from "./data/planType.data";
import { plans } from "./data/plan.data";
import { seedQuotes } from "../../../prisma/seed/quotes";

async function main() {
  const adminPassword = "AdminPass123";
  const advisorPassword = "AdvisorPass123";
  const hashedAdminPassword = await hash(adminPassword, 10);
  const hashedAdvisorPassword = await hash(advisorPassword, 10);

  await prisma.trackingNumber.deleteMany();
  await prisma.quote.deleteMany();
  await prisma.prospect.deleteMany();
  await prisma.plan.deleteMany();
  await prisma.planType.deleteMany();
  await prisma.insurance.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      name: "Administrador",
      email: "admin@example.com",
      password: hashedAdminPassword,
      role: Role.ADMIN,
      status: UserStatus.ACTIVO,
    },
  });

  const advisors = await Promise.all([
    prisma.user.create({
      data: {
        name: "Asesor Principal",
        email: "advisor@example.com",
        password: hashedAdvisorPassword,
        role: Role.ASESOR,
        status: UserStatus.ACTIVO,
      },
    }),
    ...Array(5)
      .fill(null)
      .map(async () => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        return prisma.user.create({
          data: {
            name: `${firstName} ${lastName}`,
            email: faker.internet.email({ firstName, lastName }),
            password: hashedAdvisorPassword,
            role: Role.ASESOR,
            status: UserStatus.ACTIVO,
          },
        });
      }),
  ]);

  await prisma.insurance.createMany({ data: insurances, skipDuplicates: true });
  await prisma.planType.createMany({ data: planTypes, skipDuplicates: true });
  await prisma.plan.createMany({ data: plans, skipDuplicates: true });

  const activeAdvisors = advisors.filter(
    (advisor) => advisor.status === UserStatus.ACTIVO
  );

  const prospects = await Promise.all(
    Array(10)
      .fill(null)
      .map(async () => {
        return prisma.prospect.create({
          data: {
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            gender: Math.random() > 0.5 ? "hombre" : "mujer",
            age: faker.number.int({ min: 18, max: 64 }),
            postalCode: faker.location.zipCode(),
            whatsapp: faker.phone.number(),
            email: faker.internet.email(),
            isVerified: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
      })
  );

  const quotes = await Promise.all(
    prospects.slice(0, 5).map((prospect, index) => {
      const advisor = activeAdvisors[index % activeAdvisors.length];
      return prisma.quote.create({
        data: {
          id: faker.string.uuid(),
          prospectId: prospect.id,
          planId: plans[Math.floor(Math.random() * plans.length)].id!,
          totalPrice: faker.number.float({
            min: 1000,
            max: 5000,
            fractionDigits: 2,
          }),
          userId: advisor.id,
          status: QuoteStatus.NUEVO,
          protectWho: "solo_yo",
          additionalInfo: {},
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    })
  );

  await Promise.all(
    quotes.map((quote) =>
      prisma.trackingNumber.create({
        data: {
          id: faker.string.uuid(),
          number: `TRACK${faker.string.numeric(6)}`,
          quoteId: quote.id,
          createdAt: new Date(),
          updatedAt: new Date(),
          lastActivity: new Date(),
          activityLog: {
            actividades: [
              {
                fecha: new Date(),
                descripcion: "Cotización creada",
              },
            ],
          },
        },
      })
    )
  );

  await seedQuotes(prisma, activeAdvisors, plans);

  console.log("Seed completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
