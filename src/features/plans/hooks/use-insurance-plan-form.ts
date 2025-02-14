import { FormState } from "@/shared/types";
import { useModalStore } from "@/shared/store/modal-store";
import { useState } from "react";

export const useInsurancePlanForm = (
  serverAction: (formData: FormData) => Promise<FormState>
) => {
  const [prices, setPrices] = useState<any[]>([]);
  const [isMultiple, setIsMultiple] = useState<boolean>(false);
  const [isRecommended, setIsRecommended] = useState<boolean>(false);
  const [isHDI, setIsHDI] = useState(false);
  const { openModal } = useModalStore();

  const handleSubmit = async (formData: FormData) => {
    formData.append("prices", JSON.stringify(prices));
    formData.append("isMultiple", JSON.stringify(isMultiple));
    formData.append("isHDI", JSON.stringify(isHDI));
    formData.append("isRecommended", JSON.stringify(isRecommended));
    await serverAction(formData);
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
