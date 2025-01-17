"use client";

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
}

export default function MultipleDeductibleModal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;

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
              <TableRow>
                <TableCell className="flex justify-center">
                  <div className="bg-sky-100 px-3 py-2 rounded-lg text-sky-600">
                    A
                  </div>
                </TableCell>
                <TableCell className="text-xl font-bold text-[#223E99]">
                  $58,000
                </TableCell>
                <TableCell className="text-xl font-bold text-[#223E99]">
                  $58,000
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="flex justify-center">
                  <div className="bg-sky-100 px-3 py-2 rounded-lg text-sky-600">
                    B
                  </div>
                </TableCell>
                <TableCell className="text-xl font-bold text-[#223E99]">
                  $48,000
                </TableCell>
                <TableCell className="text-xl font-bold text-[#223E99]">
                  $48,000
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="flex justify-center">
                  <div className="bg-sky-100 px-3 py-2 rounded-lg text-sky-600">
                    C
                  </div>
                </TableCell>
                <TableCell className="text-xl font-bold text-[#223E99]">
                  $38,000
                </TableCell>
                <TableCell className="text-xl font-bold text-[#223E99]">
                  $38,000
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="flex justify-center">
                  <div className="bg-sky-100 px-3 py-2 rounded-lg text-sky-600">
                    D
                  </div>
                </TableCell>
                <TableCell className="text-xl font-bold text-[#223E99]">
                  $28,000
                </TableCell>
                <TableCell className="text-xl font-bold text-[#223E99]">
                  $28,000
                </TableCell>
              </TableRow>
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
