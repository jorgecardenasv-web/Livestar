import { generatePDFWithPuppeteer } from "./generate-pdf-puppeteer.service";
import type { QuotePDFData } from "../types";

type OutputFormat = "datauri" | "arraybuffer";

export const generatePDFService = async (
  data: QuotePDFData,
  format: OutputFormat
): Promise<string | ArrayBuffer> => {
  try {
    return await generatePDFWithPuppeteer(data, format);
  } catch (error) {
    console.error("Error en generatePDFService:", error);
    throw error;
  }
};
