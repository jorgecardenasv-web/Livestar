import { QUESTIONS } from "@/features/quote/data";
import { normalizeFormData } from "@/features/quote/utils/normalize-form-data";
import { useModalStore } from "@/shared/store/modal-store";
import { useState } from "react";

export function useQuoteSumaryActions() {
  const {
    isOpen,
    modalProps,
    modalType,
    closeModal,
    openModal: openModalStore,
  } = useModalStore();

  const openModalMoreInformation = (individualPrices: any) =>
    openModalStore("moreInformationQuote", individualPrices);

  const openModalMultipleDeductible = (
    title: string,
    children: string,
    deductibles: any
  ) => openModalStore("multipleDeducible", { title, children, deductibles });

  const openModal = (type: string, props: any) => openModalStore(type, props);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // setIsSubmitting(true);
  //   try {
  //     // const schema = buildSchema(formData.protectWho!);
  //     // const validatedData = schema.parse(formData);
  //     // const cleanedData = cleanFormData(validatedData);

  //     // if (QUESTIONS && forms.length > 0) {
  //     //   const medErrors = validateMedicalConditions();
  //     //   if (Object.keys(medErrors).length > 0) {
  //     //     setMedicalErrors(medErrors);
  //     //     return;
  //     //   }
  //     //   const medicalData = formatMedicalData();
  //     //   await createQuoteAction({
  //     //     medicalData,
  //     //     prospectData: cleanedData,
  //     //   });
  //     // }

  //     // if (!initialState) {
  //     //   await createProspect(cleanedData);
  //     // }
  //     closeModal();
  //   } catch (error) {
  //     // if (error instanceof z.ZodError) {
  //     //   const newErr: Record<string, string> = {};
  //     //   error.errors.forEach((err) => {
  //     //     newErr[err.path.join(".")] = err.message;
  //     //   });
  //     //   setErrors(newErr);
  //     // }
  //   } finally {
  //     // setIsSubmitting(false);
  //   }
  // };

  // const [forms, setForms] = useState<any[]>(() =>
  //   QUESTIONS
  //     ? prospect && prospect.medicalHistories
  //       ? prospect.medicalHistories
  //       : createInitialMedicalForms(QUESTIONS)
  //     : []
  // );

  // const INITIAL_HEALTH_CONDITION = {
  //   hospitalizado: "No",
  //   complicacion: "No",
  //   estadoSalud: "Sano",
  //   medicamento: "No",
  //   nombrePadecimiento: "",
  //   tipoEvento: "",
  //   tipoTratamiento: "",
  //   detalleComplicacion: "",
  //   detalleMedicamento: "",
  // };

  // const createInitialMedicalForms = (questions: any[]) =>
  //   questions.map((question) => ({
  //     [`answer-${question.id}`]: "No",
  //     healthConditions: [{ ...INITIAL_HEALTH_CONDITION }],
  //   }));

  // const [formData, setFormData] = useState<FormData>(() => {
  //   const normalized = normalizeFormData(prospect);
  //   return normalized;
  // });

  return {
    // handleSubmit,
    // forms,
    // setForms,
    // formData,
    // setFormData,
    openModalMoreInformation,
    openModalMultipleDeductible,
    openModal,
    closeModal,
    isOpen,
    modalType,
    modalProps,
  };
}
