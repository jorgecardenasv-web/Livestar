import { Prisma } from "../../src/generated/prisma/client";
import { generarPreciosHDI, generarPreciosSeguros } from "./utils.data";

export const plans: Prisma.PlanCreateManyInput[] = [
  {
    id: "560b3006-0faf-44ac-b498-b7cc5976605a",
    planTypeId: "3d9a1e51-9612-43a4-a0bf-4b68523d272c",
    companyId: "123e4567-e89b-12d3-a456-426614174000",
    sumInsured: 5000000,
    coInsurance: 10,
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
    id: "73f9d6f3-0e64-4f67-ba12-60f0b070c028",
    planTypeId: "9af3201f-06da-4805-99e0-e3f4dc6900f1",
    companyId: "975a629c-c2c0-4fd4-b92c-aacfee8cb164",
    sumInsured: 10000000,
    coInsurance: 10,
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
    id: "24ec1aba-d7d9-4090-9c61-fa9a324b96bb",
    planTypeId: "ce4ec4e3-e706-44c3-af00-ab16a07bcd69",
    companyId: "f1647fe3-40d6-4446-814b-c1916a2ae982",
    sumInsured: 2000000,
    coInsurance: 0,
    coInsuranceCap: 0,
    status: "ACTIVO",
    isRecommended: true,
    prices: generarPreciosHDI(),
    deductibles: {
      default: 25000,
    },
    createdAt: new Date("2024-09-27T11:00:00Z"),
    updatedAt: new Date("2024-09-27T11:00:00Z"),
  },
];
