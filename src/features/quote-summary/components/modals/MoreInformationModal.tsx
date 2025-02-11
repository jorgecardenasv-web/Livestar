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
import { Button } from "@/shared/components/ui/button";

export default function MoreInformationQuote() {
  const { modalProps, closeModal } = useQuoteSumaryActions();

  const getTotalMembers = () => {
    let count = modalProps.main ? 1 : 0;
    count += modalProps.partner ? 1 : 0;
    count += (modalProps.children?.length || 0);
    count += (modalProps.parents?.length || 0);
    count += (modalProps.others?.length || 0);
    return count;
  };

  return (
    <div className="w-full space-y-10">
      <h2 className="text-4xl font-bold text-center text-gradiant">
        {getTotalMembers() > 1 ? 'Detalles de los Asegurados' : 'Detalle del Asegurado'}
      </h2>
      <Table className="w-full text-center border rounded">
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg text-center w-1/3 text-sky-600">
              Integrante
            </TableHead>
            <TableHead className="text-lg text-center w-1/3 text-sky-600">
              Prima Individual
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(modalProps).map(([key, value]) => {
            return (
              <>{getFormattedValue(key, value, modalProps.protectWho)}</>
            );
          })}
        </TableBody>
      </Table>
      <Button
        onClick={closeModal}
        className="w-full text-lg"
        size="lg"
      >
        Cerrar
      </Button>
    </div>
  );
}

function getFormattedValue(key: string, value: any, protectWho: any) {
  if (key === "main" && ["solo_yo", "mi_pareja_y_yo", "familia", "mis_hijos_y_yo"].includes(protectWho)) {
    return (
      <TableRow key="main">
        <TableCell className="flex justify-center">
          <div className="bg-sky-100 px-3 py-1.5 rounded-lg text-sky-600">
            Titular
          </div>
        </TableCell>
        <TableCell className="text-xl font-bold text-[#223E99]">
          {`$${(value ?? 0).toLocaleString()}`}
        </TableCell>
      </TableRow>
    );
  }

  if (key === "partner" && ["mi_pareja_y_yo", "familia"].includes(protectWho)) {
    return (
      <TableRow key="partner">
        <TableCell className="flex justify-center">
          <div className="bg-sky-100 px-3 py-1.5 rounded-lg text-sky-600">
            Pareja
          </div>
        </TableCell>
        <TableCell className="text-xl font-bold text-[#223E99]">
          {`$${(value ?? 0).toLocaleString()}`}
        </TableCell>
      </TableRow>
    );
  }

  if (key === "children" && Array.isArray(value)) {
    return value.map((child, index) => (
      <TableRow key={`child-${index}`}>
        <TableCell className="flex justify-center">
          <div className="bg-sky-100 px-3 py-1.5 rounded-lg text-sky-600">
            {value.length > 1 ? `Hijo/a ${index + 1}` : 'Hijo/a'}
          </div>
        </TableCell>
        <TableCell className="text-xl font-bold text-[#223E99]">
          {`$${(child ?? 0).toLocaleString()}`}
        </TableCell>
      </TableRow>
    ));
  }

  if (key === "parents" && Array.isArray(value)) {
    return value.map((parent, index) => (
      <TableRow key={`parent-${index}`}>
        <TableCell className="flex justify-center">
          <div className="bg-sky-100 px-3 py-1.5 rounded-lg text-sky-600">
            {`${parent.name}`}
          </div>
        </TableCell>
        <TableCell className="text-xl font-bold text-[#223E99]">
          {`$${(parent.price ?? 0).toLocaleString()}`}
        </TableCell>
      </TableRow>
    ));
  }

  if (key === "others" && Array.isArray(value)) {
    return value.map((other, index) => (
      <TableRow key={`other-${index}`}>
        <TableCell className="flex justify-center">
          <div className="bg-sky-100 px-3 py-1.5 rounded-lg text-sky-600">
            {`${other.relationship}`}
          </div>
        </TableCell>
        <TableCell className="text-xl font-bold text-[#223E99]">
          {`$${(other.price ?? 0).toLocaleString()}`}
        </TableCell>
      </TableRow>
    ));
  }
}
