"use server";

import { updateQuote } from "@/features/quote/actions/update-quote";
import { getProspectByQuoteId } from "./get-prospect-by-quote";

export const updateQuoteFromSummary = async (
  prevState: any,
  formData: FormData
) => {
  const quoteId = formData.get("quoteId")?.toString();

  if (!quoteId) {
    return {
      success: false,
      message: "No se encontró una cotización creada para actualizar.",
    };
  }

  // Obtener los datos actuales de la cotización desde la BD
  const { prospect, protectWho, additionalInfo } = await getProspectByQuoteId(quoteId);

  // Verificar que tengamos los datos del prospect
  if (!prospect || typeof prospect !== 'object' || !('name' in prospect) || !prospect.name) {
    return {
      success: false,
      message: "No se pudieron obtener los datos de la cotización.",
    };
  }

  // Completar datos del prospecto desde la BD para preservarlos
  formData.set("name", String((prospect as any).name ?? ""));
  formData.set("age", String((prospect as any).age ?? ""));
  formData.set("email", String((prospect as any).email ?? ""));
  formData.set("gender", String((prospect as any).gender ?? ""));
  formData.set("postalCode", String((prospect as any).postalCode ?? ""));
  formData.set("whatsapp", String((prospect as any).whatsapp ?? ""));
  formData.set("protectWho", String(protectWho ?? ""));

  // Incluir campos de additionalInfo para evitar que se limpien
  if (additionalInfo && typeof additionalInfo === "object") {
    Object.entries(additionalInfo).forEach(([key, value]) => {
      try {
        const val = typeof value === "object" ? JSON.stringify(value) : String(value ?? "");
        formData.set(key, val);
      } catch {
        // Si no se puede serializar, se omite silenciosamente
      }
    });
  }

  return await updateQuote(quoteId, prevState, formData);
};