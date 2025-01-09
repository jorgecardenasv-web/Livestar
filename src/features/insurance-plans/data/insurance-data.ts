import { InsuranceCompany, Prisma } from "@prisma/client";

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
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "HDI Seguros",
    logo: "/api/images/bupa-hdi.svg",
    description: "Compañía líder en seguros de salud",
    status: "ACTIVE",
    createdAt: new Date("2024-09-27T10:00:00Z"),
    updatedAt: new Date("2024-09-27T10:00:00Z"),
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
    prices: generarPreciosSeguros(),
  },
  {
    id: "323e4567-e89b-12d3-a456-426614174002",
    name: "Hibrido",
    companyId: "123e4567-e89b-12d3-a456-426614174000",
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
