"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Upload } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/shared/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
// import type { PriceData, FieldType } from './types';

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

const FIELD_TYPES: Record<string, FieldType> = {
  MONTHLY_MALE: "mensualHombre",
  MONTHLY_FEMALE: "mensualMujer",
  ANNUAL_MALE: "anualHombre",
  ANNUAL_FEMALE: "anualMujer",
} as const;

const PriceInput = React.memo(
  ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (value: string) => void;
  }) => (
    <Input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full"
    />
  )
);

PriceInput.displayName = "PriceInput";

export const PriceTable: React.FC = () => {
  const [prices, setPrices] = useState<PriceData[]>([]);

  const calculateMonthly = useCallback((annual: string): string => {
    const value = parseFloat(annual);
    return isNaN(value) ? "" : (value / MONTHS_IN_YEAR).toFixed(DECIMAL_PLACES);
  }, []);

  const calculateAnnual = useCallback((monthly: string): string => {
    const value = parseFloat(monthly);
    return isNaN(value) ? "" : (value * MONTHS_IN_YEAR).toFixed(DECIMAL_PLACES);
  }, []);

  const handlePriceChange = useCallback(
    (age: number, field: FieldType, value: string) => {
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

  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

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

          return {
            age,
            mensualHombre: excelRow?.[1]?.toString() || "",
            mensualMujer: excelRow?.[2]?.toString() || "",
            anualHombre: excelRow?.[3]?.toString() || "",
            anualMujer: excelRow?.[4]?.toString() || "",
          };
        });

        setPrices(newPrices);
      } catch (error) {
        console.error("Error al procesar el archivo:", error);
      }
    },
    []
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Tabla de Precios por Edad y Género</span>
          <div className="relative">
            <Input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Importar Excel
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="rounded-md border"
          style={{
            maxHeight: "500px",
            overflowY: "auto",
          }}
        >
          {prices.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] text-center">Edad</TableHead>
                  <TableHead colSpan={2} className="text-center">Mensual</TableHead>
                  <TableHead colSpan={2} className="text-center">Anual</TableHead>
                </TableRow>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead className="text-center">Hombre</TableHead>
                  <TableHead className="text-center">Mujer</TableHead>
                  <TableHead className="text-center">Hombre</TableHead>
                  <TableHead className="text-center">Mujer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prices.map((row) => (
                  <TableRow key={row.age}>
                    <TableCell className="text-center">{row.age}</TableCell>
                    <TableCell>
                      <PriceInput
                        value={row.mensualHombre}
                        onChange={(value) =>
                          handlePriceChange(row.age, "mensualHombre", value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <PriceInput
                        value={row.mensualMujer}
                        onChange={(value) =>
                          handlePriceChange(row.age, "mensualMujer", value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <PriceInput
                        value={row.anualHombre}
                        onChange={(value) =>
                          handlePriceChange(row.age, "anualHombre", value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <PriceInput
                        value={row.anualMujer}
                        onChange={(value) =>
                          handlePriceChange(row.age, "anualMujer", value)
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-4 text-center">No hay datos para mostrar</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
