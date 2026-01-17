import { RadioOption } from "./RadioOption";

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
  persona?: string;
}

export interface FormDataMedical {
  [key: string]:
    | string
    | HealthCondition[]
    | number
    | null
    | undefined;
  healthConditions?: HealthCondition[];
}

export interface MedicalQuestionForm extends FormDataMedical {
  activePadecimiento?: number | null;
}

export type MedicalForms = MedicalQuestionForm[];

export interface MedicalHistoryPayload {
  answer?: string;
  questionId: number | string;
  healthConditions: HealthCondition[];
  activePadecimiento: number | null;
  [key: string]: string | number | HealthCondition[] | null | undefined;
}
