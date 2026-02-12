"use server";

import { getAllProspectsByDateService } from "@/features/prospects/services/get-all-prospects-by-date.service";
import { prospectTransformer } from "@/features/prospects/transformers/prospect-transformer";
import ExcelJS from "exceljs";

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const formatDateShort = (date: string) => {
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

export async function generateReport(startDate: string, endDate: string) {
  console.log('🔍 Generando reporte con fechas:');
  console.log('  Start Date:', startDate);
  console.log('  End Date:', endDate);
  
  const prospects = await getAllProspectsByDateService({
    startDate,
    endDate,
  });
  
  console.log('📊 Cotizaciones encontradas:', prospects.length);
  if (prospects.length > 0) {
    console.log('  Primera cotización:', {
      id: prospects[0].id,
      createdAt: prospects[0].createdAt,
      name: prospects[0].prospect?.name
    });
  }

  const prospectTransformed = prospects.map((prospect) =>
    prospectTransformer(prospect as any)
  );

  const formatStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      NUEVO: "Nuevo",
      CONTACTADO: "Contactado",
      EN_PROGRESO: "En progreso",
      CERRADO: "Cerrado",
    };
    return statusMap[status] || status;
  };

  const mappedProspects = prospectTransformed?.map((prospect) => ({
    Id: prospect.id,
    Nombre: prospect.name,
    Email: prospect.email,
    Estado: formatStatus(prospect.status),
    Asesor: prospect?.user ? prospect?.user?.name : "Sin asignar",
    "Email asesor": prospect?.user ? prospect?.user?.email : "-",
    "Fecha de creación": formatDate(prospect.createdAt),
  }));

  // Crear el libro de Excel con ExcelJS
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Cotizaciones");

  // Estilos del título
  worksheet.mergeCells("A1:G1");
  const titleCell = worksheet.getCell("A1");
  titleCell.value = "REPORTE DE COTIZACIONES";
  titleCell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 16 };
  titleCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF00A3D9" },
  };
  titleCell.alignment = { vertical: "middle", horizontal: "left" };
  worksheet.getRow(1).height = 30;

  // Metadata
  const periodCell = worksheet.getCell("A2");
  periodCell.value = `Período: ${formatDateShort(startDate)} - ${formatDateShort(endDate)}`;
  periodCell.font = { size: 11, color: { argb: "FF6B7280" } };

  const totalCell = worksheet.getCell("A3");
  totalCell.value = `Total de registros: ${mappedProspects.length}`;
  totalCell.font = { size: 11, color: { argb: "FF6B7280" } };

  const dateCell = worksheet.getCell("A4");
  dateCell.value = `Generado: ${formatDate(new Date())}`;
  dateCell.font = { size: 11, color: { argb: "FF6B7280" } };

  worksheet.getRow(2).height = 18;
  worksheet.getRow(3).height = 18;
  worksheet.getRow(4).height = 18;

  // Fila separadora
  worksheet.getRow(5).height = 15;
  for (let col = 1; col <= 7; col++) {
    const cell = worksheet.getRow(5).getCell(col);
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFE5E7EB" },
    };
  }

  // Encabezados de la tabla
  const headers = ["Id", "Nombre", "Email", "Estado", "Asesor", "Email asesor", "Fecha de creación"];
  const headerRow = worksheet.getRow(6);
  headerRow.values = headers;
  headerRow.height = 25;
  
  headerRow.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 12 };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF00A3D9" },
    };
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.border = {
      top: { style: "thin", color: { argb: "FFCCCCCC" } },
      bottom: { style: "thin", color: { argb: "FFCCCCCC" } },
      left: { style: "thin", color: { argb: "FFCCCCCC" } },
      right: { style: "thin", color: { argb: "FFCCCCCC" } },
    };
  });

  // Agregar datos
  mappedProspects.forEach((prospect, index) => {
    const rowIndex = index + 7;
    const row = worksheet.getRow(rowIndex);
    row.values = [
      prospect.Id,
      prospect.Nombre,
      prospect.Email,
      prospect.Estado,
      prospect.Asesor,
      prospect["Email asesor"],
      prospect["Fecha de creación"],
    ];
    row.height = 20;

    row.eachCell((cell, colNumber) => {
      cell.font = { size: 11, color: { argb: "FF1F2937" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: index % 2 === 0 ? "FFFFFFFF" : "FFF9FAFB" },
      };
      cell.alignment = {
        vertical: "middle",
        horizontal: colNumber === 1 ? "center" : "left",
      };
      cell.border = {
        top: { style: "thin", color: { argb: "FFE5E7EB" } },
        bottom: { style: "thin", color: { argb: "FFE5E7EB" } },
        left: { style: "thin", color: { argb: "FFE5E7EB" } },
        right: { style: "thin", color: { argb: "FFE5E7EB" } },
      };
    });
  });

  // Ajustar anchos de columna
  worksheet.columns = [
    { width: 38 }, // Id (más ancho para mostrar el UUID completo)
    { width: 25 }, // Nombre
    { width: 30 }, // Email
    { width: 15 }, // Estado
    { width: 25 }, // Asesor
    { width: 30 }, // Email asesor
    { width: 20 }, // Fecha de creación
  ];

  // Generar el buffer
  const buffer = await workbook.xlsx.writeBuffer();

  // Convertir el buffer a Base64
  const base64 = Buffer.from(buffer).toString("base64");

  return base64;
}
