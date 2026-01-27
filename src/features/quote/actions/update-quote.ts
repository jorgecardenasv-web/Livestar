"use server";

import { prefix } from "@/features/layout/nav-config/constants";
import { revalidatePath } from "next/cache";
import { updateQuoteService } from "../services/update/update-quote.service";
import { parsedFormDataAge } from "@/shared/utils";
import { FormState } from "@/shared/types";
import { PrismaError } from "@/shared/errors/prisma";
import { getInsurancePlanByIdService } from "@/features/plans/services/read/get-insurance-plan-by-id.service";
import { calculateInsurancePrice } from "@/features/plans/utils";
import { getQuoteByIdService } from "../services/read/get-quote-by-id.service";
import type { MedicalHistoryPayload } from "../types";

// Función para transformar los datos del formulario en la estructura esperada
const transformFormDataToProspectData = (parsed: any) => {
  const transformed: any = {
    age: parsed.age,
    gender: parsed.gender,
    protectWho: parsed.protectWho,
    additionalInfo: {},
  };

  // Helper para convertir a número de forma segura
  const toNumber = (value: any): number => {
    if (value === undefined || value === null || value === "") return 0;
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  };

  // Extraer childrenCount
  if (parsed.childrenCount !== undefined && parsed.childrenCount !== "") {
    const childrenCount = toNumber(parsed.childrenCount);
    transformed.additionalInfo.childrenCount = childrenCount;

    // Construir array de children desde childAge0, childGender0, etc.
    const children = [];
    for (let i = 0; i < childrenCount; i++) {
      const ageKey = `childAge${i}`;
      const genderKey = `childGender${i}`;
      const age = toNumber(parsed[ageKey]);
      const gender = parsed[genderKey] || "";

      // Solo agregar si tiene datos válidos
      if (age > 0 || gender) {
        children.push({
          age,
          gender,
        });
      }
    }
    if (children.length > 0) {
      transformed.additionalInfo.children = children;
    }
  }

  // Extraer partnerAge y partnerGender
  if (parsed.partnerAge !== undefined && parsed.partnerAge !== "") {
    transformed.additionalInfo.partnerAge = toNumber(parsed.partnerAge);
  }
  if (parsed.partnerGender !== undefined && parsed.partnerGender !== "") {
    transformed.additionalInfo.partnerGender = parsed.partnerGender;
  }

  // Extraer protectedCount y protectedPersons
  if (parsed.protectedCount !== undefined && parsed.protectedCount !== "") {
    const protectedCount = toNumber(parsed.protectedCount);
    transformed.additionalInfo.protectedCount = protectedCount;

    const protectedPersons = [];
    for (let i = 0; i < protectedCount; i++) {
      const relationshipKey = `protectedRelationship${i}`;
      const ageKey = `protectedAge${i}`;
      const genderKey = `protectedGender${i}`;
      const age = toNumber(parsed[ageKey]);
      const gender = parsed[genderKey] || "";
      const relationship = parsed[relationshipKey] || "";

      // Solo agregar si tiene datos válidos
      if (age > 0 || gender || relationship) {
        protectedPersons.push({
          relationship,
          age,
          gender,
        });
      }
    }
    if (protectedPersons.length > 0) {
      transformed.additionalInfo.protectedPersons = protectedPersons;
    }
  }

  // Extraer información de padres
  if (parsed.momName || parsed.dadName || parsed.momAge || parsed.dadAge) {
    if (parsed.momName) transformed.additionalInfo.momName = parsed.momName;
    if (parsed.momAge)
      transformed.additionalInfo.momAge = toNumber(parsed.momAge);
    if (parsed.dadName) transformed.additionalInfo.dadName = parsed.dadName;
    if (parsed.dadAge)
      transformed.additionalInfo.dadAge = toNumber(parsed.dadAge);
  }

  return transformed;
};

export const updateQuote = async (
  quoteId: string,
  prevState: any,
  formData: FormData
): Promise<FormState> => {
  try {
    const rawFormData = Object.fromEntries(formData);
    const parsed = parsedFormDataAge(rawFormData);

    const medicalDataStr = formData.get("medicalData");
    const medicalData: MedicalHistoryPayload[] = medicalDataStr
      ? (JSON.parse(String(medicalDataStr)) as MedicalHistoryPayload[])
      : [];

    const {
      name,
      age,
      email,
      gender,
      postalCode,
      whatsapp,
      protectWho,
      isVerified,
      ...rest
    } = parsed;

    const additionalInfo = Object.fromEntries(
      Object.entries(rest).filter(([key]) =>
        key === "medicalData"
          ? false // Se excluye "medicalData"
          : key.startsWith("$")
            ? false // Se excluyen claves internas
            : !/^answer-/.test(key) &&
              !/^padecimiento-/.test(key) &&
              !/^hospitalizado-/.test(key) &&
              !/^complicacion-/.test(key) &&
              !/^estadoSalud-/.test(key) &&
              !/^medicamento-/.test(key) &&
              !/^detalleComplicacion-/.test(key) &&
              !/^detalleMedicamento-/.test(key)
      )
    );

    // Obtener la cotización actual para acceder al planData
    const currentQuote = await getQuoteByIdService(quoteId);
    if (!currentQuote || !currentQuote.planData) {
      return {
        success: false,
        message: "No se encontró la cotización o los datos del plan.",
      };
    }

    // Obtener el plan original con su tabla de precios
    const planId = currentQuote.planData.id;
    if (!planId) {
      return {
        success: false,
        message: "No se pudo obtener el ID del plan.",
      };
    }

    const insurancePlan = await getInsurancePlanByIdService(planId);
    if (!insurancePlan || !insurancePlan.prices) {
      return {
        success: false,
        message:
          "No se pudo obtener la información del plan para recalcular precios.",
      };
    }

    // Transformar datos del formulario a la estructura esperada
    const prospectData = transformFormDataToProspectData({
      age: Number(age),
      gender: String(gender),
      protectWho: String(protectWho),
      ...parsed, // Incluir todos los campos parsed para extraer childAge0, etc.
    });

    // Recalcular precios basándose en la nueva información
    const { coverage_fee, individualPrices } = calculateInsurancePrice(
      prospectData as any,
      insurancePlan.prices as any,
      currentQuote.paymentType || "Mensual"
    );

    // Preparar membersData actualizado
    const membersData = {
      main: individualPrices.main,
      partner: individualPrices.partner,
      children: individualPrices.children || [],
      parents: individualPrices.parents || [],
      others: individualPrices.others || [],
      protectWho: individualPrices.protectWho,
    };

    // Usar el additionalInfo transformado directamente (sin anidación extra)
    const finalAdditionalInfo = prospectData.additionalInfo || {};

    const quoteUpdate: any = {
      prospect: {
        name: String(name),
        age: Number(age),
        email: String(email),
        gender: String(gender),
        postalCode: String(postalCode),
        whatsapp: String(whatsapp),
        ...(isVerified !== undefined ? { isVerified: isVerified === "true" } : {}),
      },
      quote: {
        id: quoteId,
        protectWho: String(protectWho),
        medicalHistories: medicalData,
        // Actualizar precios recalculados
        coverageFee: coverage_fee,
        totalPrice: coverage_fee,
        membersData: membersData,
        // Guardar additionalInfo directamente sin envolver en otro objeto
        additionalInfo:
          Object.keys(finalAdditionalInfo).length > 0
            ? finalAdditionalInfo
            : undefined,
      },
    };

    await updateQuoteService(quoteUpdate);

    revalidatePath(`${prefix}/cotizaciones`);
    revalidatePath(`${prefix}/cotizaciones/${quoteId}`);

    return {
      success: true,
      message: "Cotización actualizada correctamente",
    };
  } catch (error) {
    console.error("Error en updateQuote:", error);
    return {
      success: false,
      message:
        error instanceof PrismaError
          ? error.message
          : "Error al actualizar la cotización.",
    };
  }
};
