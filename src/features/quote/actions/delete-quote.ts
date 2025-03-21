"use server";

import { revalidatePath } from "next/cache";
import { deleteQuoteService } from "../services/delete/delete-quote.service";
import { PrismaError } from "@/shared/errors/prisma";
import { prefix } from "@/features/layout/nav-config/constants";
import { FormState } from "@/shared/types";

export const deleteQuote = async (
  quoteId: string,
): Promise<FormState> => {
  try {
    await deleteQuoteService(quoteId);
    
    revalidatePath(`${prefix}/cotizaciones`);
    
    return {
      success: true,
      message: "Cotización eliminada correctamente",
    };
  } catch (error) {
    console.error("Error al eliminar la cotización:", error);
    return {
      success: false,
      message:
        error instanceof PrismaError
          ? error.message
          : "Error al eliminar la cotización.",
    };
  }
};
