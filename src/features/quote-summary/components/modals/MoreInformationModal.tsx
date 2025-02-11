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

export default function MoreInformationQuote() {
  const { modalProps, closeModal } = useQuoteSumaryActions();
  return (
    <div className="fixed inset-0  flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-screen-xl w-full mx-auto">
        <h2 className="text-4xl font-bold text-center text-gradiant mb-9">
          {"Detalles del asegurado"}
        </h2>
        <Card>
          <Table className="w-full text-center border-collapse">
            <TableHeader>
              <TableRow>
                <TableHead className="text-lg text-center w-1/3 text-sky-600">
                  Asegurado
                </TableHead>
                <TableHead className="text-lg text-center w-1/3 text-sky-600">
                  Cantidad a pagar
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

function getFormattedValue(key: string, value: any, protectWho: any) {
  if (
    key === "main" &&
    [
      "solo_yo",
      "mi_pareja_y_yo",
      "mi_familia",
      "mis_hijos_y_yo",
    ].includes(protectWho)
  ) {
    return (
      <>
        <TableRow key={key}>
          <TableCell className="flex justify-center">
            <div className="bg-sky-100 px-3 py-1.5 rounded-lg text-sky-600">
              {"Yo: "}
            </div>
          </TableCell>
          <TableCell className="text-xl font-bold text-[#223E99]">
            {`$${(value ?? 0).toLocaleString()}`}
          </TableCell>
        </TableRow>
      </>
    );
  }

  if (
    key === "partner" &&
    ["mi_pareja_y_yo", "mi_familia"].includes(protectWho)
  ) {
    return (
      <>
        <TableRow key={key}>
          <TableCell className="flex justify-center">
            <div className="bg-sky-100 px-3 py-1.5 rounded-lg text-sky-600">
              {"Pareja: "}
            </div>
          </TableCell>
          <TableCell className="text-xl font-bold text-[#223E99]">
            {`$${(value ?? 0).toLocaleString()}`}
          </TableCell>
        </TableRow>
      </>
    );
  }

  if (Array.isArray(value) && value.length === 0) return;

  if (key === "parents" && Array.isArray(value)) {
    return value.map((parent, index) => (
      <>
        <TableRow key={key}>
          <TableCell className="flex justify-center">
            <div className="bg-sky-100 px-3 py-1.5 rounded-lg text-sky-600">
              {`${parent.name}: `}
            </div>
          </TableCell>
          <TableCell className="text-xl font-bold text-[#223E99]">
            {`$${(parent.price ?? 0).toLocaleString()}`}
          </TableCell>
        </TableRow>
      </>
    ));
  }

  if (key === "children" && Array.isArray(value)) {
    return value.map((child, index) => (
      <>
        <TableRow key={key}>
          <TableCell className="flex justify-center">
            <div className="bg-sky-100 px-3 py-1.5 rounded-lg text-sky-600">
              {`Hijo${value.length > 1 ? ` ${index + 1}` : ""}:`}
            </div>
          </TableCell>
          <TableCell className="text-xl font-bold text-[#223E99]">
            {`$${(child ?? 0).toLocaleString()}`}
          </TableCell>
        </TableRow>
      </>
    ));
  }

  if (key === "others" && Array.isArray(value)) {
    return value.map((other, index) => (
      <>
        <TableRow key={key}>
          <TableCell className="flex justify-center">
            <div className="bg-sky-100 px-3 py-1.5 rounded-lg text-sky-600">
              {`${other.relationship}: `}
            </div>
          </TableCell>
          <TableCell className="text-xl font-bold text-[#223E99]">
            {`$${(other.price ?? 0).toLocaleString()}`}
          </TableCell>
        </TableRow>
      </>
    ));
  }
}
