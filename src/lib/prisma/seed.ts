import { Role } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from ".";

async function main() {
  const adminEmail = "admin@example.com";
  const adminPassword = "AdminPass123!";
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.deleteMany();

  const adminUser = await prisma.user.create({
    data: {
      name: "Admin User",
      email: adminEmail,
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log(`Usuario administrador creado o actualizado: ${adminUser.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
