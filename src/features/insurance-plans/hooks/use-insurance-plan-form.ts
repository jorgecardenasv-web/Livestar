import { FormState } from "@/shared/types";
import { usePriceTable } from "./use-price-table";
import { useModalStore } from "@/shared/store/modal-store";

export const useInsurancePlanForm = (
  serverAction: (formData: FormData) => Promise<FormState>
) => {
  const { prices, isMultiple } = usePriceTable();
  const { openModal } = useModalStore();

  const handleSubmit = async (formData: FormData) => {
    formData.append("prices", JSON.stringify(prices));
    formData.append("isMultiple", JSON.stringify(isMultiple));
    await serverAction(formData);
  };

  const openDeletePlanModal = (data: any) => openModal("deletePlan", data);

  return {
    handleSubmit,
    prices: prices,
    openDeletePlanModal,
  };
};
