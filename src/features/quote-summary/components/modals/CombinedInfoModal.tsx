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

export function DeductibleAndCoInsuranceInfoModal() {
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
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gradiant mb-3">
          Deducibles y Coaseguros
        </h2>
        <p className="text-sm sm:text-base md:text-lg px-3 sm:px-6 lg:px-24 max-w-4xl mx-auto">
          Si llegaras a tener un padecimiento o accidente, podrás acudir a un hospital
          de cualquier nivel y tu participación sería de acuerdo a tu elección:
        </p>
      </div>

      <Card className="overflow-hidden border-0 shadow-none sm:border sm:shadow-sm">
        {/* Tabla para desktop */}
        <div className="hidden lg:block">
          <Table className="w-full text-center border-collapse">
            <TableHeader>
              <TableRow>
                <TableHead rowSpan={2} className="text-base lg:text-lg text-center align-middle text-sky-600 min-w-[120px]">
                  Nivel de atención hospitalaria
                </TableHead>
                <TableHead colSpan={2} className="text-base lg:text-lg text-center text-sky-600 border-b">
                  Menores de 45 años
                </TableHead>
                <TableHead colSpan={2} className="text-base lg:text-lg text-center text-sky-600 border-b">
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
        </div>

        {/* Tabla simplificada para tablet */}
        <div className="hidden md:block lg:hidden overflow-x-auto">
          <Table className="w-full text-center border-collapse min-w-[600px]">
            <TableHeader>
              <TableRow>
                <TableHead className="text-sm md:text-base text-center text-sky-600 min-w-[80px]">
                  Nivel
                </TableHead>
                <TableHead className="text-sm md:text-base text-center text-sky-600">
                  Deducible &lt;45
                </TableHead>
                <TableHead className="text-sm md:text-base text-center text-sky-600">
                  Coaseguro &lt;45
                </TableHead>
                <TableHead className="text-sm md:text-base text-center text-sky-600">
                  Deducible &gt;45
                </TableHead>
                <TableHead className="text-sm md:text-base text-center text-sky-600">
                  Coaseguro &gt;45
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((row) => (
                <TableRow key={row.hospitalLevel}>
                  <TableCell className="flex justify-center">
                    <div className="bg-sky-100 px-2 py-1 rounded-lg text-sky-600 text-sm md:text-base">
                      {row.hospitalLevel}
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-[#223E99] text-sm md:text-base">
                    {formatCurrency(row.deductible_opcion_2 || 0)}
                  </TableCell>
                  <TableCell className="font-bold text-[#223E99] text-sm md:text-base">
                    <div>{formatPercentage(Number(row.coInsurance_opcion_2 || 0))}</div>
                    {row.coInsuranceCap_opcion_2 && (
                      <div className="text-xs md:text-sm text-muted-foreground">
                        {formatCurrency(row.coInsuranceCap_opcion_2)}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-bold text-[#223E99] text-sm md:text-base">
                    {formatCurrency(row.deductible_opcion_4 || 0)}
                  </TableCell>
                  <TableCell className="font-bold text-[#223E99] text-sm md:text-base">
                    <div>{formatPercentage(Number(row.coInsurance_opcion_4 || 0))}</div>
                    {row.coInsuranceCap_opcion_4 && (
                      <div className="text-xs md:text-sm text-muted-foreground">
                        {formatCurrency(row.coInsuranceCap_opcion_4)}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Vista de tarjetas para móvil */}
        <div className="block md:hidden space-y-5 px-2">
          {sortedData.map((row) => (
            <div key={row.hospitalLevel} className="border rounded-lg p-4 bg-gray-50 shadow-sm">
              <div className="flex justify-center mb-4">
                <div className="bg-sky-100 px-4 py-2 rounded-lg text-sky-600 font-semibold text-base">
                  Nivel {row.hospitalLevel}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5">
                {/* Menores de 45 años */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="text-sky-600 font-semibold text-base mb-3 text-center">
                    Menores de 45 años
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-gray-600 text-sm">Deducible:</div>
                      <div className="font-bold text-[#223E99] text-base mt-1">
                        {formatCurrency(row.deductible_opcion_2 || 0)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600 text-sm">Coaseguro:</div>
                      <div className="font-bold text-[#223E99] text-base mt-1">
                        {formatPercentage(Number(row.coInsurance_opcion_2 || 0))}
                      </div>
                      {row.coInsuranceCap_opcion_2 && (
                        <div className="text-xs mt-1 text-muted-foreground">
                          Tope: {formatCurrency(row.coInsuranceCap_opcion_2)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mayores de 45 años */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="text-sky-600 font-semibold text-base mb-3 text-center">
                    Mayores de 45 años
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-gray-600 text-sm">Deducible:</div>
                      <div className="font-bold text-[#223E99] text-base mt-1">
                        {formatCurrency(row.deductible_opcion_4 || 0)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600 text-sm">Coaseguro:</div>
                      <div className="font-bold text-[#223E99] text-base mt-1">
                        {formatPercentage(Number(row.coInsurance_opcion_4 || 0))}
                      </div>
                      {row.coInsuranceCap_opcion_4 && (
                        <div className="text-xs mt-1 text-muted-foreground">
                          Tope: {formatCurrency(row.coInsuranceCap_opcion_4)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}