import { Role, UserStatus } from "@prisma/client";
import { hash } from "bcrypt";
import { faker } from "@faker-js/faker/locale/es_MX";
import prisma from ".";
import { insurances } from "./data/insurance.data";
import { planTypes } from "./data/planType.data";
import { plans } from "./data/plan.data";
import { deductibles } from "./data/deductible.data";

async function main() {
  const adminPassword = "AdminPass123";
  const advisorPassword = "AdvisorPass123";
  const hashedAdminPassword = await hash(adminPassword, 10);
  const hashedAdvisorPassword = await hash(advisorPassword, 10);

  // Se limpian todos los datos existentes
  await prisma.trackingNumber.deleteMany();
  await prisma.quote.deleteMany();
  await prisma.medicalHistory.deleteMany();
  await prisma.prospect.deleteMany();
  await prisma.plan.deleteMany();
  await prisma.planType.deleteMany();
  await prisma.insurance.deleteMany();
  await prisma.user.deleteMany();

  // Se crea un usuario administrador
  await prisma.user.create({
    data: {
      name: "Administrador",
      email: "admin@example.com",
      password: hashedAdminPassword,
      role: Role.ADMIN,
      status: UserStatus.ACTIVO,
    },
  });

  // Se crean usuarios de asesores
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

  // Se crean las aseguradoras, tipos de planes, planes y deducibles
  await prisma.insurance.createMany({ data: insurances, skipDuplicates: true });
  await prisma.planType.createMany({ data: planTypes, skipDuplicates: true });
  await prisma.plan.createMany({ data: plans, skipDuplicates: true });

  // se crean los prospectos y se asignan a los asesores
  const activeAdvisors = advisors.filter(
    (advisor) => advisor.status === UserStatus.ACTIVO
  );

  const prospects = await Promise.all(
    Array(10)
      .fill(null)
      .map(async (_, index) => {
        const advisor = activeAdvisors[index % activeAdvisors.length];

        return prisma.prospect.create({
          data: {
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            gender: Math.random() > 0.5 ? "hombre" : "mujer",
            age: faker.number.int({ min: 18, max: 64 }),
            postalCode: faker.location.zipCode(),
            protectWho: "solo_yo",
            whatsapp: faker.phone.number(),
            email: faker.internet.email(),
            isVerified: false,
            additionalInfo: {},
            userId: advisor.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
      })
  );

  // Se crean las cotizaciones de los prospectos
  await Promise.all(
    prospects.slice(0, 5).map((prospect) =>
      prisma.quote.create({
        data: {
          id: faker.string.uuid(),
          prospectId: prospect.id,
          planId: plans[Math.floor(Math.random() * plans.length)].id!,
          customizations: {},
          totalPrice: faker.number.float({
            min: 1000,
            max: 5000,
            fractionDigits: 2,
          }),
          status: "NUEVO",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
    )
  );

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
