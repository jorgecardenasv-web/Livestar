import { Card } from "@/shared/components/ui/card";
import {
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHead,
  TableBody,
} from "@/shared/components/ui/table";
import React from "react";
import { useQuoteSumaryActions } from "../../hooks/use-quote-sumary-actions";
import { formatCurrency, formatPercentage } from "@/shared/utils";

export default function MultipleCoInsuranceModal() {
  const { modalProps, closeModal } = useQuoteSumaryActions();
  const rawCoInsurance = JSON.parse(modalProps.coInsurance || "{}");
  const rawCoInsuranceCap = JSON.parse(modalProps.coInsuranceCap || "{}");

  const transformedData = Object.entries(rawCoInsurance).reduce(
    (acc: any[], [key, values]: [string, any]) => {
      Object.entries(values).forEach(([hospitalLevel, amount]) => {
        const existingGroup = acc.find(
          (item) => item.hospitalLevel === hospitalLevel
        );
        if (existingGroup) {
          existingGroup[key] = amount;
        } else {
          acc.push({
            hospitalLevel,
            [key]: amount,
          });
        }
      });
      return acc;
    },
    []
  );

  const capData = Object.entries(rawCoInsuranceCap).reduce(
    (acc: any, [key, values]: [string, any]) => {
      Object.entries(values).forEach(([hospitalLevel, amount]) => {
        if (!acc[hospitalLevel]) {
          acc[hospitalLevel] = {};
        }
        acc[hospitalLevel][key] = amount;
      });
      return acc;
    },
    {}
  );

  const hospitalLevels = ["A", "B", "C", "D"];
  const sortedData = hospitalLevels
    .map((level) => transformedData.find((item) => item.hospitalLevel === level))
    .filter(Boolean);

  return (
    <Card className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Tabla de Coaseguros</h2>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[180px]">Nivel Hospitalario</TableHead>
            <TableHead>0 - 44 años</TableHead>
            <TableHead>45+ años</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow key={row.hospitalLevel}>
              <TableCell className="font-medium">
                Nivel {row.hospitalLevel}
              </TableCell>
              <TableCell>
                {formatPercentage(Number(row.opcion_2 ?? 0))}
                {capData[row.hospitalLevel]?.opcion_2 && (
                  <span className="text-xs text-muted-foreground ml-2">
                    (Tope: {formatCurrency(Number(capData[row.hospitalLevel].opcion_2))})
                  </span>
                )}
              </TableCell>
              <TableCell>
                {formatPercentage(Number(row.opcion_4 ?? 0))}
                {capData[row.hospitalLevel]?.opcion_4 && (
                  <span className="text-xs text-muted-foreground ml-2">
                    (Tope: {formatCurrency(Number(capData[row.hospitalLevel].opcion_4))})
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-end">
        <button
          onClick={closeModal}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
        >
          Cerrar
        </button>
      </div>
    </Card>
  );
}
