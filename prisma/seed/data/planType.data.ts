import { PlanTypeStatus, Prisma } from "../../src/generated/prisma/client";

export const planTypes: Prisma.PlanTypeCreateManyInput[] = [
  {
    id: "3d9a1e51-9612-43a4-a0bf-4b68523d272c",
    name: "Plan Básico",
    status: "ACTIVO" as PlanTypeStatus,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "9af3201f-06da-4805-99e0-e3f4dc6900f1",
    name: "Plan Intermedio",
    status: "ACTIVO" as PlanTypeStatus,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "333fada3-537a-4596-b1b7-87fb724d9671",
    name: "Plan Plus",
    status: "ACTIVO",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "ce4ec4e3-e706-44c3-af00-ab16a07bcd69",
    name: "Hibrido",
    status: "ACTIVO",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
