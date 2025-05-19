import { FormState } from "@/shared/types";
import { useModalStore } from "@/shared/store/modal-store";
import { useState } from "react";
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
    try {
      // Verifica si additionalInfoHtml existe en formData
      const additionalInfoHtml = formData.get("additionalInfoHtml");

      formData.append("prices", JSON.stringify(prices));
      formData.append("isMultiple", JSON.stringify(isMultiple));
      formData.append(
        "isMultipleCoInsurance",
        JSON.stringify(isMultipleCoInsurance)
      );
      formData.append("isHDI", JSON.stringify(isHDI));
      formData.append("isRecommended", JSON.stringify(isRecommended));
      const { message, success } = await serverAction(formData);

      if (!success) {
        showNotification(message, "error");
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
