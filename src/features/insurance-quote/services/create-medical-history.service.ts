import prisma from "@/lib/prisma";
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

export async function createMedicalHistoryService(
  formMedical: FormData[],
  idProspect: number
) {
  try {
    const medicalHistory = await prisma.medicalHistory.create({
      data: {
        responses: formMedical,
        prospectId: idProspect,
      },
    });

    console.log("Historial médico creado con éxito");
    return medicalHistory;
  } catch (error) {
    console.error("Error creando el historial médico:", error);
  }
}
