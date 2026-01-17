import { HealthCondition, MedicalQuestionForm } from "../types";

export const updateForms = (
  forms: MedicalQuestionForm[],
  questionIndex: number,
  updater: (current: MedicalQuestionForm) => MedicalQuestionForm
): MedicalQuestionForm[] => {
  const updated = [...forms];
  updated[questionIndex] = updater(updated[questionIndex]);
  return updated;
};

export const addMedicalCondition = (
  forms: MedicalQuestionForm[],
  questionIndex: number
): MedicalQuestionForm[] => {
  const newCondition: HealthCondition & { persona?: string } = {
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
  return updateForms(forms, questionIndex, (current) => {
    const conditions = current.healthConditions
      ? [...current.healthConditions]
      : [];
    conditions.push(newCondition);
    return {
      ...current,
      healthConditions: conditions,
      activePadecimiento: conditions.length - 1,
    };
  });
};

export const removeMedicalCondition = (
  forms: MedicalQuestionForm[],
  questionIndex: number,
  conditionIndex: number
): MedicalQuestionForm[] => {
  return updateForms(forms, questionIndex, (current) => {
    const conditions = [...(current.healthConditions || [])];
    conditions.splice(conditionIndex, 1);
    return {
      ...current,
      healthConditions: conditions,
      activePadecimiento: conditions.length ? 0 : null,
    };
  });
};

export const selectPersonOnCondition = (formFamily: any) => {
  if (formFamily.protectWho === "familia") {
    const opts: { label: string; value: string }[] = [
      { label: "Yo", value: "Yo" },
      { label: "Mi Pareja", value: "Mi Pareja" },
    ];
    (formFamily.children || []).forEach((child: any, idx: number) => {
      const label =
        child.gender === "mujer" ? `Hija ${idx + 1}` : `Hijo ${idx + 1}`;
      opts.push({ label, value: label });
    });
    return opts;
  }
  if (
    formFamily.protectWho === "mis_hijos_y_yo" ||
    formFamily.protectWho === "solo_mis_hijos"
  ) {
    return (formFamily.children || []).map((child: any, idx: number) => {
      const label =
        child.gender === "mujer" ? `Hija ${idx + 1}` : `Hijo ${idx + 1}`;
      return { label, value: label };
    });
  }
  if (formFamily.protectWho === "otros") {
    return (formFamily.protectedPersons || []).map(
      (person: any, idx: number) => {
        const label =
          person.relationship +
          (formFamily.protectedPersons.filter(
            (p: any) => p.relationship === person.relationship
          ).length > 1
            ? ` ${idx + 1}`
            : "");
        return { label, value: person.relationship };
      }
    );
  }
  const optionsMapping: Record<string, string[]> = {
    mi_pareja_y_yo: ["Yo", "Mi Pareja"],
    mis_padres: ["Madre", "Padre"],
    solo_yo: ["Yo"],
    otros: ["Otros"],
  };
  const opts = optionsMapping[formFamily.protectWho] || [];
  return opts.map((opt) => ({ label: opt, value: opt }));
};
