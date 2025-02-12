import { generatePDFAction } from "../utils/generatePdfAction"


interface FormatPDF {
    format: "A4" | "A3" | "Letter";
}
export const generatePDF = async (pdfContent: string, formatDocument: FormatPDF) => {
        return await generatePDFAction(pdfContent, formatDocument);
}