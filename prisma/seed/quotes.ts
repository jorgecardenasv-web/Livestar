import { PrismaClient, QuoteStatus } from "@prisma/client";
import { faker } from "@faker-js/faker/locale/es";

const PROTECT_WHO_OPTIONS = [
  "solo_yo",
  "mi_pareja_y_yo",
  "familia",
  "mis_hijos_y_yo",
  "solo_mis_hijos",
  "otros",
  "mis_padres",
] as const;

const createEmptyHealthCondition = () => ({
  tipoEvento: "",
  estadoSalud: "Sano",
  medicamento: "No",
  complicacion: "No",
  hospitalizado: "No",
  tipoTratamiento: "",
  detalleMedicamento: "",
  nombrePadecimiento: "",
  detalleComplicacion: "",
});

const createMedicalHistory = () => {
  return Array(4)
    .fill(null)
    .map((_, index) => ({
      answer: index === 0 ? "Sí" : "No",
      questionId: index,
      healthConditions: [
        index === 0
          ? {
              persona: "Yo",
              tipoEvento: "1",
              estadoSalud: "Sano",
              fechaInicio: "2025-02-03T06:00:00.000Z",
              medicamento: "No",
              complicacion: "No",
              hospitalizado: "No",
              tipoTratamiento: "2",
              detalleMedicamento: "",
              nombrePadecimiento: "Padecimiento de prueba",
              detalleComplicacion: "",
            }
          : createEmptyHealthCondition(),
      ],
    }));
};

const createAdditionalInfo = (
  protectWho: (typeof PROTECT_WHO_OPTIONS)[number]
) => {
  switch (protectWho) {
    case "solo_yo":
      return {};

    case "mi_pareja_y_yo":
      return {
        partnerAge: faker.number.int({ min: 18, max: 65 }),
        partnerGender: faker.helpers.arrayElement(["hombre", "mujer"]),
      };

    case "familia":
      const childrenCount = faker.number.int({ min: 1, max: 4 });
      return {
        partnerAge: faker.number.int({ min: 25, max: 65 }),
        partnerGender: faker.helpers.arrayElement(["hombre", "mujer"]),
        childrenCount,
        children: Array.from({ length: childrenCount }, () => ({
          age: faker.number.int({ min: 0, max: 17 }),
          gender: faker.helpers.arrayElement(["hombre", "mujer"]),
        })),
      };

    case "mis_padres":
      return {
        momName: faker.person.fullName({ sex: "female" }),
        dadName: faker.person.fullName({ sex: "male" }),
        momAge: faker.number.int({ min: 50, max: 80 }),
        dadAge: faker.number.int({ min: 50, max: 80 }),
      };

    default:
      return {};
  }
};

export const seedQuotes = async (
  prisma: PrismaClient,
  advisors: any[],
  plans: any[]
) => {
  const QUOTES_TO_CREATE = 50;

  for (let i = 0; i < QUOTES_TO_CREATE; i++) {
    const protectWho = faker.helpers.arrayElement(PROTECT_WHO_OPTIONS);
    const prospect = await prisma.prospect.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        gender: faker.helpers.arrayElement(["hombre", "mujer"]),
        whatsapp: faker.phone.number(),
        age: faker.number.int({ min: 18, max: 65 }),
        postalCode: faker.location.zipCode("#####"),
        isVerified: faker.datatype.boolean(),
      },
    });

    const quote = await prisma.quote.create({
      data: {
        prospectId: prospect.id,
        planId: faker.helpers.arrayElement(plans).id,
        userId: faker.helpers.arrayElement(advisors).id,
        totalPrice: faker.number.float({
          min: 1000,
          max: 5000,
          fractionDigits: 2,
        }),
        protectWho,
        additionalInfo: createAdditionalInfo(protectWho),
        medicalHistories: createMedicalHistory(),
        status: faker.helpers.arrayElement([
          QuoteStatus.NUEVO,
          QuoteStatus.CONTACTADO,
          QuoteStatus.EN_PROGRESO,
          QuoteStatus.CERRADO,
        ]),
      },
    });

    await prisma.trackingNumber.create({
      data: {
        number: `TM-${faker.string.alphanumeric(8).toUpperCase()}`,
        quoteId: quote.id,
        lastActivity: new Date(),
        activityLog: {
          actividades: [
            {
              fecha: new Date(),
              descripcion: "Cotización creada",
            },
          ],
        },
      },
    });
  }

  console.log(
    `✅ Created ${QUOTES_TO_CREATE} quotes with prospects and tracking numbers`
  );
};
