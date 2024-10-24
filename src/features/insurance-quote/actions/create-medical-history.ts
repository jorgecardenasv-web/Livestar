"use server";
import { createMedicalHistoryService } from "../services/create-medical-history.service";
import { cookies } from "next/headers";
import { getProspectByIdService } from "@/features/prospects/services/get-prospect-by-id.service";
interface FormData {
  nombrePadecimiento?: string;
  tipoEvento?: string;
  fechaInicio?: Date | undefined;
  tipoTratamiento?: string;
  hospitalizado: string;
  complicacion: string;
  detalleComplicacion?: string;
  estadoSalud: string;
  medicamento: string;
  detalleMedicamento?: string;
  [key: string]: Date | string | undefined;
}

export const actionCreateMedicalHistory = async (formMedical: FormData[]) => {
  const cookieStore = cookies();
  const prospectJson = cookieStore.get("prospect")?.value;
  const prospect = prospectJson ? JSON.parse(prospectJson) : {};
  console.log("prospecto", prospect);
  const prospectData = await getProspectByIdService(prospect.id);

  console.log(formMedical);

  if (prospectData)
    await createMedicalHistoryService(formMedical, prospectData?.id);
};
