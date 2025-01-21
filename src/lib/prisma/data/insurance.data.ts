import { InsuranceStatus, Prisma } from "@prisma/client";

export const insurances: Prisma.InsuranceCreateManyInput[] = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "Axa",
    logo: "axa.svg",
    description: "Compañía líder en seguros de salud",
    status: "ACTIVO",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "523e4567-e89b-12d3-a456-426614174004",
    name: "GNP Seguros",
    logo: "gnp.svg",
    description: "Innovación en seguros de salud",
    status: "ACTIVO",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "39dabe22-8595-47fe-b4b3-8e80175d7669",
    name: "HDI Seguros",
    logo: "bupa-hdi.svg",
    description: "Compañía líder en seguros de salud",
    status: "ACTIVO",
    createdAt: new Date("2024-09-27T10:00:00Z"),
    updatedAt: new Date("2024-09-27T10:00:00Z"),
  },
];