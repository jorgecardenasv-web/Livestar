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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  deductiblesJson: string;
}

export default function MultipleDeductibleModal({
  isOpen,
  onClose,
  title,
  children,
  deductiblesJson,
}: ModalProps) {
  if (!isOpen) return null;
  const rawDeductibles = JSON.parse(deductiblesJson);
  const uniqueDeductibles = rawDeductibles.reduce((acc: any[], deductible: any) => {
    const options = deductible.option[0];
    const group = {
      hospitalLevel: deductible.hospitalLevel,
      lessThan45: options.final === 45 ? deductible.amount : null,
      over45: options.final === 999 ? deductible.amount : null,
    };
    const existingGroup = acc.find(item => item.hospitalLevel === group.hospitalLevel);
    if (existingGroup) {
      existingGroup.lessThan45 = existingGroup.lessThan45 || group.lessThan45;
      existingGroup.over45 = existingGroup.over45 || group.over45;
    } else {
      acc.push(group);
    }
    return acc;
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-screen-xl  w-full mx-auto">
        <h2 className="text-4xl font-bold text-center text-gradiant mb-4">
          {title}
        </h2>
        <div className="text-lg text-center mb-10 mt-4 px-1 md:px-36">
          {children}
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
              {uniqueDeductibles.map((deductible: any) => {
                return (
                  <TableRow key={deductible.id}>
                    <TableCell className="flex justify-center">
                      <div className="bg-sky-100 px-3 py-1.5 rounded-lg text-sky-600">
                        {deductible.hospitalLevel}
                      </div>
                    </TableCell>
                    <TableCell className="text-xl font-bold text-[#223E99]">
                      ${deductible.lessThan45}
                    </TableCell>
                    <TableCell className="text-xl font-bold text-[#223E99]">
                    ${deductible.over45}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
        <button
          onClick={onClose}
          className="text-lg mt-4 px-4 py-2 w-full bg-primary text-white rounded-md hover:bg-primary/90 block mx-auto"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
