import { Role, UserStatus } from "@prisma/client";
import { hash } from "bcrypt";

const dotenv = require('dotenv');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });

const prisma = new PrismaClient();

async function main() {
  const adminPassword = "AdminPass123";
  const advisorPassword = "AdvisorPass123";
  const hashedAdminPassword = await hash(adminPassword, 10);
  const hashedAdvisorPassword = await hash(advisorPassword, 10);

  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      name: 'Administrador',
      email: 'admin@example.com',
      password: hashedAdminPassword,
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
    },
  })

  await prisma.user.create({
    data: {
      name: 'Asesor',
      email: 'advisor@example.com',
      password: hashedAdvisorPassword,
      role: Role.ADVISOR,
      status: UserStatus.ACTIVE,
    },
  })

  for (let i = 1; i <= 104; i++) {
    await prisma.user.create({
      data: {
        name: `Asesor ${i}`,
        email: `advisor${i}@example.com`,
        password: hashedAdvisorPassword,
        role: Role.ADVISOR,
        status: UserStatus.ACTIVE,
      },
    })
  }

  console.log('El seed se completó con éxito')
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });