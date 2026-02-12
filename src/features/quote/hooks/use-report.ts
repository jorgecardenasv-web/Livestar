import { useState } from "react";
import { generateReport } from "../../prospects/actions/generate-report";
import { useQuoteActions } from "./use-quote-actions";
import { DateRange } from "@/shared/components/ui/data-range-picker";

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
        // Obtener los componentes de fecha sin importar la zona horaria
        const fromDate = new Date(dateRange.from);
        const toDate = new Date(dateRange.to);
        
        // Extraer año, mes y día del date picker (interpretado en hora local del navegador)
        const startYear = fromDate.getFullYear();
        const startMonth = fromDate.getMonth();
        const startDay = fromDate.getDate();
        
        const endYear = toDate.getFullYear();
        const endMonth = toDate.getMonth();
        const endDay = toDate.getDate();
        
        // Crear fechas en hora local: inicio del día y fin del día
        const startOfDay = new Date(startYear, startMonth, startDay, 0, 0, 0, 0);
        const endOfDay = new Date(endYear, endMonth, endDay, 23, 59, 59, 999);
        
        console.log('📅 Rango de fechas para reporte (hora local de México):');
        console.log('  Inicio:', startOfDay.toString(), '→', startOfDay.toISOString());
        console.log('  Fin:', endOfDay.toString(), '→', endOfDay.toISOString());
        
        const base64Excel = await generateReport(
          startOfDay.toISOString(),
          endOfDay.toISOString()
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
