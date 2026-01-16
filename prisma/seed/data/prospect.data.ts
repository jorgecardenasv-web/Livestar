import { Prisma } from "@generated/prisma/client";

export const prospects: Prisma.ProspectCreateManyInput[] = [
  {
    id: "1e2f3g4h-5i6j-7k8l-9m0n-1o2p3q4r5s6t",
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
    id: "2a3b4c5d-6e7f-8g9h-0i1j-2k3l4m5n6o7p",
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
