import { RadioOption } from "./RadioOption";

export interface FormDataMedical {
  [key: string]: string | HealthCondition[] | undefined; // Permite claves dinámicas como "answer-0", "answer-1", etc.
  healthConditions?: HealthCondition[];
}

export interface HealthCondition {
  nombrePadecimiento?: string;
  tipoEvento?: string;
  fechaInicio?: Date | undefined;
  tipoTratamiento?: string;
  hospitalizado?: RadioOption;
  complicacion?: RadioOption;
  detalleComplicacion?: string;
  estadoSalud?: RadioOption;
  medicamento?: RadioOption;
  detalleMedicamento?: string;
}
