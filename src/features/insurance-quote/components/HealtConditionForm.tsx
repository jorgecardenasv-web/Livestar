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
  indexform: number;
}

const HealthConditionForm: React.FC<HealthConditionFormProps> = ({
  formData,
  onChange,
  index,
  indexform,
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
          <SelectItem value="1">Enfermedad</SelectItem>
          <SelectItem value="2">Accidente</SelectItem>
          <SelectItem value="3">Maternidad</SelectItem>
          <SelectItem value="4">Estético</SelectItem>
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
          <SelectItem value="1">Quirúrgico</SelectItem>
          <SelectItem value="2">Médico</SelectItem>
          <SelectItem value="3">Psicológico</SelectItem>
          <SelectItem value="4">Rehabilitación</SelectItem>
          <SelectItem value="5">Ninguno</SelectItem>
          <SelectItem value="6">Quimioterapia</SelectItem>
          <SelectItem value="7">En observación</SelectItem>
          <SelectItem value="8">Radioterapia</SelectItem>
          <SelectItem value="9">Trasplante</SelectItem>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4">
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
          className="mt-4"
          placeholder="¿Cuál?"
          value={formData.detalleComplicacion}
          onChange={(e) => onChange("detalleComplicacion", e.target.value)}
        />
      )}

      <div className="grid grid-cols-2 gap-4 pt-4">
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
          className="mt-4"
          placeholder="¿Cuál?"
          value={formData.detalleMedicamento}
          onChange={(e) => onChange("detalleMedicamento", e.target.value)}
        />
      )}
    </div>
  );
};

export default HealthConditionForm;
