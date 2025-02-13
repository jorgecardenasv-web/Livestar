"use server";

import { QuotePDFData } from "../types/pdf";
import jsPDF from "jspdf";
import { formatCurrency } from "@/shared/utils";

export async function generatePDFAction(
  data: QuotePDFData
): Promise<{ success: boolean; data?: string; error?: string }> {
  try {
    // Crear documento en formato carta
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "letter",
    });

    const styles = {
      colors: {
        primary: "#223E99",
        text: "#2D3748",
        subtext: "#4A5568",
        accent: "#0EA5E9",
      },
      margins: {
        top: 20,
        left: 20,
        right: 20,
      },
    };

    // Helper para texto
    const addText = (text: string, options: any = {}) => {
      const {
        x = styles.margins.left,
        y,
        size = 10,
        color = styles.colors.text,
        align = "left",
      } = options;

      doc.setFontSize(size);
      doc.setTextColor(color);
      doc.text(text, x, y, { align });
    };

    // Helper para líneas horizontales
    const addLine = (y: number) => {
      doc.setDrawColor(230, 230, 230);
      doc.line(
        styles.margins.left,
        y,
        doc.internal.pageSize.width - styles.margins.right,
        y
      );
    };

    let yPos = styles.margins.top;

    // Encabezado del documento
    addText("COTIZACIÓN DE SEGURO DE GASTOS MÉDICOS", {
      y: yPos,
      size: 16,
      color: styles.colors.primary,
      align: "center",
      x: doc.internal.pageSize.width / 2,
    });

    yPos += 15;

    // Información de la aseguradora
    addText(`Aseguradora: ${data.company}`, {
      y: yPos,
      size: 12,
      color: styles.colors.primary,
    });

    yPos += 8;
    addText(`Plan: ${data.plan}`, { y: yPos, size: 12 });

    yPos += 8;
    const today = new Date().toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    addText(`Fecha de cotización: ${today}`, { y: yPos });

    yPos += 15;
    addLine(yPos);
    yPos += 10;

    // Sección de Prima
    addText("PRIMA DEL SEGURO", {
      y: yPos,
      size: 12,
      color: styles.colors.primary,
    });

    yPos += 8;
    addText(`Forma de Pago: ${data.paymentType}`, { y: yPos });

    yPos += 8;
    addText(`Prima Total: ${formatCurrency(data.coverageFee)}`, {
      y: yPos,
      size: 14,
      color: styles.colors.primary,
    });

    yPos += 15;
    addLine(yPos);
    yPos += 10;

    // Sección de Coberturas Principales
    addText("COBERTURAS PRINCIPALES", {
      y: yPos,
      size: 12,
      color: styles.colors.primary,
    });

    yPos += 10;
    const coverages = [
      { label: "Suma Asegurada", value: formatCurrency(data.sumInsured) },
      {
        label: "Deducible",
        value: `${data.isMultipleDeductible ? "desde " : ""}${formatCurrency(data.deductible)}`,
      },
      { label: "Coaseguro", value: `${data.coInsurance}%` },
      {
        label: "Tope de Coaseguro",
        value: formatCurrency(data.coInsuranceCap),
      },
    ];

    coverages.forEach((item) => {
      addText(`• ${item.label}:`, { y: yPos });
      addText(item.value, {
        y: yPos,
        x: 100,
        color: styles.colors.primary,
      });
      yPos += 8;
    });

    yPos += 7;
    addLine(yPos);
    yPos += 10;

    // Sección de Asegurados
    if (data.members.length > 0) {
      addText("DESGLOSE DE ASEGURADOS", {
        y: yPos,
        size: 12,
        color: styles.colors.primary,
      });

      yPos += 10;

      // Encabezados de tabla
      doc.setFillColor(247, 250, 252);
      doc.rect(
        styles.margins.left,
        yPos - 5,
        doc.internal.pageSize.width - 40,
        10,
        "F"
      );

      addText("Asegurado", { y: yPos, color: styles.colors.primary });
      addText("Prima Individual", {
        y: yPos,
        x: doc.internal.pageSize.width - 60,
        color: styles.colors.primary,
      });

      yPos += 8;

      data.members.forEach((member) => {
        addText(member.name || member.type, { y: yPos });
        addText(formatCurrency(member.price), {
          y: yPos,
          x: doc.internal.pageSize.width - 60,
        });
        yPos += 7;
      });
    }

    // Deductibles múltiples en nueva página si aplica
    if (data.isMultipleDeductible && data.deductibles) {
      doc.addPage();
      yPos = styles.margins.top;

      addText("TABLA DE DEDUCIBLES POR NIVEL HOSPITALARIO", {
        y: yPos,
        size: 12,
        color: styles.colors.primary,
      });

      yPos += 15;

      const opciones: { [key: string]: string } = {
        "opcion_2": "De 0 a 45 años",
        "opcion_4": "De 45 a más años"
      }

      Object.entries(data.deductibles).forEach(([key, values]) => {
        addText(opciones[key], {
          y: yPos,
          size: 11,
          color: styles.colors.primary,
        });
        yPos += 8;

        Object.entries(values).forEach(([level, amount]) => {
          addText(`${level}:`, { y: yPos });
          addText(formatCurrency(amount), {
            y: yPos,
            x: 80,
          });
          yPos += 7;
        });
        yPos += 5;
      });
    }

    // Pie de página
    const footerText =
      "Este documento es únicamente informativo y no constituye una póliza de seguro. Los términos y condiciones específicos están sujetos a la póliza emitida por la aseguradora.";
    const pageHeight = doc.internal.pageSize.height;

    doc.setFontSize(8);
    doc.setTextColor(styles.colors.subtext);

    const splitFooter = doc.splitTextToSize(
      footerText,
      doc.internal.pageSize.width - 40
    );
    doc.text(splitFooter, doc.internal.pageSize.width / 2, pageHeight - 20, {
      align: "center",
    });

    return { success: true, data: doc.output("datauristring") };
  } catch (error) {
    console.error("Error generando PDF:", error);
    return { success: false, error: "Error generando el PDF" };
  }
}
