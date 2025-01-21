import { PlanTypeStatus, Prisma } from "@prisma/client";

export const planTypes: Prisma.PlanTypeCreateManyInput[] = [
  {
    id: "4f3d0c2c-244e-4895-a85b-1868a063c4eb",
    name: "Plan Básico",
    status: "ACTIVO" as PlanTypeStatus,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "35fd5713-4f1c-401d-b37d-fc56b179f732",
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
    id: "0276029a-fd32-4af3-b513-97c50b1adb94",
    name: "Hibrido",
    status: "ACTIVO",
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];