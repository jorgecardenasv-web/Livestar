import { useCallback, useState } from "react";

// Tipos de datos
export interface PriceData {
  age: number;
  mensualHombre: string;
  mensualMujer: string;
  anualHombre: string;
  anualMujer: string;
}

export type FieldType = keyof Omit<PriceData, "age">;

const MONTHS_IN_YEAR = 12;
const DECIMAL_PLACES = 2;

export const usePriceForm = () => {
  const [prices, setPrices] = useState<PriceData[]>([]);

  // Funcion para calcular el valor mensual a partir del anual
  const calculateMonthly = useCallback((annual: string): string => {
    const value = parseFloat(annual);
    return isNaN(value) ? "" : (value / MONTHS_IN_YEAR).toFixed(DECIMAL_PLACES);
  }, []);

  // Funcion para calcular el valor anual a partir del mensual
  const calculateAnnual = useCallback((monthly: string): string => {
    const value = parseFloat(monthly);
    return isNaN(value) ? "" : (value * MONTHS_IN_YEAR).toFixed(DECIMAL_PLACES);
  }, []);

  // Funcion para manejar el cambio de precio
  const handlePriceChange = useCallback(
    (age: number, field: FieldType, value: string) => {
      // Mapeo de campos dependientes
      const fieldMap: Record<
        FieldType,
        { dependentField: FieldType; calculate: (val: string) => string }
      > = {
        mensualHombre: {
          dependentField: "anualHombre",
          calculate: calculateAnnual,
        },
        mensualMujer: {
          dependentField: "anualMujer",
          calculate: calculateAnnual,
        },
        anualHombre: {
          dependentField: "mensualHombre",
          calculate: calculateMonthly,
        },
        anualMujer: {
          dependentField: "mensualMujer",
          calculate: calculateMonthly,
        },
      };

      // Actualizar el precio correspondiente
      setPrices((prevPrices) =>
        prevPrices.map((price) => {
          if (price.age === age) {
            const updatedPrice = { ...price, [field]: value };

            const mapping = fieldMap[field];
            if (mapping) {
              updatedPrice[mapping.dependentField] = value
                ? mapping.calculate(value)
                : "";
            }

            return updatedPrice;
          }
          return price;
        })
      );
    },
    [calculateAnnual, calculateMonthly]
  );

  // Funcion para manejar la subida de archivo
  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Procesar el archivo Excel
      try {
        const XLSX = (await import("xlsx")).default;
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json<number[]>(worksheet, {
          header: 1,
        });

        // Encontrar la edad máxima en el Excel
        let maxAge = 0;
        jsonData.forEach((row) => {
          if (Array.isArray(row) && typeof row[0] === "number") {
            maxAge = Math.max(maxAge, row[0]);
          }
        });

        // Crear array con todas las edades hasta la máxima encontrada
        const newPrices = Array.from({ length: maxAge + 1 }, (_, age) => {
          // Buscar datos existentes para esta edad
          const excelRow = jsonData.find((dataRow): dataRow is number[] => {
            return Array.isArray(dataRow) && dataRow[0] === age;
          });

          // Crear objeto de precio
          return {
            age,
            mensualHombre: excelRow?.[1]?.toFixed(DECIMAL_PLACES) || "",
            mensualMujer: excelRow?.[2]?.toFixed(DECIMAL_PLACES) || "",
            anualHombre: excelRow?.[3]?.toFixed(DECIMAL_PLACES) || "",
            anualMujer: excelRow?.[4]?.toFixed(DECIMAL_PLACES) || "",
          };
        });

        setPrices(newPrices);
      } catch (error) {
        console.error("Error al procesar el archivo:", error);
      }
    },
    []
  );

  return {
    prices,
    handlePriceChange,
    handleFileUpload,
  };
};
