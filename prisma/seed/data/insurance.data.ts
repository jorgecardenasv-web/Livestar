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
    id: "975a629c-c2c0-4fd4-b92c-aacfee8cb164",
    name: "GNP Seguros",
    logo: "gnp.svg",
    description: "Innovación en seguros de salud",
    status: "ACTIVO",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "f1647fe3-40d6-4446-814b-c1916a2ae982",
    name: "HDI Seguros",
    logo: "bupa-hdi.svg",
    description: "Compañía líder en seguros de salud",
    status: "ACTIVO",
    createdAt: new Date("2024-09-27T10:00:00Z"),
    updatedAt: new Date("2024-09-27T10:00:00Z"),
  },
];
