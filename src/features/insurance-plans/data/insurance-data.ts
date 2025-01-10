import { Insurance, PlanType, Prisma } from "@prisma/client";

type Seguro = {
  hombre: {
    mensual: number;
    anual: number;
  };
  mujer: {
    mensual: number;
    anual: number;
  };
};

const generarNumeroAleatorio = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generarPreciosSeguros = (): Record<number, Seguro> => {
  const resultado: Record<number, Seguro> = {};

  for (let edad = 0; edad <= 64; edad++) {
    const masculinoMensual = generarNumeroAleatorio(50, 200);
    const femeninoMensual = generarNumeroAleatorio(40, 150);

    resultado[edad] = {
      hombre: {
        mensual: masculinoMensual,
        anual: masculinoMensual * 12,
      },
      mujer: {
        mensual: femeninoMensual,
        anual: femeninoMensual * 12,
      },
    };
  }
  return resultado;
};

export const insurances: Insurance[] = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "Axa",
    logo: "axa.svg",
    description: "Compañía líder en seguros de salud",
    status: "ACTIVE",
    createdAt: new Date("2024-09-27T10:00:00Z"),
    updatedAt: new Date("2024-09-27T10:00:00Z"),
  },
  {
    id: "523e4567-e89b-12d3-a456-426614174004",
    name: "GNP Seguros",
    logo: "gnp.svg",
    description: "Innovación en seguros de salud",
    status: "ACTIVE",
    createdAt: new Date("2024-09-28T10:00:00Z"),
    updatedAt: new Date("2024-09-28T10:00:00Z"),
  },
  {
    id: "923e4567-e89b-12d3-a456-426614174008",
    name: "Metlife",
    logo: "metlife.svg",
    description: "Seguros personalizados para cada necesidad",
    status: "ACTIVE",
    createdAt: new Date("2024-09-29T10:00:00Z"),
    updatedAt: new Date("2024-09-29T10:00:00Z"),
  },
  {
    id: "39dabe22-8595-47fe-b4b3-8e80175d7669",
    name: "HDI Seguros",
    logo: "bupa-hdi.svg",
    description: "Compañía líder en seguros de salud",
    status: "ACTIVE",
    createdAt: new Date("2024-09-27T10:00:00Z"),
    updatedAt: new Date("2024-09-27T10:00:00Z"),
  },
];

export const plans: Prisma.PlanCreateManyInput[] = [
  {
    id: "223e4567-e89b-12d3-a456-426614174001",
    planTypeId: "4f3d0c2c-244e-4895-a85b-1868a063c4eb",
    companyId: "523e4567-e89b-12d3-a456-426614174004",
    sumInsured: 5000000,
    coInsurance: 0.2,
    coInsuranceCap: 50000,
    status: "ACTIVE",
    createdAt: new Date("2024-09-27T10:00:00Z"),
    updatedAt: new Date("2024-09-27T10:00:00Z"),
    prices: generarPreciosSeguros(),
  },
  {
    id: "323e4567-e89b-12d3-a456-426614174002",
    planTypeId: "58857232-0ea5-4f84-a5e4-e879fc4e0f1c",
    companyId: "39dabe22-8595-47fe-b4b3-8e80175d7669",
    sumInsured: 2000000,
    coInsurance: 0,
    coInsuranceCap: 0,
    status: "ACTIVE",
    createdAt: new Date("2024-09-27T11:00:00Z"),
    updatedAt: new Date("2024-09-27T11:00:00Z"),
    isRecommended: true,
    prices: generarPreciosSeguros(),
  },
];

export const planTypes: PlanType[] = [
  {
    id: "4f3d0c2c-244e-4895-a85b-1868a063c4eb",
    name: "Plan Básico",
    status: "ACTIVE",
    createdAt: new Date("2024-09-27T11:00:00Z"),
    updatedAt: new Date("2024-09-27T11:00:00Z"),
  },
  {
    id: "35fd5713-4f1c-401d-b37d-fc56b179f732",
    name: "Plan Intermedio",
    status: "ACTIVE",
    createdAt: new Date("2024-09-27T11:00:00Z"),
    updatedAt: new Date("2024-09-27T11:00:00Z"),
  },
  {
    id: "333fada3-537a-4596-b1b7-87fb724d9671",
    name: "Plan Plus",
    status: "ACTIVE",
    createdAt: new Date("2024-09-27T11:00:00Z"),
    updatedAt: new Date("2024-09-27T11:00:00Z"),
  },
  {
    id: "58857232-0ea5-4f84-a5e4-e879fc4e0f1c",
    name: "Hibrido",
    status: "ACTIVE",
    createdAt: new Date("2024-09-27T11:00:00Z"),
    updatedAt: new Date("2024-09-27T11:00:00Z"),
  },
];
