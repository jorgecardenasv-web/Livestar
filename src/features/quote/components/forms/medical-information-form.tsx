"use client";

import HealthConditionForm from "./healt-condition-form";
import RadioGroup from "../inputs/radio-group-medical";
import {
  FormDataMedical,
  HealthCondition,
  Question,
  RadioOption,
} from "../../types";

import { Plus, X } from "lucide-react";
import { FormData } from "../../schemas/form-schema";
import { Separator } from "@/shared/components/ui/separator";

interface MedicalInformationProps {
  forms: any[];
  setForms: React.Dispatch<React.SetStateAction<any[]>>;
  questions: Question[];
  formFamily: FormData;
  errors: { [key: string]: string };
}

export const MedicalInformationForm: React.FC<MedicalInformationProps> = ({
  forms,
  setForms,
  questions,
  formFamily,
  errors,
}) => {
  const handleFormChangeRadio = (
    index: number,
    field: keyof FormDataMedical,
    value: string | RadioOption | Date | null | undefined
  ) => {
    const updatedForms = [...forms];

    if (!updatedForms[index]) {
      updatedForms[index] = {};
    }

    updatedForms[index] = { ...updatedForms[index], [field]: value };
    setForms(updatedForms);
  };

  const handleFormChange2 = (
    formIndex: number,
    conditionIndex: number,
    field: keyof HealthCondition,
    value: string | RadioOption | Date | null | undefined
  ) => {
    setForms((prevForms) => {
      const updatedForms = [...prevForms];
      const updatedConditions = [...updatedForms[formIndex].healthConditions];

      updatedConditions[conditionIndex] = {
        ...updatedConditions[conditionIndex],
        [field]: value,
      };

      updatedForms[formIndex] = {
        ...updatedForms[formIndex],
        healthConditions: updatedConditions,
      };

      return updatedForms;
    });
  };
  const addHealthCondition = (personaIndex: number) => {
    const { protectWho, childrenCount } = formFamily;
    let maxConditions = 1;

    switch (protectWho) {
      case "mi_pareja_y_yo":
        maxConditions = 2;
        break;
      case "familia":
        maxConditions = 2 + (childrenCount || 0);
        break;
      case "mis_hijos_y_yo":
        maxConditions = 1 + (childrenCount || 0);
        break;
      case "solo_mis_hijos":
        maxConditions = childrenCount || 0;
        break;
      case "mis_padres":
        maxConditions = 2;
        break;
    }

    if (forms[personaIndex].healthConditions?.length >= maxConditions) {
      console.warn("Se ha alcanzado el límite máximo de condiciones de salud.");
      return;
    }

    const updatedForms = [...forms];
    const newCondition: HealthCondition = {
      nombrePadecimiento: "",
      tipoEvento: "",
      fechaInicio: undefined,
      tipoTratamiento: "",
      hospitalizado: "No",
      complicacion: "No",
      detalleComplicacion: "",
      estadoSalud: "Sano",
      medicamento: "No",
      detalleMedicamento: "",
    };

    if (!updatedForms[personaIndex].healthConditions) {
      updatedForms[personaIndex].healthConditions = [];
    }

    updatedForms[personaIndex].healthConditions.push(newCondition);
    setForms(updatedForms);
  };

  const handleDeleteCondition = (formIndex: number, conditionIndex: number) => {
    setForms((prevForms) => {
      const updatedForms = [...prevForms];

      if (updatedForms[formIndex]?.healthConditions) {
        const updatedConditions = [...updatedForms[formIndex].healthConditions];

        if (updatedConditions.length > 1) {
          updatedConditions.splice(conditionIndex, 1);

          updatedForms[formIndex] = {
            ...updatedForms[formIndex],
            healthConditions: updatedConditions,
          };
        } else {
          console.warn("Debe haber al menos una condición de salud.");
        }
      }

      return updatedForms;
    });
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
                onChange={(name, value) =>
                  handleFormChangeRadio(index, name, value)
                }
              />
            </div>

            {forms[index][`answer-${index}`] === "Sí" && (
              <>
                {forms[index].healthConditions?.map(
                  (condition: HealthCondition, conditionIndex: number) => (
                    <>
                      {conditionIndex > 0 && (
                        <div className="flex justify-between">
                          <h1>Paciente {conditionIndex + 1} </h1>
                          <button
                            onClick={() =>
                              handleDeleteCondition(index, conditionIndex)
                            }
                          >
                            <X className="text-red-500 hover:text-red-600" />
                          </button>
                        </div>
                      )}
                      <HealthConditionForm
                        key={conditionIndex}
                        formData={condition}
                        onChange={(field, value) =>
                          handleFormChange2(index, conditionIndex, field, value)
                        }
                        index={conditionIndex}
                        indexform={index}
                        errors={errors}
                      />
                      <Separator />
                    </>
                  )
                )}
                {formFamily.protectWho !== "solo_yo" && (
                  <button
                    type="button"
                    onClick={() => addHealthCondition(index)}
                    className="text-primary font-semibold "
                  >
                    <span className="flex gap-2 hover:underline">
                      <Plus /> Agregar otra persona
                    </span>
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
