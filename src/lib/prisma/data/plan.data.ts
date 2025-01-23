import { Prisma } from "@prisma/client";
import { generarPreciosSeguros } from "./utils.data";

export const plans: Prisma.PlanCreateManyInput[] = [
  {
    id: "223e4567-e89b-12d3-a456-426614174001",
    planTypeId: "4f3d0c2c-244e-4895-a85b-1868a063c4eb",
    companyId: "123e4567-e89b-12d3-a456-426614174000",
    sumInsured: 5000000,
    coInsurance: 0.1,
    coInsuranceCap: 35000,
    status: "ACTIVO",
    isRecommended: false,
    prices: generarPreciosSeguros(),
    deductibles: {
      default: 30000,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // GNP Plans
  {
    id: "323e4567-e89b-12d3-a456-426614174002",
    planTypeId: "35fd5713-4f1c-401d-b37d-fc56b179f732",
    companyId: "523e4567-e89b-12d3-a456-426614174004",
    sumInsured: 10000000,
    coInsurance: 0.1,
    coInsuranceCap: 40000,
    status: "ACTIVO",
    isRecommended: false,
    prices: generarPreciosSeguros(),
    deductibles: {
      opcion_2: {
        A: 25000,
        B: 35000,
        C: 45000,
        D: 55000,
      },
      opcion_4: {
        A: 50000,
        B: 60000,
        C: 70000,
        D: 80000,
      },
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // HDI Plans
  {
    id: "839e69a2-852d-4cd3-b925-405f43920970",
    planTypeId: "0276029a-fd32-4af3-b513-97c50b1adb94",
    companyId: "39dabe22-8595-47fe-b4b3-8e80175d7669",
    sumInsured: 2000000,
    coInsurance: 0,
    coInsuranceCap: 0,
    status: "ACTIVO",
    isRecommended: true,
    prices: generarPreciosSeguros(),
    deductibles: {
      default: 25000,
    },
    createdAt: new Date("2024-09-27T11:00:00Z"),
    updatedAt: new Date("2024-09-27T11:00:00Z"),
  },
];
