import { z } from "zod";

const priceDataSchema = z.object({
  age: z.string().transform((val) => Number(val)),
  monthlyPriceMale: z.string().transform((val) => Number(val)),
  monthlyPriceFemale: z.string().transform((val) => Number(val)),
  annualPriceMale: z.string().transform((val) => Number(val)),
  annualPriceFemale: z.string().transform((val) => Number(val)),
});

const deductibleSchema = z
  .string()
  .optional()
  .transform((val) => (val ? Number(val) : undefined));

export const createPlanSchema = z
  .object({
    planTypeId: z.string(),
    companyId: z.string(),
    sumInsured: z.string().transform((val) => Number(val)),
    coInsurance: z.string().transform((val) => Number(val)),
    coInsuranceCap: z.string().transform((val) => Number(val)),
    prices: z.string(),
    isMultiple: z.string().transform((val) => val === "true"),
    "deducible.default": deductibleSchema,
    "deducible.opcion_2.A": deductibleSchema,
    "deducible.opcion_2.B": deductibleSchema,
    "deducible.opcion_2.C": deductibleSchema,
    "deducible.opcion_2.D": deductibleSchema,
    "deducible.opcion_4.A": deductibleSchema,
    "deducible.opcion_4.B": deductibleSchema,
    "deducible.opcion_4.C": deductibleSchema,
    "deducible.opcion_4.D": deductibleSchema,
    isUpdate: z.string().transform((val) => val === "true"),
    planId: z.string(),
  })
  .transform((data) => {
    // Transformación final para estructurar el objeto deducible
    const deductibles: any = {};

    if (!data.isMultiple && data["deducible.default"]) {
      deductibles.default = data["deducible.default"];
    } else {
      ["2", "4"].forEach((opcion) => {
        const opcionData = ["A", "B", "C", "D"]
          .map((nivel) => ({
            nivel,
            valor:
              data[`deducible.opcion_${opcion}.${nivel}` as keyof typeof data],
          }))
          .filter(({ valor }) => valor !== undefined);

        if (opcionData.length > 0) {
          deductibles[`opcion_${opcion}`] = Object.fromEntries(
            opcionData.map(({ nivel, valor }) => [nivel, valor])
          );
        }
      });
    }

    // Limpiamos los campos planos del deducible y retornamos el objeto final
    const {
      "deducible.default": _,
      "deducible.opcion_2.A": __,
      "deducible.opcion_2.B": ___,
      "deducible.opcion_2.C": ____,
      "deducible.opcion_2.D": _____,
      "deducible.opcion_4.A": ______,
      "deducible.opcion_4.B": _______,
      "deducible.opcion_4.C": ________,
      "deducible.opcion_4.D": _________,
      ...rest
    } = data;

    return {
      ...rest,
      deductibles,
    };
  });
