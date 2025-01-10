import { Role, UserStatus } from "@prisma/client";
import { hash } from "bcrypt";
import {
  insuranceCompanies,
  insurancePlans,
} from "../../features/insurance-plans/data/insurance-data";
import { faker } from "@faker-js/faker/locale/es_MX";
import prisma from ".";

async function main() {
  const adminPassword = "AdminPass123";
  const advisorPassword = "AdvisorPass123";
  const hashedAdminPassword = await hash(adminPassword, 10);
  const hashedAdvisorPassword = await hash(advisorPassword, 10);

  await prisma.user.deleteMany();
  await prisma.insuranceCompany.deleteMany();
  await prisma.insurancePlan.deleteMany();

  await prisma.user.create({
    data: {
      name: "Administrador",
      email: "admin@example.com",
      password: hashedAdminPassword,
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
    },
  });

  await prisma.user.create({
    data: {
      name: "Asesor",
      email: "advisor@example.com",
      password: hashedAdvisorPassword,
      role: Role.ADVISOR,
      status: UserStatus.ACTIVE,
    },
  });

  function getRandomStatus() {
    return Math.random() < 0.5 ? UserStatus.ACTIVE : UserStatus.INACTIVE;
  }

  async function createRandomUsers(count: number) {
    for (let i = 1; i <= count; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const fullName = `${firstName} ${lastName}`;

      console.log(`Creando usuario ${i}: ${fullName}`);

      await prisma.user.create({
        data: {
          name: fullName,
          email: `${firstName.toLowerCase()}_${lastName}}@example.com`,
          password: hashedAdvisorPassword,
          role: Role.ADVISOR,
          status: getRandomStatus(),
        },
      });
    }
  }

  await createRandomUsers(9);

  await prisma.insuranceCompany.createMany({
    data: insuranceCompanies,
    skipDuplicates: true,
  });

  await prisma.insurancePlan.createMany({
    data: insurancePlans,
    skipDuplicates: true,
  });

  console.log("El seed se completó con éxito");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
