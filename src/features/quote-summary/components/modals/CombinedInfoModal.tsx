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

export default function CombinedInfoModal() {
  const { modalProps, closeModal } = useQuoteSumaryActions();

  // Datos de deducibles
  const rawDeductibles = JSON.parse(modalProps.deductibles || "{}");

  // Datos de coaseguro
  const rawCoInsurance = JSON.parse(modalProps.coInsurance || "{}");
  const rawCoInsuranceCap = JSON.parse(modalProps.coInsuranceCap || "{}");

  // Procesamos los datos de deducibles
  const transformedDeductiblesData = Object.entries(rawDeductibles).reduce(
    (acc: any, [key, values]: [string, any]) => {
      Object.entries(values).forEach(([hospitalLevel, amount]) => {
        if (!acc[hospitalLevel]) {
          acc[hospitalLevel] = { hospitalLevel };
        }
        acc[hospitalLevel][`deductible_${key}`] = amount;
      });
      return acc;
    },
    {}
  );

  // Procesamos los datos de coaseguro
  const transformedCoInsuranceData = Object.entries(rawCoInsurance).reduce(
    (acc: any, [key, values]: [string, any]) => {
      Object.entries(values).forEach(([hospitalLevel, amount]) => {
        if (!acc[hospitalLevel]) {
          acc[hospitalLevel] = { hospitalLevel };
        }
        acc[hospitalLevel][`coInsurance_${key}`] = amount;
      });
      return acc;
    },
    transformedDeductiblesData
  );

  // Procesamos los datos de topes de coaseguro
  const transformedCoInsuranceCapData = Object.entries(rawCoInsuranceCap).reduce(
    (acc: any, [key, values]: [string, any]) => {
      Object.entries(values).forEach(([hospitalLevel, amount]) => {
        if (!acc[hospitalLevel]) {
          acc[hospitalLevel] = { hospitalLevel };
        }
        acc[hospitalLevel][`coInsuranceCap_${key}`] = amount;
      });
      return acc;
    },
    transformedCoInsuranceData
  );

  // Ordenamos los niveles hospitalarios
  const hospitalLevels = ["A", "B", "C", "D"];
  const sortedData = hospitalLevels
    .map((level) => transformedCoInsuranceCapData[level])
    .filter(Boolean);

  return (
    <div className="fixed inset-0 pt-16 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-screen-xl w-full mx-auto">
        <h2 className="text-3xl font-bold text-center text-gradiant mb-4">
          Deducibles y Coaseguros por Nivel Hospitalario
        </h2>
        <div className="text-lg text-center mb-10 mt-4 px-1 md:px-36">
          Si llegaras a tener un padecimiento o accidente, podrás acudir a un hospital
          de cualquier nivel y tu participación sería de acuerdo a tu elección:
        </div>
        <Card>
          <Table className="w-full text-center border-collapse">
            <TableHeader>
              <TableRow>
                <TableHead rowSpan={2} className="text-lg text-center align-middle text-sky-600">
                  Nivel de atención hospitalaria
                </TableHead>
                <TableHead colSpan={2} className="text-lg text-center text-sky-600 border-b">
                  Menores de 45 años
                </TableHead>
                <TableHead colSpan={2} className="text-lg text-center text-sky-600 border-b">
                  Mayores de 45 años
                </TableHead>
              </TableRow>
              <TableRow>
                <TableHead className="text-sm text-center text-sky-600">Deducible</TableHead>
                <TableHead className="text-sm text-center text-sky-600">Coaseguro (Tope)</TableHead>
                <TableHead className="text-sm text-center text-sky-600">Deducible</TableHead>
                <TableHead className="text-sm text-center text-sky-600">Coaseguro (Tope)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((row) => (
                <TableRow key={row.hospitalLevel}>
                  <TableCell className="flex justify-center">
                    <div className="bg-sky-100 px-3 py-1.5 rounded-lg text-sky-600">
                      {row.hospitalLevel}
                    </div>
                  </TableCell>

                  {/* Deducible para menores de 45 años */}
                  <TableCell className="font-bold text-[#223E99]">
                    {formatCurrency(row.deductible_opcion_2 || 0)}
                  </TableCell>

                  {/* Coaseguro para menores de 45 años */}
                  <TableCell className="font-bold text-[#223E99]">
                    {formatPercentage(Number(row.coInsurance_opcion_2 || 0))}
                    {row.coInsuranceCap_opcion_2 && (
                      <div className="text-xs text-muted-foreground">
                        Tope: {formatCurrency(row.coInsuranceCap_opcion_2)}
                      </div>
                    )}
                  </TableCell>

                  {/* Deducible para mayores de 45 años */}
                  <TableCell className="font-bold text-[#223E99]">
                    {formatCurrency(row.deductible_opcion_4 || 0)}
                  </TableCell>

                  {/* Coaseguro para mayores de 45 años */}
                  <TableCell className="font-bold text-[#223E99]">
                    {formatPercentage(Number(row.coInsurance_opcion_4 || 0))}
                    {row.coInsuranceCap_opcion_4 && (
                      <div className="text-xs text-muted-foreground">
                        Tope: {formatCurrency(row.coInsuranceCap_opcion_4)}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <button
          onClick={closeModal}
          className="text-lg mt-4 px-4 py-2 w-full bg-primary text-white rounded-md hover:bg-primary/90 block mx-auto"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
