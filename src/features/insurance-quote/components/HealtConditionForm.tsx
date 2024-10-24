import { TextInput, Select, SelectItem, DatePicker } from "@tremor/react";
import RadioGroup from "./RadioGrup";
import { RadioOption } from "../types";

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
}

const HealthConditionForm: React.FC<HealthConditionFormProps> = ({
  formData,
  onChange,
  index,
}) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          placeholder="Nombre del padecimiento"
          value={formData.nombrePadecimiento}
          onChange={(e) => onChange("nombrePadecimiento", e.target.value)}
        />
        <Select
          placeholder="Tipo de evento"
          value={formData.tipoEvento}
          onValueChange={(value) => onChange("tipoEvento", value)}
        >
          <SelectItem value="1">Opción 1</SelectItem>
          <SelectItem value="2">Opción 2</SelectItem>
        </Select>
        <DatePicker
          value={formData.fechaInicio}
          placeholder="Fecha de inicio"
          onValueChange={(value) => onChange("fechaInicio", value)}
        />
        <Select
          placeholder="Tipo de tratamiento"
          value={formData.tipoTratamiento}
          onValueChange={(value) => onChange("tipoTratamiento", value)}
        >
          <SelectItem value="1">Opción 1</SelectItem>
          <SelectItem value="2">Opción 2</SelectItem>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
            ¿Estuvo hospitalizado?
          </label>
          <RadioGroup
            name={`hospitalizado-${index}`}
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
            name={`complicacion-${index}`}
            options={["Sí", "No"]}
            value={formData.complicacion}
            onChange={(_, value) => onChange("complicacion", value)}
          />
        </div>
      </div>

      {formData.complicacion === "Sí" && (
        <TextInput
          placeholder="¿Cuál?"
          onChange={(e) => onChange("detalleComplicacion", e.target.value)}
        />
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
            Estado actual de salud
          </label>
          <RadioGroup
            name={`estadoSalud-${index}`}
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
            name={`medicamento-${index}`}
            options={["Sí", "No"]}
            value={formData.medicamento}
            onChange={(_, value) => onChange("medicamento", value)}
          />
        </div>
      </div>

      {formData.medicamento === "Sí" && (
        <TextInput
          placeholder="¿Cuál?"
          onChange={(e) => onChange("detalleMedicamento", e.target.value)}
        />
      )}
    </div>
  );
};

export default HealthConditionForm;
