import { FormState } from "@/shared/types";
import { useModalStore } from "@/shared/store/modal-store";
import { useState, useEffect } from "react";
import { useNotificationStore } from "@/features/notification/store/notification-store";

export const useInsurancePlanForm = (
  serverAction: (formData: FormData) => Promise<FormState>
) => {
  const [prices, setPrices] = useState<any[]>([]);
  const [isMultiple, setIsMultiple] = useState<boolean>(false);
  const [isMultipleCoInsurance, setIsMultipleCoInsurance] =
    useState<boolean>(false);
  const [isRecommended, setIsRecommended] = useState<boolean>(false);
  const [isHDI, setIsHDI] = useState(false);
  const { openModal } = useModalStore();
  const { showNotification } = useNotificationStore();

  const handleSubmit = async (formData: FormData) => {
    console.log("Hook - Ejecutando handleSubmit");

    try {
      // Verifica si additionalInfoHtml existe en formData
      const additionalInfoHtml = formData.get("additionalInfoHtml");
      console.log(
        "Hook - additionalInfoHtml del formData:",
        additionalInfoHtml
      );

      formData.append("prices", JSON.stringify(prices));
      formData.append("isMultiple", JSON.stringify(isMultiple));
      formData.append(
        "isMultipleCoInsurance",
        JSON.stringify(isMultipleCoInsurance)
      );
      formData.append("isHDI", JSON.stringify(isHDI));
      formData.append("isRecommended", JSON.stringify(isRecommended));

      // Log all form data keys for debugging
      console.log("Hook - FormData keys:", Array.from(formData.keys()));

      console.log("Hook - Enviando datos al servidor");
      const { message, success } = await serverAction(formData);

      if (!success) {
        console.log("Hook - Error en la operación:", message);
        showNotification(message, "error");
      } else {
        console.log("Hook - Operación exitosa");
      }
    } catch (error) {
      console.error("Hook - Error inesperado:", error);
      showNotification("Error inesperado al procesar el formulario", "error");
    }
  };

  const openDeletePlanModal = (data: any) => openModal("deletePlan", data);

  return {
    handleSubmit,
    openDeletePlanModal,
    prices,
    setPrices,
    isMultiple,
    setIsMultiple,
    isMultipleCoInsurance,
    setIsMultipleCoInsurance,
    isHDI,
    setIsHDI,
    isRecommended,
    setIsRecommended,
  };
};
