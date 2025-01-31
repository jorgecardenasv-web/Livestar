import { useState } from "react";
import { DateRange } from "react-day-picker";
import { generateReport } from "../actions/generate-report";
import { useProspectActions } from "./use-prospect-actions";

export const useReport = () => {
  const { closeModal } = useProspectActions();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (dateRange?.from && dateRange?.to) {
      setIsLoading(true);
      try {
        const base64Excel = await generateReport(
          dateRange.from.toISOString(),
          dateRange.to.toISOString()
        );

        const blob = new Blob([Buffer.from(base64Excel, "base64")], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "Reporte_Prospectos.xlsx";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        closeModal();
      } catch (error) {
        console.error("Error al generar el reporte:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error("Por favor, selecciona un rango de fechas válido");
    }
  };

  return {
    dateRange,
    isLoading,
    handleDateChange,
    handleSubmit,
  };
};
