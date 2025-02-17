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

const createMedicalHistory = (protectWho: string, additionalInfo: any) => {
  return Array(4)
    .fill(null)
    .map((_, index) => {
      let persona;
      if (
        protectWho === "otros" &&
        additionalInfo.protectedPersons?.length > 0
      ) {
        // Obtener el relationship y contar cuántas veces aparece
        const firstPerson = additionalInfo.protectedPersons[0];
        const sameRelationshipCount = additionalInfo.protectedPersons.filter(
          (p: any) => p.relationship === firstPerson.relationship
        ).length;

        // Si hay más de uno con el mismo relationship, agregar un número
        persona =
          sameRelationshipCount > 1
            ? `${firstPerson.relationship} 1`
            : firstPerson.relationship;
      } else {
        // El resto del código para otros casos se mantiene igual
        const personaMapping: Record<string, string> = {
          solo_yo: "Yo",
          mi_pareja_y_yo: "Yo",
          familia: "Yo",
          mis_hijos_y_yo: "Yo",
          solo_mis_hijos:
            additionalInfo.children?.[0]?.gender === "mujer"
              ? "Hija 1"
              : "Hijo 1",
          mis_padres: "Madre",
        };
        persona = personaMapping[protectWho] || "Yo";
      }

      return {
        answer: index === 0 ? "Sí" : "No",
        [`answer-${index}`]: index === 0 ? "Sí" : "No",
        questionId: index,
        healthConditions: [
          index === 0
            ? {
                persona,
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
        activePadecimiento: index === 0 ? 0 : null,
      };
    });
};

const createAdditionalInfo = (
  protectWho: (typeof PROTECT_WHO_OPTIONS)[number]
) => {
  const baseAge = faker.number.int({ min: 18, max: 65 });

  switch (protectWho) {
    case "solo_yo":
      return {
        age: baseAge,
      };

    case "mi_pareja_y_yo":
      return {
        age: baseAge,
        partnerAge: faker.number.int({ min: 18, max: 65 }),
        partnerGender: faker.helpers.arrayElement(["hombre", "mujer"]),
      };

    case "familia":
      const familyChildrenCount = faker.number.int({ min: 1, max: 4 });
      return {
        age: baseAge,
        partnerAge: faker.number.int({ min: 25, max: 65 }),
        partnerGender: faker.helpers.arrayElement(["hombre", "mujer"]),
        childrenCount: familyChildrenCount,
        children: Array.from({ length: familyChildrenCount }, () => ({
          age: faker.number.int({ min: 0, max: 17 }),
          gender: faker.helpers.arrayElement(["hombre", "mujer"]),
        })),
      };

    case "mis_hijos_y_yo":
      const childrenCount = faker.number.int({ min: 1, max: 4 });
      return {
        age: baseAge,
        childrenCount,
        children: Array.from({ length: childrenCount }, () => ({
          age: faker.number.int({ min: 0, max: 17 }),
          gender: faker.helpers.arrayElement(["hombre", "mujer"]),
        })),
      };

    case "solo_mis_hijos":
      const soloChildrenCount = faker.number.int({ min: 1, max: 4 });
      return {
        childrenCount: soloChildrenCount,
        children: Array.from({ length: soloChildrenCount }, () => ({
          age: faker.number.int({ min: 0, max: 17 }),
          gender: faker.helpers.arrayElement(["hombre", "mujer"]),
        })),
      };

    case "otros":
      const protectedCount = faker.number.int({ min: 1, max: 4 });
      return {
        protectedCount,
        protectedPersons: Array.from({ length: protectedCount }, () => ({
          relationship: faker.helpers.arrayElement([
            "Hermano",
            "Hermana",
            "Tío",
            "Tía",
            "Sobrino",
            "Sobrina",
            "Primo",
            "Prima",
          ]),
          age: faker.number.int({ min: 0, max: 80 }),
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

const createMembersData = (protectWho: string, additionalInfo: any) => {
  const membersData: any = {};
  const mainPrice = faker.number.float({
    min: 8000,
    max: 15000,
    fractionDigits: 2,
  });

  switch (protectWho) {
    case "solo_yo":
      membersData.main = mainPrice;
      break;

    case "mi_pareja_y_yo":
      membersData.main = mainPrice;
      membersData.partner = faker.number.float({
        min: 8000,
        max: 15000,
        fractionDigits: 2,
      });
      break;

    case "familia":
    case "mis_hijos_y_yo":
      membersData.main = mainPrice;
      if (additionalInfo.partnerAge) {
        membersData.partner = faker.number.float({
          min: 8000,
          max: 15000,
          fractionDigits: 2,
        });
      }
      if (additionalInfo.children) {
        membersData.children = additionalInfo.children.map(() =>
          faker.number.float({ min: 5000, max: 10000, fractionDigits: 2 })
        );
      }
      break;

    case "solo_mis_hijos":
      if (additionalInfo.children) {
        membersData.children = additionalInfo.children.map(() =>
          faker.number.float({ min: 5000, max: 10000, fractionDigits: 2 })
        );
      }
      break;

    case "mis_padres":
      membersData.parents = [];
      if (additionalInfo.momAge) {
        membersData.parents.push({
          name: additionalInfo.momName,
          price: faker.number.float({
            min: 12000,
            max: 20000,
            fractionDigits: 2,
          }),
        });
      }
      if (additionalInfo.dadAge) {
        membersData.parents.push({
          name: additionalInfo.dadName,
          price: faker.number.float({
            min: 12000,
            max: 20000,
            fractionDigits: 2,
          }),
        });
      }
      break;

    case "otros":
      if (additionalInfo.protectedPersons) {
        membersData.others = additionalInfo.protectedPersons.map(
          (person: any) => ({
            name: person.relationship,
            price: faker.number.float({
              min: 8000,
              max: 15000,
              fractionDigits: 2,
            }),
          })
        );
      }
      break;
  }

  return membersData;
};

const createDeductiblesData = (baseDeductible: number) => {
  const deductibles = {
    opcion_2: {
      A: baseDeductible * 3,
      B: baseDeductible * 2,
      C: baseDeductible * 1.5,
      D: baseDeductible,
    },
    opcion_4: {
      A: baseDeductible * 5,
      B: baseDeductible * 4,
      C: baseDeductible * 3,
      D: baseDeductible * 2,
    },
  };
  return deductibles;
};

export const seedQuotes = async (
  prisma: PrismaClient,
  advisors: any[],
  plans: any[]
) => {
  const QUOTES_TO_CREATE = 50;

  for (let i = 0; i < QUOTES_TO_CREATE; i++) {
    const protectWho = faker.helpers.arrayElement(PROTECT_WHO_OPTIONS);
    const additionalInfo = createAdditionalInfo(protectWho);
    const baseDeductible = faker.number.int({ min: 9500, max: 25000 });
    const coverageFee = faker.number.float({
      min: 20000,
      max: 100000,
      fractionDigits: 2,
    });

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
        totalPrice: coverageFee,
        protectWho,
        additionalInfo,
        medicalHistories: createMedicalHistory(protectWho, additionalInfo),
        status: faker.helpers.arrayElement([
          QuoteStatus.NUEVO,
          QuoteStatus.CONTACTADO,
          QuoteStatus.EN_PROGRESO,
          QuoteStatus.CERRADO,
        ]),
        // Nuevos campos
        coverageFee,
        paymentType: faker.helpers.arrayElement([
          "Anual",
          "Semestral",
          "Trimestral",
          "Mensual",
        ]),
        sumInsured: faker.number.float({
          min: 5000000,
          max: 15000000,
          fractionDigits: 2,
        }),
        deductible: baseDeductible,
        coInsurance: faker.helpers.arrayElement([10, 20, 30]),
        coInsuranceCap: faker.number.float({
          min: 30000,
          max: 60000,
          fractionDigits: 2,
        }),
        membersData: createMembersData(protectWho, additionalInfo),
        isMultipleDeductible: faker.datatype.boolean(),
        deductiblesData: createDeductiblesData(baseDeductible),
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
