"use server";

import { getAllProspectsByDateService } from "@/features/prospects/services/get-all-prospects-by-date.service";
import { prospectTransformer } from "@/features/prospects/transformers/prospect-transformer";
import * as XLSX from "xlsx";

const formatToISO = (date: string) => {
  return new Date(date).toISOString().split(".")[0] + "Z";
};

export async function generateReport(startDate: string, endDate: string) {
  const prospects = await getAllProspectsByDateService({
    startDate: formatToISO(startDate),
    endDate: formatToISO(endDate),
  });

  const prospectTransformed = prospects.map((prospect) =>
    prospectTransformer(prospect as any)
  );

  const mappedProspects = prospectTransformed?.map((prospect) => ({
    Id: prospect.id,
    Nombre: prospect.name,
    Email: prospect.email,
    Asesor: prospect?.user ? prospect?.user?.name : "",
    "Email asesor": prospect?.user ? prospect?.user?.email : "",
    "Fecha de creación": prospect.createdAt,
  }));

  // Crear el libro de Excel
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(mappedProspects);
  XLSX.utils.book_append_sheet(wb, ws, "Prospectos");

  // Generar el archivo Excel
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

  // Convertir el buffer a Base64
  const base64 = Buffer.from(excelBuffer).toString("base64");

  return base64;
}
