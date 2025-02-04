"use client";

import { HealthConditionForm } from "./healt-condition-form";
import RadioGroup from "../inputs/radio-group-medical";
import {
  FormDataMedical,
  HealthCondition,
  Question,
  RadioOption,
} from "../../types";
import { Plus, X } from "lucide-react";
import { FormData } from "../../schemas/form-schema";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/shared/components/ui/accordion";
import { Button } from "@/shared/components/ui/button";
import { SelectInput } from "@/shared/components/ui/select-input";

// Helper para renderizar opciones según protectWho
const renderPersonOptions = (protectWho: string): JSX.Element[] => {
  const optionsMapping: Record<string, string[]> = {
    familia: ["Yo", "Mi Pareja", "Hijos"],
    mi_pareja_y_yo: ["Yo", "Mi Pareja"],
    mis_hijos_y_yo: ["Yo", "Hijos"],
    solo_mis_hijos: ["Hijos"],
    otros: ["Otros"],
    mis_padres: ["Madre", "Padre"],
    solo_yo: ["Yo"],
  };
  const options = optionsMapping[protectWho] || [];
  return options.map((opt) => (
    <option key={opt} value={opt}>
      {opt}
    </option>
  ));
};

// Actualizamos addPadecimiento para usar healthConditions en lugar de padecimientos
const addPadecimiento = (questionIndex: number, forms: any[], setForms: React.Dispatch<any>) => {
  const updatedForms = [...forms];
  const newIndex = updatedForms[questionIndex].healthConditions
    ? updatedForms[questionIndex].healthConditions.length
    : 0;
  const newPadecimiento: HealthCondition & { persona?: string } = {
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
    persona: "",
  };
  if (!updatedForms[questionIndex].healthConditions) {
    updatedForms[questionIndex].healthConditions = [];
  }
  updatedForms[questionIndex].healthConditions.push(newPadecimiento);
  updatedForms[questionIndex].activePadecimiento = newIndex;
  setForms(updatedForms);
};

// Modificar handleDeletePadecimiento para actualizar healthConditions
const handleDeletePadecimiento = (
  qIndex: number,
  pIndex: number,
  forms: any[],
  setForms: React.Dispatch<any>
) => {
  setForms((prev: any[]) => {
    const updated = [...prev];
    const condiciones = [...updated[qIndex].healthConditions];
    condiciones.splice(pIndex, 1);
    updated[qIndex].healthConditions = condiciones;
    if (updated[qIndex].activePadecimiento === pIndex) {
      updated[qIndex].activePadecimiento = condiciones.length ? 0 : null;
    }
    return updated;
  });
};

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
  return (
    <>
      <div className="flex items-center space-x-4">
        <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl">
          3
        </span>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          Información médica
        </h3>
      </div>

      {/* Preguntas se muestran fijas */}
      {questions.map((question, index) => (
        <div key={question.id || index}>
          <p className="mb-2">
            {index + 1}.- {question.text}
          </p>
          {/* RadioGroup para la respuesta */}
          <RadioGroup
            name={`answer-${index}`}
            options={["Sí", "No"]}
            value={forms[index]?.[`answer-${index}`]}
            onChange={(name, value) => {
              const updated = [...forms];
              updated[index] = { ...updated[index], [name]: value };
              if (value === "Sí") {
                if (updated[index].healthConditions && updated[index].healthConditions.length > 0) {
                  updated[index].activePadecimiento = 0;
                }
              } else {
                updated[index].activePadecimiento = null;
              }
              setForms(updated);
            }}
          />
          {/* Nueva validación: si existe error de noPadecimiento, se muestra */}
          {forms[index]?.[`answer-${index}`] === "Sí" &&
            errors[`question-${index}-noPadecimiento`] && (
              <p className="mt-2 text-sm text-red-600">
                {errors[`question-${index}-noPadecimiento`]}
              </p>
            )}
          {/* Si se responde "Sí", se muestran directamente los inputs */}
          {forms[index]?.[`answer-${index}`] === "Sí" && (
            <div className="mt-4">
              {/* Se utiliza Accordion con type "single" para colapsar los previos */}
              <Accordion
                type="single"
                collapsible
                value={
                  forms[index].activePadecimiento !== undefined &&
                    forms[index].activePadecimiento !== null
                    ? forms[index].activePadecimiento.toString()
                    : ""
                }
                onValueChange={(val) => {
                  const updated = [...forms];
                  updated[index] = { ...updated[index], activePadecimiento: val ? parseInt(val) : null };
                  setForms(updated);
                }}
              >
                {forms[index].healthConditions &&
                  forms[index].healthConditions.map(
                    (padecimiento: HealthCondition & { persona?: string }, pIndex: number) => (
                      <AccordionItem key={pIndex} value={pIndex.toString()}>
                        <AccordionTrigger>
                          {padecimiento.persona
                            ? `Padecimiento para ${padecimiento.persona}`
                            : `Padecimiento ${pIndex + 1}`}
                        </AccordionTrigger>
                        <AccordionContent className="w-full px-1 space-y-4">
                          {/* Select para preguntar a quién corresponde el padecimiento */}
                          <SelectInput
                            label="¿Para quién es el padecimiento?"
                            name={`padecimiento-persona-${index}-${pIndex}`}
                            options={
                              (() => {
                                if (formFamily.protectWho === "familia") {
                                  // En "familia": incluir "Yo", "Mi Pareja" y una opción por cada hijo
                                  const opts: { label: string; value: string }[] = [
                                    { label: "Yo", value: "Yo" },
                                    { label: "Mi Pareja", value: "Mi Pareja" },
                                  ];
                                  (formFamily.children || []).forEach((child: any, index: number) => {
                                    const label = child.gender === "mujer" ? `Hija ${index + 1}` : `Hijo ${index + 1}`;
                                    opts.push({ label, value: label });
                                  });
                                  return opts;
                                }
                                if (formFamily.protectWho === "mis_hijos_y_yo" || formFamily.protectWho === "solo_mis_hijos") {
                                  // Para estos casos, solo se listan los hijos individualmente
                                  return (formFamily.children || []).map((child: any, index: number) => {
                                    const label = child.gender === "mujer" ? `Hija ${index + 1}` : `Hijo ${index + 1}`;
                                    return { label, value: label };
                                  });
                                }
                                if (formFamily.protectWho === "otros") {
                                  return (formFamily.protectedPersons || []).map((person: any, idx: number) => {
                                    // Si se repiten relaciones, se puede agregar un número
                                    const label = person.relationship + ((formFamily.protectedPersons.filter((p: any) => p.relationship === person.relationship).length > 1)
                                      ? ` ${idx + 1}` : "");
                                    return { label, value: person.relationship };
                                  });
                                }
                                // Otros casos
                                const optionsMapping: Record<string, string[]> = {
                                  mi_pareja_y_yo: ["Yo", "Mi Pareja"],
                                  mis_padres: ["Madre", "Padre"],
                                  solo_yo: ["Yo"],
                                  otros: ["Otros"],
                                };
                                const opts = optionsMapping[formFamily.protectWho] || [];
                                return opts.map((opt) => ({ label: opt, value: opt }));
                              })()
                            }
                            value={padecimiento.persona || ""}
                            onValueChange={(value) => {
                              setForms((prev) => {
                                const updated = [...prev];
                                const items = [...(updated[index].healthConditions || [])];
                                items[pIndex] = { ...items[pIndex], persona: value as string };
                                updated[index].healthConditions = items;
                                return updated;
                              });
                            }}
                            error={
                              errors[`question-${index}-condition-${pIndex}-persona`] || ""
                            }
                          />
                          {/* Formulario de detalle del padecimiento */}
                          <HealthConditionForm
                            formData={padecimiento}
                            onChange={(field, value) => {
                              setForms((prev) => {
                                const updated = [...prev];
                                const items = [...(updated[index].healthConditions || [])];
                                items[pIndex] = { ...items[pIndex], [field]: value };
                                updated[index].healthConditions = items;
                                return updated;
                              });
                            }}
                            index={pIndex}
                            indexform={index}
                            errors={errors}
                          />

                          <Button
                            variant="outline"
                            type="button"
                            onClick={() =>
                              handleDeletePadecimiento(index, pIndex, forms, setForms)
                            }
                            className="text-red-500 hover:text-red-600 mt-4 flex items-center"
                          >
                            <X /> <span>Eliminar</span>
                          </Button>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  )}
              </Accordion>

              <Button
                type="button"
                variant="ghost"
                onClick={() => addPadecimiento(index, forms, setForms)}
                className="text-primary font-semibold mt-2"
              >
                <span className="flex gap-2 hover:underline">
                  <Plus /> Agregar Padecimiento
                </span>
              </Button>
            </div>
          )}
        </div>
      ))}
    </>
  );
};
