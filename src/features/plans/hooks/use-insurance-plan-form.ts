import { FormState } from "@/shared/types";
import { useModalStore } from "@/shared/store/modal-store";
import { useState, useEffect } from "react";
import { useNotificationStore } from "@/features/notification/store/notification-store";

export const useInsurancePlanForm = (
  serverAction: (formData: FormData) => Promise<FormState>
) => {
  const [prices, setPrices] = useState<any[]>([]);
  const [isMultiple, setIsMultiple] = useState<boolean>(false);
  const [isRecommended, setIsRecommended] = useState<boolean>(false);
  const [isHDI, setIsHDI] = useState(false);
  const { openModal } = useModalStore();
  const { showNotification } = useNotificationStore();

  const handleSubmit = async (formData: FormData) => {
    formData.append("prices", JSON.stringify(prices));
    formData.append("isMultiple", JSON.stringify(isMultiple));
    formData.append("isHDI", JSON.stringify(isHDI));
    formData.append("isRecommended", JSON.stringify(isRecommended));
    const { message, success } = await serverAction(formData);

    if (!success) {
      showNotification(message, "error");
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
    isHDI,
    setIsHDI,
    isRecommended,
    setIsRecommended,
  };
};
