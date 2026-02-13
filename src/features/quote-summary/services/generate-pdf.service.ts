import { generatePDFWithPlaywright } from "./generate-pdf-playwright.service";
import type { QuotePDFData } from "../types";

type OutputFormat = "datauri" | "arraybuffer";

export const generatePDFService = async (
  data: QuotePDFData,
  format: OutputFormat
): Promise<string | ArrayBuffer> => {
  try {
    return await generatePDFWithPlaywright(data, format);
  } catch (error) {
    console.error("Error en generatePDFService:", error);
    throw error;
  }
};
