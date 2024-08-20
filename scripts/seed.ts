import { Role } from "@prisma/client";
import { hash } from "bcrypt";

const dotenv = require('dotenv');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@example.com";
  const adminPassword = "AdminPass123";
  const hashedPassword = await hash(adminPassword, 10);

  await prisma.user.deleteMany();

  const adminUser = await prisma.user.create({
    data: {
      name: "Administrador",
      email: adminEmail,
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log(`Usuario administrador creado: ${adminUser.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });