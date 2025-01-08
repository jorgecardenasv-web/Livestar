import { InsuranceCompany, Prisma } from "@prisma/client";

export const insuranceCompanies: InsuranceCompany[] = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "Axa",
    logo: "/api/images/axa.svg",
    description: "Compañía líder en seguros de salud",
    status: "ACTIVE",
    createdAt: new Date("2024-09-27T10:00:00Z"),
    updatedAt: new Date("2024-09-27T10:00:00Z"),
  },
  {
    id: "523e4567-e89b-12d3-a456-426614174004",
    name: "GNP Seguros",
    logo: "/api/images/gnp.svg",
    description: "Innovación en seguros de salud",
    status: "ACTIVE",
    createdAt: new Date("2024-09-28T10:00:00Z"),
    updatedAt: new Date("2024-09-28T10:00:00Z"),
  },
  {
    id: "923e4567-e89b-12d3-a456-426614174008",
    name: "Metlife",
    logo: "/api/images/metlife.svg",
    description: "Seguros personalizados para cada necesidad",
    status: "ACTIVE",
    createdAt: new Date("2024-09-29T10:00:00Z"),
    updatedAt: new Date("2024-09-29T10:00:00Z"),
  },
];

export const insurancePlans: Prisma.InsurancePlanCreateManyInput[] = [
  {
    id: "223e4567-e89b-12d3-a456-426614174001",
    name: "Plan Básico",
    companyId: "523e4567-e89b-12d3-a456-426614174004",
    sumInsured: 5000000,
    coInsurance: 0.2,
    coInsuranceCap: 50000,
    status: "ACTIVE",
    createdAt: new Date("2024-09-27T10:00:00Z"),
    updatedAt: new Date("2024-09-27T10:00:00Z"),
    prices: {
      "0": {
        male: {
          monthly: 0,
          annual: 0,
        },
        female: {
          monthly: 0,
          annual: 0,
        },
      },
      "1": {
        male: {
          monthly: 0,
          annual: 0,
        },
        female: {
          monthly: 100,
          annual: 200,
        },
      },
    },
  },
];
