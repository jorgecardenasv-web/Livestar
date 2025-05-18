import { hash } from "bcrypt";
import prisma from "../../src/lib/prisma";

async function main() {
  // Eliminamos registros anteriores para prevenir duplicados
  await prisma.plan.deleteMany();
  await prisma.planType.deleteMany();
  await prisma.insurance.deleteMany();
  await prisma.trackingNumber.deleteMany();
  await prisma.quote.deleteMany();
  await prisma.prospect.deleteMany();

  // Creamos el usuario administrador
  const adminPassword = "AdminPass123";
  const hashedAdminPassword = await hash(adminPassword, 10);

  await prisma.user.create({
    data: {
      name: "Administrador",
      email: "admin@example.com",
      password: hashedAdminPassword,
      role: "ADMIN",
      status: "ACTIVO",
    },
  });

  // Creación de aseguradoras
  console.log("🏢 Creando aseguradoras...");
  await prisma.insurance.createMany({
    data: [
      {
        id: "975a629c-c2c0-4fd4-b92c-aacfee8cb164",
        name: "GNP Seguros",
        logo: "gnp.svg",
        description:
          "Grupo Nacional Provincial - Líder en seguros de gastos médicos mayores en México",
        status: "ACTIVO",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "f1647fe3-40d6-4446-814b-c1916a2ae982",
        name: "HDI Seguros",
        logo: "hdi.svg",
        description: "HDI Seguros - Soluciones innovadoras en seguros de salud",
        status: "ACTIVO",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    skipDuplicates: true,
  });

  // Creación de tipos de planes
  console.log("📋 Creando tipos de planes...");
  await prisma.planType.createMany({
    data: [
      {
        id: "3d9a1e51-9612-43a4-a0bf-4b68523d272c",
        name: "Plan Básico",
        status: "ACTIVO",
        orderIndex: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "9af3201f-06da-4805-99e0-e3f4dc6900f1",
        name: "Plan Intermedio",
        status: "ACTIVO",
        orderIndex: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "333fada3-537a-4596-b1b7-87fb724d9671",
        name: "Plan Plus",
        status: "ACTIVO",
        orderIndex: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "ce4ec4e3-e706-44c3-af00-ab16a07bcd69",
        name: "Híbrido",
        status: "ACTIVO",
        orderIndex: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    skipDuplicates: true,
  });

  // Funciones para generar precios
  const generarPreciosSeguros = () => {
    const resultado: Record<string, any> = {};

    for (let edad = 0; edad <= 84; edad++) {
      const factorEdad = 1 + Math.pow(edad / 30, 2);
      const masculinoMensual =
        Math.round((Math.random() * 150 + 50) * factorEdad * 100) / 100;
      const femeninoMensual =
        Math.round((Math.random() * 110 + 40) * factorEdad * 100) / 100;

      resultado[edad.toString()] = {
        hombre: {
          mensual: masculinoMensual,
          anual: Math.round(masculinoMensual * 11.5 * 100) / 100,
        },
        mujer: {
          mensual: femeninoMensual,
          anual: Math.round(femeninoMensual * 11.5 * 100) / 100,
        },
      };
    }
    return resultado;
  };

  const generarPreciosHDI = () => {
    const resultado: Record<string, any> = {};

    for (let edad = 0; edad <= 84; edad++) {
      const factorEdad = 1 + Math.pow(edad / 30, 1.8);
      const primerMes =
        Math.round((Math.random() * 200 + 100) * factorEdad * 100) / 100;
      const segundoMesADoce =
        Math.round((Math.random() * 170 + 80) * factorEdad * 100) / 100;

      resultado[edad.toString()] = {
        primerMes,
        segundoMesADoce,
        anual:
          Math.round((primerMes + segundoMesADoce * 11) * 0.95 * 100) / 100,
      };
    }
    return resultado;
  };

  // Creación de planes
  console.log("🏥 Creando planes...");

  // Plan GNP con múltiples deducibles
  await prisma.plan.create({
    data: {
      id: "73f9d6f3-0e64-4f67-ba12-60f0b070c028",
      planTypeId: "9af3201f-06da-4805-99e0-e3f4dc6900f1", // Plan Intermedio
      companyId: "975a629c-c2c0-4fd4-b92c-aacfee8cb164", // GNP
      sumInsured: 10000000,
      coInsurance: 10,
      coInsuranceCap: 40000,
      status: "ACTIVO",
      isRecommended: true,
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
  });

  // Plan GNP Plus con múltiples deducibles
  await prisma.plan.create({
    data: {
      id: "91a8d7e5-3b42-4c9f-b6a1-5d2e8f1c9e0d",
      planTypeId: "333fada3-537a-4596-b1b7-87fb724d9671", // Plan Plus
      companyId: "975a629c-c2c0-4fd4-b92c-aacfee8cb164", // GNP
      sumInsured: 20000000,
      coInsurance: 5,
      coInsuranceCap: 30000,
      status: "ACTIVO",
      isRecommended: false,
      prices: generarPreciosSeguros(),
      deductibles: {
        opcion_2: {
          A: 20000,
          B: 30000,
          C: 40000,
          D: 50000,
        },
        opcion_4: {
          A: 40000,
          B: 50000,
          C: 60000,
          D: 70000,
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Plan HDI con su estructura específica de precios
  await prisma.plan.create({
    data: {
      id: "24ec1aba-d7d9-4090-9c61-fa9a324b96bb",
      planTypeId: "ce4ec4e3-e706-44c3-af00-ab16a07bcd69", // Híbrido
      companyId: "f1647fe3-40d6-4446-814b-c1916a2ae982", // HDI
      sumInsured: 5000000,
      coInsurance: 0,
      coInsuranceCap: 0,
      status: "ACTIVO",
      isRecommended: true,
      prices: generarPreciosHDI(),
      deductibles: {
        default: 25000,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Plan HDI Básico
  await prisma.plan.create({
    data: {
      id: "56e2c1d9-a8f3-4b7e-9c2d-1e5a7f8b9c0d",
      planTypeId: "3d9a1e51-9612-43a4-a0bf-4b68523d272c", // Plan Básico
      companyId: "f1647fe3-40d6-4446-814b-c1916a2ae982", // HDI
      sumInsured: 3000000,
      coInsurance: 5,
      coInsuranceCap: 20000,
      status: "ACTIVO",
      isRecommended: false,
      prices: generarPreciosHDI(),
      deductibles: {
        default: 35000,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log("Seed completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
