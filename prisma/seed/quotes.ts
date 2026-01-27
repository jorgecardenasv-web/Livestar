
import { Prisma, PrismaClient, QuoteStatus } from "@generated/prisma/client";
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
        const firstPerson = additionalInfo.protectedPersons[0];
        const sameRelationshipCount = additionalInfo.protectedPersons.filter(
          (p: any) => p.relationship === firstPerson.relationship
        ).length;

        persona =
          sameRelationshipCount > 1
            ? `${firstPerson.relationship} 1`
            : firstPerson.relationship;
      } else {
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

const createMembersData = (
  protectWho: string,
  additionalInfo: any,
  isHDI: boolean = false
) => {
  const membersData: any = {};
  const mainPrice = faker.number.float({
    min: 8000,
    max: 15000,
    fractionDigits: 2,
  });

  const generateHDIPrice = () => {
    const primerMes = faker.number.float({
      min: 2500,
      max: 5000,
      fractionDigits: 2,
    });
    const segundoMesADoce = faker.number.float({
      min: 800,
      max: 2500,
      fractionDigits: 2,
    });
    return {
      primerMes,
      segundoMesADoce,
      anual: primerMes + segundoMesADoce * 11,
    };
  };

  switch (protectWho) {
    case "solo_yo":
      if (isHDI) {
        membersData.main = generateHDIPrice();
      } else {
        membersData.main = mainPrice;
      }
      break;

    case "mi_pareja_y_yo":
      if (isHDI) {
        membersData.main = generateHDIPrice();
        membersData.partner = generateHDIPrice();
      } else {
        membersData.main = mainPrice;
        membersData.partner = faker.number.float({
          min: 8000,
          max: 15000,
          fractionDigits: 2,
        });
      }
      break;

    case "familia":
    case "mis_hijos_y_yo":
      if (isHDI) {
        membersData.main = generateHDIPrice();
        if (additionalInfo.partnerAge) {
          membersData.partner = generateHDIPrice();
        }
        if (additionalInfo.children) {
          membersData.children = additionalInfo.children.map(() =>
            generateHDIPrice()
          );
        }
      } else {
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
      }
      break;

    case "solo_mis_hijos":
      if (additionalInfo.children) {
        if (isHDI) {
          membersData.children = additionalInfo.children.map(() =>
            generateHDIPrice()
          );
        } else {
          membersData.children = additionalInfo.children.map(() =>
            faker.number.float({ min: 5000, max: 10000, fractionDigits: 2 })
          );
        }
      }
      break;

    case "mis_padres":
      membersData.parents = [];
      if (additionalInfo.momAge) {
        if (isHDI) {
          const hdiPrice = generateHDIPrice();
          membersData.parents.push({
            name: additionalInfo.momName,
            price: hdiPrice.anual,
            primerMes: hdiPrice.primerMes,
            segundoMesADoce: hdiPrice.segundoMesADoce,
          });
        } else {
          membersData.parents.push({
            name: additionalInfo.momName,
            price: faker.number.float({
              min: 12000,
              max: 20000,
              fractionDigits: 2,
            }),
          });
        }
      }
      if (additionalInfo.dadAge) {
        if (isHDI) {
          const hdiPrice = generateHDIPrice();
          membersData.parents.push({
            name: additionalInfo.dadName,
            price: hdiPrice.anual,
            primerMes: hdiPrice.primerMes,
            segundoMesADoce: hdiPrice.segundoMesADoce,
          });
        } else {
          membersData.parents.push({
            name: additionalInfo.dadName,
            price: faker.number.float({
              min: 12000,
              max: 20000,
              fractionDigits: 2,
            }),
          });
        }
      }
      break;

    case "otros":
      if (additionalInfo.protectedPersons) {
        if (isHDI) {
          membersData.others = additionalInfo.protectedPersons.map(
            (person: any) => {
              const hdiPrice = generateHDIPrice();
              return {
                name: person.relationship,
                price: hdiPrice.anual,
                primerMes: hdiPrice.primerMes,
                segundoMesADoce: hdiPrice.segundoMesADoce,
              };
            }
          );
        } else {
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

const createCoInsuranceData = (baseCoInsurance: number) => {
  const coInsurance = {
    opcion_2: {
      A: baseCoInsurance,
      B: baseCoInsurance + 5,
      C: baseCoInsurance + 10,
      D: baseCoInsurance + 15,
    },
    opcion_4: {
      A: baseCoInsurance + 5,
      B: baseCoInsurance + 10,
      C: baseCoInsurance + 15,
      D: baseCoInsurance + 20,
    },
  };
  return coInsurance;
};

const createCoInsuranceCapData = (baseCoInsuranceCap: number) => {
  const coInsuranceCap = {
    opcion_2: {
      A: baseCoInsuranceCap,
      B: baseCoInsuranceCap * 1.25,
      C: baseCoInsuranceCap * 1.5,
      D: baseCoInsuranceCap * 1.75,
    },
    opcion_4: {
      A: baseCoInsuranceCap * 1.25,
      B: baseCoInsuranceCap * 1.5,
      C: baseCoInsuranceCap * 1.75,
      D: baseCoInsuranceCap * 2,
    },
  };
  return coInsuranceCap;
};

export const seedQuotes = async (
  prisma: PrismaClient,
  advisors: any[],
  plans: any[]
) => {
  const QUOTES_TO_CREATE = 50;

  const gnpPlans = plans.filter((plan) => plan.company.name === "GNP Seguros");
  const hdiPlans = plans.filter((plan) => plan.company.name === "HDI Seguros");

  for (let i = 0; i < QUOTES_TO_CREATE; i++) {
    const protectWho = faker.helpers.arrayElement(PROTECT_WHO_OPTIONS);
    const additionalInfo = createAdditionalInfo(protectWho);
    const baseDeductible = faker.number.int({ min: 9500, max: 25000 });
    const coverageFee = faker.number.float({
      min: 20000,
      max: 100000,
      fractionDigits: 2,
    });

    const useGnp = i % 3 !== 0;
    const selectedPlan = useGnp
      ? faker.helpers.arrayElement(gnpPlans)
      : faker.helpers.arrayElement(hdiPlans);

    const baseCoInsurance = faker.helpers.arrayElement([5, 10, 15]);
    const baseCoInsuranceCap = faker.number.float({
      min: 30000,
      max: 60000,
      fractionDigits: 2,
    });

    const isMultipleCoInsurance = useGnp;
    const isMultipleDeductible = useGnp;

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

    const coInsuranceData = useGnp
      ? createCoInsuranceData(baseCoInsurance)
      : null;

    const coInsuranceCapData = useGnp
      ? createCoInsuranceCapData(baseCoInsuranceCap)
      : null;

    const quote = await prisma.quote.create({
      data: {
        prospectId: prospect.id,
        planData: selectedPlan,
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

        coverageFee,

        paymentType: useGnp
          ? faker.helpers.arrayElement(["Anual", "Mensual"])
          : "Mensual",
        sumInsured:
          selectedPlan.sumInsured ||
          faker.number.float({
            min: 5000000,
            max: 15000000,
            fractionDigits: 2,
          }),
        deductible: baseDeductible,
        coInsurance: baseCoInsurance,
        coInsuranceCap: baseCoInsuranceCap,

        membersData: createMembersData(protectWho, additionalInfo, !useGnp),

        isMultipleDeductible: isMultipleDeductible,
        deductiblesData: useGnp
          ? createDeductiblesData(baseDeductible)
          : Prisma.JsonNull,

        isMultipleCoInsurance: isMultipleCoInsurance,
        coInsuranceData: coInsuranceData || Prisma.JsonNull,
        coInsuranceCapData: coInsuranceCapData || Prisma.JsonNull,
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
};
