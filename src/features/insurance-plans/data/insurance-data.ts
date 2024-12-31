import { InsuranceCompany, Prisma } from "@prisma/client";

export const insuranceCompanies: InsuranceCompany[] = [
  {
    id: 1,
    uuid: "123e4567-e89b-12d3-a456-426614174000",
    name: "Axa",
    logo: "/api/images/axa.svg",
    description: "Compañía líder en seguros de salud",
    status: "ACTIVE",
    createdAt: new Date("2024-09-27T10:00:00Z"),
    updatedAt: new Date("2024-09-27T10:00:00Z"),
  },
  {
    id: 2,
    uuid: "523e4567-e89b-12d3-a456-426614174004",
    name: "GNP Seguros",
    logo: "/api/images/gnp.svg",
    description: "Innovación en seguros de salud",
    status: "ACTIVE",
    createdAt: new Date("2024-09-28T10:00:00Z"),
    updatedAt: new Date("2024-09-28T10:00:00Z"),
  },
  {
    id: 3,
    uuid: "923e4567-e89b-12d3-a456-426614174008",
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
    id: 1,
    uuid: "223e4567-e89b-12d3-a456-426614174001",
    name: "Plan Básico",
    companyId: 1,
    sumInsured: 5000000,
    coInsurance: 0.2,
    coInsuranceCap: 50000,
    status: "ACTIVE",
    createdAt: new Date("2024-09-27T10:00:00Z"),
    updatedAt: new Date("2024-09-27T10:00:00Z"),
  },
];
