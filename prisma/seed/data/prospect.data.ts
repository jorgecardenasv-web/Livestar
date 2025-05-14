import { faker } from "@faker-js/faker/locale/es";
import type { Prisma } from "@prisma/client";

export const prospects: Prisma.ProspectCreateManyInput[] = [
  {
    id: faker.string.uuid(),
    name: "Juan Pérez",
    gender: "Masculino",
    age: 30,
    postalCode: "28001",
    whatsapp: "+521234567890",
    email: "juan.perez@example.com",
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: faker.string.uuid(),
    name: "María García",
    gender: "Femenino",
    age: 25,
    postalCode: "28002",
    whatsapp: "+529876543210",
    email: "maria.garcia@example.com",
    isVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
