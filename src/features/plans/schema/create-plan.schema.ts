import { z } from "zod";

const deductibleSchema = z
  .string()
  .nullable()
  .optional()
  .transform((val) =>
    val === null || val === undefined ? undefined : Number(val)
  );

export const createPlanSchema = z
  .object({
    planTypeId: z.string(),
    companyId: z.string(),
    sumInsured: z.string().transform((val) => Number(val)),
    coInsurance: z
      .string()
      .optional()
      .transform((val) =>
        val === undefined || val === null || val === "" ? 0 : Number(val)
      ),
    coInsuranceCap: z
      .string()
      .optional()
      .transform((val) =>
        val === undefined || val === null || val === "" ? 0 : Number(val)
      ),
    prices: z.string(),
    isMultiple: z.string().transform((val) => val === "true"),
    isMultipleCoInsurance: z
      .string()
      .transform((val) => val === "true")
      .optional()
      .default("false"),
    isHDI: z.string().transform((val) => val === "true"),
    additionalInfoHtml: z.string().optional().nullable(),
    "coaseguro.opcion_2.A": deductibleSchema,
    "coaseguro.opcion_2.B": deductibleSchema,
    "coaseguro.opcion_2.C": deductibleSchema,
    "coaseguro.opcion_2.D": deductibleSchema,
    "coaseguro.opcion_4.A": deductibleSchema,
    "coaseguro.opcion_4.B": deductibleSchema,
    "coaseguro.opcion_4.C": deductibleSchema,
    "coaseguro.opcion_4.D": deductibleSchema,
    "tope.opcion_2.A": deductibleSchema,
    "tope.opcion_2.B": deductibleSchema,
    "tope.opcion_2.C": deductibleSchema,
    "tope.opcion_2.D": deductibleSchema,
    "tope.opcion_4.A": deductibleSchema,
    "tope.opcion_4.B": deductibleSchema,
    "tope.opcion_4.C": deductibleSchema,
    "tope.opcion_4.D": deductibleSchema,
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
    planId: z.string().optional(),
    isRecommended: z.string().transform((val) => val === "true"),
  })
  .transform((data) => {
    // Transformación final para estructurar el objeto deducible
    const deductibles: any = {};
    const coInsuranceValues: any = {};
    const coInsuranceCapValues: any = {};

    if (!data.isMultiple && data["deducible.default"] !== undefined) {
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

    // Procesamiento de coaseguro múltiple
    if (data.isMultipleCoInsurance) {
      ["2", "4"].forEach((opcion) => {
        const opcionData = ["A", "B", "C", "D"]
          .map((nivel) => ({
            nivel,
            valor:
              data[`coaseguro.opcion_${opcion}.${nivel}` as keyof typeof data],
          }))
          .filter(({ valor }) => valor !== undefined);

        if (opcionData.length > 0) {
          coInsuranceValues[`opcion_${opcion}`] = Object.fromEntries(
            opcionData.map(({ nivel, valor }) => [nivel, valor])
          );
        }
      });

      ["2", "4"].forEach((opcion) => {
        const opcionData = ["A", "B", "C", "D"]
          .map((nivel) => ({
            nivel,
            valor: data[`tope.opcion_${opcion}.${nivel}` as keyof typeof data],
          }))
          .filter(({ valor }) => valor !== undefined);

        if (opcionData.length > 0) {
          coInsuranceCapValues[`opcion_${opcion}`] = Object.fromEntries(
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
      "coaseguro.opcion_2.A": c1,
      "coaseguro.opcion_2.B": c2,
      "coaseguro.opcion_2.C": c3,
      "coaseguro.opcion_2.D": c4,
      "coaseguro.opcion_4.A": c5,
      "coaseguro.opcion_4.B": c6,
      "coaseguro.opcion_4.C": c7,
      "coaseguro.opcion_4.D": c8,
      "tope.opcion_2.A": t1,
      "tope.opcion_2.B": t2,
      "tope.opcion_2.C": t3,
      "tope.opcion_2.D": t4,
      "tope.opcion_4.A": t5,
      "tope.opcion_4.B": t6,
      "tope.opcion_4.C": t7,
      "tope.opcion_4.D": t8,
      ...rest
    } = data;

    // Asegurarse de que siempre haya un objeto de coInsurance válido
    const coInsurance = data.isMultipleCoInsurance
      ? Object.keys(coInsuranceValues).length > 0
        ? coInsuranceValues
        : { value: data.coInsurance || 0 }
      : { value: data.coInsurance || 0 };

    // Asegurarse de que siempre haya un objeto de coInsuranceCap válido
    const coInsuranceCap = data.isMultipleCoInsurance
      ? Object.keys(coInsuranceCapValues).length > 0
        ? coInsuranceCapValues
        : { value: data.coInsuranceCap || 0 }
      : { value: data.coInsuranceCap || 0 };

    // Asegurémonos de que additionalInfoHtml se preserve en la transformación
    console.log(
      "Schema transform - additionalInfoHtml:",
      rest.additionalInfoHtml
    );

    const result = {
      ...rest,
      deductibles,
      coInsurance,
      coInsuranceCap,
    };

    console.log("Schema transform - Resultado final:", result);
    return result;
  });
