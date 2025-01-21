import { usePriceTable } from "./use-price-table";

export const useInsurancePlanForm = (
  serverAction: (formData: FormData) => Promise<void>
) => {
  const { prices } = usePriceTable();

  const handleSubmit = async (formData: FormData) => {
    formData.append("prices", JSON.stringify(prices));

    await serverAction(formData);
  };

  return {
    handleSubmit,
    prices: prices,
  };
};
