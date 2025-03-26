import type { QuotePDFData } from "../types";
import jsPDF from "jspdf";
import { formatCurrency } from "@/shared/utils";

type OutputFormat = "datauri" | "arraybuffer";

const styles = {
  colors: {
    primary: "#003366",
    text: "#333333",
    subtext: "#666666",
    accent: "#60A5FA",
    background: "#F8F9FA",
  },
  margins: {
    left: 25,
    right: 25,
    top: 20,
  },
  columns: {
    label: 50,
    value: 90,
  },
  spacing: {
    section: 12,
    element: 8, 
  },
  fonts: {
    header: "helvetica",
    body: "helvetica",
  },
};

export const generatePDFService = (
  data: QuotePDFData,
  format: OutputFormat
): string | ArrayBuffer => {
  try {
    let doc: jsPDF;
    doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "letter",
    });

    const addText = (doc: jsPDF, text: string, options: any = {}) => {
      const {
        x = styles.margins.left,
        y,
        size = 11,
        color = styles.colors.text,
        align = "left",
        font = styles.fonts.body,
        style = "normal",
        underline = false,
      } = options;

      doc.setFont(font, style);
      doc.setFontSize(size);
      doc.setTextColor(color);
      doc.text(text, x, y, { align });

      if (underline) {
        const textWidth = doc.getTextWidth(text);
        doc.setDrawColor(color);
        doc.line(x, y + 1, x + textWidth, y + 1);
      }
    };

    const addLine = (doc: jsPDF, y: number, options: any = {}) => {
      const { color = styles.colors.subtext, width = 0.5 } = options;
      doc.setDrawColor(color);
      doc.setLineWidth(width);
      doc.line(
        styles.margins.left,
        y,
        doc.internal.pageSize.width - styles.margins.right,
        y
      );
    };

    const checkSpace = (doc: jsPDF, neededSpace: number): void => {
      const pageHeight = doc.internal.pageSize.height;
      if (yPos + neededSpace > pageHeight - 40) {
        doc.addPage();
        yPos = styles.margins.top;
      }
    };

    const addSectionHeader = (doc: jsPDF, text: string) => {
      yPos += styles.spacing.section / 2;
      doc.setFillColor(styles.colors.background);
      doc.rect(
        styles.margins.left,
        yPos - 5,
        doc.internal.pageSize.width - 50,
        10,
        "F"
      );
      addText(doc, text, {
        y: yPos,
        size: 14,
        color: styles.colors.primary,
        style: "bold",
        font: styles.fonts.header,
      });
      yPos += 10;
    };

    let yPos = styles.margins.top;
    addText(doc, "COTIZACIÓN DE SEGURO", {
      y: yPos,
      size: 24,
      color: styles.colors.primary,
      align: "center",
      x: doc.internal.pageSize.width / 2,
      style: "bold",
      font: styles.fonts.header,
    });

    yPos += 10;
    addText(doc, "DE GASTOS MÉDICOS", {
      y: yPos,
      size: 20,
      color: styles.colors.primary,
      align: "center",
      x: doc.internal.pageSize.width / 2,
      style: "bold",
      font: styles.fonts.header,
    });

    yPos += 6;
    addLine(doc, yPos, { color: styles.colors.accent, width: 1 });

    const infoItems = [
      { label: "Aseguradora:", value: data.company },
      { label: "Plan:", value: data.plan },
      {
        label: "Fecha de cotización:",
        value: new Date().toLocaleDateString("es-MX", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      },
    ];

    yPos += 15;    
    infoItems.forEach((item) => {
      addText(doc, item.label, {
        y: yPos,
        color: styles.colors.subtext,
        x: styles.margins.left,
      });
      addText(doc, item.value, {
        y: yPos,
        x: styles.margins.left + styles.columns.label,
      });
      yPos += styles.spacing.element;
    });

    yPos += styles.spacing.section;
    addLine(doc, yPos);
    yPos += styles.spacing.section;

    addSectionHeader(doc, "PRIMA DEL SEGURO");

    addText(doc, "Forma de Pago:", {
      y: yPos,
      color: styles.colors.subtext,
    });
    addText(doc, data.paymentType, {
      y: yPos,
      x: styles.margins.left + styles.columns.label,
    });

    yPos += styles.spacing.element;

    addText(doc, "Prima Total:", {
      y: yPos,
      color: styles.colors.subtext,
    });
    addText(doc, formatCurrency(data.coverageFee), {
      y: yPos,
      x: styles.margins.left + styles.columns.label,
      size: 12,
      style: "bold",
    });

    yPos += styles.spacing.section + 4;
    addLine(doc, yPos);
    yPos += styles.spacing.section;

    // Sección de Coberturas Principales
    addSectionHeader(doc, "COBERTURAS PRINCIPALES");

    const coverages = [
      { label: "Suma Asegurada:", value: formatCurrency(data.sumInsured) },
      {
        label: "Deducible:",
        value: `${data.isMultipleDeductible ? "desde " : ""}${formatCurrency(data.deductible)}`,
      },
      { label: "Coaseguro:", value: `${data.coInsurance}%` },
      {
        label: "Tope de Coaseguro:",
        value: formatCurrency(data.coInsuranceCap),
      },
    ];

    coverages.forEach((item) => {
      addText(doc, item.label, {
        y: yPos,
        color: styles.colors.subtext,
      });
      addText(doc, item.value, {
        y: yPos,
        x: styles.margins.left + styles.columns.label,
      });
      yPos += styles.spacing.element;
    });

    yPos += styles.spacing.section + 4;
    addLine(doc, yPos);
    yPos += styles.spacing.section;

    const hasMultipleDeductibles = data.isMultipleDeductible && data.deductibles;
    
    let transformedDeductibles: any[] = [];
    if (hasMultipleDeductibles) {
      transformedDeductibles = Object.entries(data.deductibles!).reduce(
        (acc: any[], [key, values]: [string, any]) => {
          Object.entries(values).forEach(([hospitalLevel, amount]) => {
            const existingGroup = acc.find(
              (item) => item.hospitalLevel === hospitalLevel
            );
            if (existingGroup) {
              existingGroup[key] = amount;
            } else {
              acc.push({
                hospitalLevel,
                [key]: amount,
              });
            }
          });
          return acc;
        },
        []
      );
    }
    
    let totalNeededSpace = 0;
    
    if (data.members.length > 0) {
      totalNeededSpace += 30 + (data.members.length * 10);
    }
    
    if (hasMultipleDeductibles) {
      totalNeededSpace += 40 + (transformedDeductibles.length * 12);
    }
    
    if (data.members.length > 0 && hasMultipleDeductibles) {
      checkSpace(doc, totalNeededSpace);
    }

    if (data.members.length > 0) {
      addSectionHeader(doc, "DESGLOSE DE ASEGURADOS");

      doc.setFillColor(styles.colors.primary);
      doc.rect(
        styles.margins.left,
        yPos - 5,
        doc.internal.pageSize.width - 50,
        10,
        "F"
      );

      addText(doc, "Asegurado", {
        y: yPos,
        style: "bold",
        color: "#FFFFFF",
        x: styles.margins.left + 5,
      });
      addText(doc, "Prima Individual", {
        y: yPos,
        x: doc.internal.pageSize.width - 60,
        style: "bold",
        color: "#FFFFFF",
      });

      yPos += 10;

      data.members.forEach((member, index) => {
        if (index % 2 === 0) {
          doc.setFillColor(styles.colors.background);
          doc.rect(
            styles.margins.left,
            yPos - 5,
            doc.internal.pageSize.width - 50,
            10,
            "F"
          );
        }

        addText(doc, member.name || member.type, {
          y: yPos,
          x: styles.margins.left + 5,
        });
        addText(doc, formatCurrency(member.price), {
          y: yPos,
          x: doc.internal.pageSize.width - 60,
          color: styles.colors.primary,
        });

        yPos += 10;
      });
    }

    if (hasMultipleDeductibles) {
      if (data.members.length === 0) {
        checkSpace(doc, 40 + (transformedDeductibles.length * 12));
      } else {
        yPos += 10;
      }
      
      addSectionHeader(doc, "DEDUCIBLES POR NIVEL HOSPITALARIO");
      
      doc.setFillColor(styles.colors.primary);
      doc.rect(
        styles.margins.left,
        yPos - 5,
        doc.internal.pageSize.width - 50,
        10,
        "F"
      );
      
      const tableWidth = doc.internal.pageSize.width - 50 - styles.margins.left;
      const colWidth = tableWidth / 3;
      
      addText(doc, "Nivel Hospitalario", {
        y: yPos,
        style: "bold",
        color: "#FFFFFF",
        x: styles.margins.left + 5,
      });
      
      addText(doc, "Menores de 45 años", {
        y: yPos,
        style: "bold",
        color: "#FFFFFF",
        x: styles.margins.left + colWidth + 5,
      });
      
      addText(doc, "Mayores de 45 años", {
        y: yPos,
        style: "bold",
        color: "#FFFFFF",
        x: styles.margins.left + (colWidth * 2) + 5,
      });
      
      yPos += 10;
      
      transformedDeductibles.forEach((deductible, index) => {
        if (index % 2 === 0) {
          doc.setFillColor(styles.colors.background);
          doc.rect(
            styles.margins.left,
            yPos - 5,
            doc.internal.pageSize.width - 50,
            10,
            "F"
          );
        }
        
        addText(doc, deductible.hospitalLevel, {
          y: yPos,
          x: styles.margins.left + 5,
        });
        
        addText(doc, deductible.opcion_2 ? formatCurrency(deductible.opcion_2) : "N/A", {
          y: yPos,
          x: styles.margins.left + colWidth + 5,
          color: styles.colors.primary,
          style: "bold",
        });
        
        addText(doc, deductible.opcion_4 ? formatCurrency(deductible.opcion_4) : "N/A", {
          y: yPos,
          x: styles.margins.left + (colWidth * 2) + 5,
          color: styles.colors.primary,
          style: "bold",
        });
        
        yPos += 10;
      });
      
      yPos += 8;
      const noteText = "* Los deducibles varían según el nivel hospitalario y la edad del asegurado.";
      addText(doc, noteText, {
        y: yPos,
        size: 9,
        color: styles.colors.subtext,
        x: styles.margins.left,
        style: "italic",
      });
    }

    const addFooter = (doc: jsPDF, pageNumber: number) => {
      const footerText =
        "Este documento es únicamente informativo y no constituye una póliza de seguro. Los términos y condiciones específicos están sujetos a la póliza emitida por la aseguradora.";

      doc.setFontSize(8);
      doc.setTextColor(styles.colors.subtext);

      const splitFooter = doc.splitTextToSize(
        footerText,
        doc.internal.pageSize.width -
          (styles.margins.left + styles.margins.right)
      );

      const footerY = doc.internal.pageSize.height - 20;
      doc.text(splitFooter, doc.internal.pageSize.width / 2, footerY, {
        align: "center",
      });

      addLine(doc, footerY - 5, { color: styles.colors.accent, width: 0.5 });

      doc.setTextColor(styles.colors.primary);
      doc.text(
        `Página ${pageNumber}`,
        doc.internal.pageSize.width - styles.margins.right,
        doc.internal.pageSize.height - 10,
        { align: "right" }
      );
    };

    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      addFooter(doc, i);
    }

    if (format === "datauri") {
      return doc.output("dataurlstring");
    }

    return doc.output("arraybuffer");
  } catch (error) {
    console.error("Error en generatePDFService:", error);
    throw error;
  }
};
