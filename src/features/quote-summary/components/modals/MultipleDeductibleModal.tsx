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

export default function MultipleDeductibleModal() {
  const { modalProps, closeModal } = useQuoteSumaryActions();
  const rawDeductibles = JSON.parse(modalProps.deductibles);

  const transformedData = Object.entries(rawDeductibles).reduce(
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

  return (
    <div className="fixed inset-0 pt-16 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-screen-xl  w-full mx-auto">
        <h2 className="text-4xl font-bold text-center text-gradiant mb-4">
          {modalProps.title}
        </h2>
        <div className="text-lg text-center mb-10 mt-4 px-1 md:px-36">
          {modalProps.children}
        </div>
        <Card>
          <Table className="w-full text-center border-collapse">
            <TableHeader>
              <TableRow>
                <TableHead className="text-lg text-center w-1/3 text-sky-600">
                  Nivel de atención hospitalaria
                </TableHead>
                <TableHead className="text-lg text-center w-1/3 text-sky-600">
                  Deducible: por cada padecimiento o accidente cubierto.
                  (Menores de 45 años)
                </TableHead>
                <TableHead className="text-lg text-center w-1/3 text-sky-600">
                  Deducible: por cada padecimiento o accidente cubierto.
                  (Mayores de 45 años)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transformedData.map((deductible: any) => (
                <TableRow key={deductible.hospitalLevel}>
                  <TableCell className="flex justify-center">
                    <div className="bg-sky-100 px-3 py-1.5 rounded-lg text-sky-600">
                      {deductible.hospitalLevel}
                    </div>
                  </TableCell>
                  <TableCell className="text-xl font-bold text-[#223E99]">
                    ${deductible.opcion_2.toLocaleString() || "N/A"}
                  </TableCell>
                  <TableCell className="text-xl font-bold text-[#223E99]">
                    ${deductible.opcion_4.toLocaleString() || "N/A"}
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
