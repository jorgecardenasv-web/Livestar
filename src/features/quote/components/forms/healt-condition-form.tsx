import { TextInput } from "@/shared/components/ui/text-input";
import { SelectInput } from "@/shared/components/ui/select-input";
import { MonthYearPicker } from "@/shared/components/ui/month-year-picker";
import { RadioOption } from "../../types";
import RadioGroup from "../inputs/radio-group-medical";
import { FC } from "react";

interface FormData {
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

interface HealthConditionFormProps {
  formData: FormData;
  onChange: (
    field: keyof FormData,
    value: string | RadioOption | Date | null | undefined
  ) => void;
  index: number;
  indexform: number;
  errors: { [key: string]: string };
}

export const HealthConditionForm: FC<HealthConditionFormProps> = ({
  formData,
  onChange,
  index,
  indexform,
  errors,
}) => {
  return (
    <div className="mb-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          label="Nombre del padecimiento"
          placeholder="Nombre del padecimiento"
          value={formData.nombrePadecimiento}
          onChange={(e) => onChange("nombrePadecimiento", e.target.value)}
          error={
            errors[
            `question-${indexform}-condition-${index}-nombrePadecimiento`
            ] || ""
          }
        />
        <SelectInput
          label="Tipo de evento"
          options={[
            { label: "Enfermedad", value: "1" },
            { label: "Accidente", value: "2" },
            { label: "Maternidad", value: "3" },
            { label: "Estético", value: "4" },
          ]}
          value={formData.tipoEvento}
          onValueChange={(value) => onChange("tipoEvento", value)}
          error={
            errors[`question-${indexform}-condition-${index}-tipoEvento`] || ""
          }
        />
        <MonthYearPicker
          value={formData.fechaInicio ? new Date(formData.fechaInicio) : undefined}
          label="Fecha de inicio"
          placeholder="Selecciona mes y año de inicio"
          onValueChange={(value) => onChange("fechaInicio", value)}
          error={
            errors[`question-${indexform}-condition-${index}-fechaInicio`] || ""
          }
        />
        <SelectInput
          label="Tipo de tratamiento"
          options={[
            { label: "Quirúrgico", value: "1" },
            { label: "Médico", value: "2" },
            { label: "Psicológico", value: "3" },
            { label: "Rehabilitación", value: "4" },
            { label: "Ninguno", value: "5" },
            { label: "Quimioterapia", value: "6" },
            { label: "En observación", value: "7" },
            { label: "Radioterapia", value: "8" },
            { label: "Trasplante", value: "9" },
          ]}
          value={formData.tipoTratamiento}
          onValueChange={(value) => onChange("tipoTratamiento", value)}
          error={
            errors[
            `question-${indexform}-condition-${index}-tipoTratamiento`
            ] || ""
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
            ¿Estuvo hospitalizado?
          </label>
          <RadioGroup
            name={`hospitalizado-${index}-${indexform}`}
            options={["Sí", "No"]}
            value={formData.hospitalizado}
            onChange={(_, value) => onChange("hospitalizado", value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
            ¿Quedó con alguna complicación?
          </label>
          <RadioGroup
            name={`complicacion-${index}-${indexform}`}
            options={["Sí", "No"]}
            value={formData.complicacion}
            onChange={(_, value) => onChange("complicacion", value)}
          />
        </div>
      </div>

      {formData.complicacion === "Sí" && (
        <TextInput
          label="¿Cuál?"
          placeholder="¿Cuál?"
          value={formData.detalleComplicacion}
          onChange={(e) => onChange("detalleComplicacion", e.target.value)}
          error={
            errors[
            `question-${indexform}-condition-${index}-detalleComplicacion`
            ] || ""
          }
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
            Estado actual de salud
          </label>
          <RadioGroup
            name={`estadoSalud-${index}-${indexform}`}
            options={["Sano", "En tratamiento"]}
            value={formData.estadoSalud}
            onChange={(_, value) => onChange("estadoSalud", value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
            ¿Actualmente toma algún medicamento?
          </label>
          <RadioGroup
            name={`medicamento-${index}-${indexform}`}
            options={["Sí", "No"]}
            value={formData.medicamento}
            onChange={(_, value) => onChange("medicamento", value)}
          />
        </div>
      </div>

      {formData.medicamento === "Sí" && (
        <TextInput
          label="¿Cuál?"
          placeholder="¿Cuál?"
          value={formData.detalleMedicamento}
          onChange={(e) => onChange("detalleMedicamento", e.target.value)}
          error={
            errors[
            `question-${indexform}-condition-${index}-detalleMedicamento`
            ] || ""
          }
        />
      )}
    </div>
  );
};
