import prisma from "@/lib/prisma";
import * as bcrypt from "bcryptjs";

async function main() {
  console.log("🧹 Limpiando base de datos...");

  // Eliminamos todos los registros anteriores para prevenir duplicados
  // El orden es importante para respetar las restricciones de claves foráneas

  // Primero eliminamos registros que tienen dependencias
  await prisma.quote.deleteMany();
  await prisma.plan.deleteMany();
  await prisma.trackingNumber.deleteMany();

  // Luego eliminamos registros intermedios
  await prisma.prospect.deleteMany();
  await prisma.planType.deleteMany();
  await prisma.insurance.deleteMany();

  // Finalmente eliminamos usuarios (excepto el admin si deseamos preservarlo)
  // Para un seed limpio, eliminamos todos los usuarios
  await prisma.user.deleteMany();

  console.log("✅ Base de datos limpiada exitosamente");

  // Creamos el usuario administrador
  const adminPassword = "AdminPass123";
  const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);

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
        name: "Plan Superior",
        status: "ACTIVO",
        orderIndex: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "ce4ec4e3-e706-44c3-af00-ab16a07bcd69",
        name: "Gastos Menores",
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

  // Plan GNP Básico con múltiples coaseguros
  await prisma.plan.create({
    data: {
      id: "73f9d6f3-0e64-4f67-ba12-60f0b070c028",
      planTypeId: "3d9a1e51-9612-43a4-a0bf-4b68523d272c", // Plan Básico
      companyId: "975a629c-c2c0-4fd4-b92c-aacfee8cb164", // GNP
      sumInsured: 5000000,
      coInsurance: {
        opcion_2: {
          A: 15,
          B: 20,
          C: 25,
          D: 30,
        },
        opcion_4: {
          A: 20,
          B: 25,
          C: 30,
          D: 35,
        },
      },
      coInsuranceCap: {
        opcion_2: {
          A: 50000,
          B: 60000,
          C: 70000,
          D: 80000,
        },
        opcion_4: {
          A: 60000,
          B: 70000,
          C: 80000,
          D: 90000,
        },
      },
      status: "ACTIVO",
      isRecommended: false,
      prices: generarPreciosSeguros(),
      deductibles: {
        opcion_2: {
          A: 30000,
          B: 40000,
          C: 50000,
          D: 60000,
        },
        opcion_4: {
          A: 60000,
          B: 70000,
          C: 80000,
          D: 90000,
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Plan GNP Intermedio con múltiples coaseguros
  await prisma.plan.create({
    data: {
      id: "91a8d7e5-3b42-4c9f-b6a1-5d2e8f1c9e0d",
      planTypeId: "9af3201f-06da-4805-99e0-e3f4dc6900f1", // Plan Intermedio
      companyId: "975a629c-c2c0-4fd4-b92c-aacfee8cb164", // GNP
      sumInsured: 10000000,
      coInsurance: {
        opcion_2: {
          A: 10,
          B: 15,
          C: 20,
          D: 25,
        },
        opcion_4: {
          A: 15,
          B: 20,
          C: 25,
          D: 30,
        },
      },
      coInsuranceCap: {
        opcion_2: {
          A: 40000,
          B: 50000,
          C: 60000,
          D: 70000,
        },
        opcion_4: {
          A: 50000,
          B: 60000,
          C: 70000,
          D: 80000,
        },
      },
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

  // Plan GNP Superior con múltiples coaseguros
  await prisma.plan.create({
    data: {
      id: "5e6b7c8d-9f1a-2b3c-4d5e-6f7a8b9c0d1e",
      planTypeId: "333fada3-537a-4596-b1b7-87fb724d9671", // Plan Superior
      companyId: "975a629c-c2c0-4fd4-b92c-aacfee8cb164", // GNP
      sumInsured: 20000000,
      coInsurance: {
        opcion_2: {
          A: 5,
          B: 10,
          C: 15,
          D: 20,
        },
        opcion_4: {
          A: 10,
          B: 15,
          C: 20,
          D: 25,
        },
      },
      coInsuranceCap: {
        opcion_2: {
          A: 30000,
          B: 40000,
          C: 50000,
          D: 60000,
        },
        opcion_4: {
          A: 40000,
          B: 50000,
          C: 60000,
          D: 70000,
        },
      },
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

  // Plan HDI Gastos Menores
  await prisma.plan.create({
    data: {
      id: "24ec1aba-d7d9-4090-9c61-fa9a324b96bb",
      planTypeId: "ce4ec4e3-e706-44c3-af00-ab16a07bcd69", // Gastos Menores
      companyId: "f1647fe3-40d6-4446-814b-c1916a2ae982", // HDI
      sumInsured: 5000000,
      coInsurance: { value: 5 },
      coInsuranceCap: { value: 25000 },
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

  // Creamos algunos asesores para asignar a las cotizaciones
  console.log("👨‍💼 Creando asesores...");

  const asesores = [];
  for (let i = 0; i < 5; i++) {
    const asesor = await prisma.user.create({
      data: {
        name: `Asesor ${i + 1}`,
        email: `asesor${i + 1}@livestar.com`,
        password: await bcrypt.hash("Asesor123", 10),
        role: "ASESOR",
        status: "ACTIVO",
      },
    });
    asesores.push(asesor);
  }

  // Obtener todos los planes creados
  const planes = await prisma.plan.findMany({
    include: {
      planType: true,
      company: true,
    },
  });

  // Cargar cotizaciones
  console.log("📋 Creando cotizaciones...");
  const { seedQuotes } = require("./quotes");
  await seedQuotes(prisma, asesores, planes);

  console.log("✅ Seed completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
