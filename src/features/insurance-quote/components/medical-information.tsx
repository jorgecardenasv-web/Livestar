"use client";
import HealthConditionForm from "./HealtConditionForm";
import RadioGroup from "./RadioGrup";
import { Question, RadioOption } from "../types";

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
  [key: string]: RadioOption | string | Date | undefined;
}

interface MedicalInformationProps {
  forms: any[];
  setForms: React.Dispatch<React.SetStateAction<any[]>>;
  questions: Question[];
}

export const MedicalInformation: React.FC<MedicalInformationProps> = ({
  forms,
  setForms,
  questions,
}) => {
  const handleFormChange = (
    index: number,
    field: keyof FormData,
    value: string | RadioOption | Date | null | undefined
  ) => {
    const updatedForms = [...forms];

    if (!updatedForms[index]) {
      updatedForms[index] = {};
    }

    if (!updatedForms[index][field]) {
      updatedForms[index][field] = null;
    }
    updatedForms[index] = { ...updatedForms[index], [field]: value };
    setForms(updatedForms);
  };

  return (
    <>
      <div className="flex items-center space-x-4 mb-6">
        <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl">
          3
        </span>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          Información médica
        </h3>
      </div>

      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={index} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-5">
                {index + 1}.- {question.text}
              </label>
              <RadioGroup
                name={`answer-${index}`}
                options={["Sí", "No"]}
                value={forms[index][`answer-${index}`]}
                onChange={(name, value) => handleFormChange(index, name, value)}
              />
            </div>

            {forms[index][`answer-${index}`] === "Sí" && (
              <HealthConditionForm
                formData={forms[index]}
                onChange={(field, value) =>
                  handleFormChange(index, field, value)
                }
                index={index}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};
