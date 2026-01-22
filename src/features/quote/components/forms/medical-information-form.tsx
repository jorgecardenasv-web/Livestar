"use client";

import { HealthConditionForm } from "./healt-condition-form";
import RadioGroup from "../inputs/radio-group-medical";
import {
  HealthCondition,
  MedicalQuestionForm,
  Question,
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
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";

const addPadecimiento = (
  questionIndex: number,
  forms: MedicalQuestionForm[],
  setForms: React.Dispatch<React.SetStateAction<MedicalQuestionForm[]>>
) => {
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

const handleDeletePadecimiento = (
  qIndex: number,
  pIndex: number,
  forms: MedicalQuestionForm[],
  setForms: React.Dispatch<React.SetStateAction<MedicalQuestionForm[]>>
) => {
  setForms((prev: MedicalQuestionForm[]) => {
    const updated = [...prev];
    const condiciones = [...(updated[qIndex].healthConditions || [])];
    condiciones.splice(pIndex, 1);
    updated[qIndex].healthConditions = condiciones;
    if (updated[qIndex].activePadecimiento === pIndex) {
      updated[qIndex].activePadecimiento = condiciones.length ? 0 : null;
    }
    return updated;
  });
};

interface MedicalInformationProps {
  forms: MedicalQuestionForm[];
  setForms: React.Dispatch<React.SetStateAction<MedicalQuestionForm[]>>;
  questions: Question[];
  formFamily: FormData;
  errors: { [key: string]: string };
  useCheckboxes?: boolean;
}

export const MedicalInformationForm: React.FC<MedicalInformationProps> = ({
  forms,
  setForms,
  questions,
  formFamily,
  errors,
  useCheckboxes = false,
}) => {
  return (
    <div className="space-y-6 py-6">
      <div className="flex items-center space-x-4">
        <div>

        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          Información médica
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          Completa este formulario para ajustar tu cotización con mayor precisión. No es obligatorio.
        </p>
        </div>
      </div>

      {questions.map((question, index) => {
        const disableMedical =
          (formFamily.protectWho === "solo_mis_hijos" && !formFamily.childrenCount) ||
          (formFamily.protectWho === "otros" &&
            (!formFamily.protectedCount ||
              !formFamily.protectedPersons ||
              formFamily.protectedPersons.every((p: any) => !p.relationship)));
        const answerKey = `answer-${index}`;
        const currentAnswer =
          (forms[index]?.[answerKey] as "Sí" | "No" | undefined) ?? undefined;

        const handleAnswerChange = (value: "Sí" | "No" | undefined) => {
          const updated = [...forms];
          updated[index] = { ...updated[index], [answerKey]: value };
          if (value === "Sí") {
            if (
              updated[index].healthConditions &&
              updated[index].healthConditions.length > 0
            ) {
              updated[index].activePadecimiento = 0;
            }
          } else {
            updated[index].activePadecimiento = null;
            updated[index].healthConditions = [];
          }
          setForms(updated);
        };

        return (
          <div key={question.id || index}>
            <p className="mb-2">
              {index + 1}.- {question.text}
            </p>
            {useCheckboxes ? (
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`answer-${index}-si`}
                    checked={currentAnswer === "Sí"}
                    disabled={disableMedical}
                    onCheckedChange={(checked) =>
                      handleAnswerChange(checked === true ? "Sí" : undefined)
                    }
                  />
                  <Label htmlFor={`answer-${index}-si`}>Sí</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`answer-${index}-no`}
                    checked={currentAnswer === "No"}
                    disabled={disableMedical}
                    onCheckedChange={(checked) =>
                      handleAnswerChange(checked === true ? "No" : undefined)
                    }
                  />
                  <Label htmlFor={`answer-${index}-no`}>No</Label>
                </div>
              </div>
            ) : (
              <RadioGroup
                name={answerKey}
                options={["Sí", "No"]}
                value={currentAnswer}
                disabled={disableMedical}
                onChange={(_, value) => {
                  handleAnswerChange(value as "Sí" | "No");
                }}
              />
            )}
            {forms[index]?.[`answer-${index}`] === "Sí" &&
              errors[`question-${index}-noPadecimiento`] && (
                <p className="mt-2 text-sm text-red-600">
                  {errors[`question-${index}-noPadecimiento`]}
                </p>
              )}
            {forms[index]?.[`answer-${index}`] === "Sí" && (
              <div className="mt-4">
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
                            {padecimiento.nombrePadecimiento
                              ? `Padecimiento: ${padecimiento.nombrePadecimiento}`
                              : `Padecimiento ${pIndex + 1}`}
                          </AccordionTrigger>
                          <AccordionContent className="w-full px-1 space-y-4">
                            <SelectInput
                              label="Asegurado"
                              name={`padecimiento-persona-${index}-${pIndex}`}
                              options={
                                (() => {
                                  if (formFamily.protectWho === "familia") {
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
                                  if (formFamily.protectWho === "mis_hijos_y_yo") {
                                    const opts = [{ label: "Yo", value: "Yo" }];
                                    (formFamily.children || []).forEach((child: any, index: number) => {
                                      const label = child.gender === "mujer" ? `Hija ${index + 1}` : `Hijo ${index + 1}`;
                                      opts.push({ label, value: label });
                                    });
                                    return opts;
                                  }
                                  if (formFamily.protectWho === "solo_mis_hijos") {
                                    return (formFamily.children || []).map((child: any, index: number) => {
                                      const label = child.gender === "mujer" ? `Hija ${index + 1}` : `Hijo ${index + 1}`;
                                      return { label, value: label };
                                    });
                                  }
                                  if (formFamily.protectWho === "otros") {
                                    return (formFamily.protectedPersons || []).map((person: any, idx: number) => {
                                      const label = person.relationship + ((formFamily.protectedPersons.filter((p: any) => p.relationship === person.relationship).length > 1)
                                        ? ` ${idx + 1}` : "");
                                      return { label, value: person.relationship };
                                    });
                                  }
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
        );
      })}
    </div>
  );
};
