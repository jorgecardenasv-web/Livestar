import { useState } from "react";
import { DateRange } from "react-day-picker";
import { generateReport } from "../../prospects/actions/generate-report";
import { useQuoteActions } from "./use-quote-actions";

export const useReport = () => {
  const { closeModal } = useQuoteActions();
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

        // Convertir base64 a bytes usando atob (compatible con el navegador)
        const binaryString = atob(base64Excel);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const blob = new Blob([bytes], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "Reporte_Cotizaciones.xlsx";
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
