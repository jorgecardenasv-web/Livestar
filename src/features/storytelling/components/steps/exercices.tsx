"use client";

import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useState } from "react";

const rows = [
  { label: "Monto de la reclamación", value: "$300,000" },
  {
    label: "Deducible a pagar",
    value: "-$21,000",
    valueColor: "text-red-500",
  },
  { label: "Saldo después del Deducible", value: "$279,000" },
  { label: "% de Coaseguro", value: "10%", valueColor: "text-sky-500" },
  { label: "Coaseguro a pagar", value: "$27,900" },
  {
    label: "Tu participación",
    value: "$48,900",
    special: "sky",
  },
  {
    label: "Participación de la aseguradora",
    value: "$251,100",
    special: "blue",
  },
];

export default function Component() {
  const [selectedOption, setSelectedOption] = useState("deducible");

  const getHighlightStyle = (index: number) => {
    if (
      (selectedOption === "deducible" && index === 1) ||
      (selectedOption === "coaseguro" && (index === 3 || index === 4)) ||
      (selectedOption === "total" && (index === 5 || index === 6))
    ) {
      return "border-2 border-red-600";
    }
    return "";
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-center text-gray-600 mb-6">
        ¿Cómo se cubre un siniestro en la vida real?
      </h2>
      <h4 className="text-center text-balance mb-8 text-gray-500">
        Imagina que sufres una emergencia médica y los gastos ascienden a
        $300,000.
      </h4>
      <div className="mb-8">
        <div className="flex justify-center mb-12">
          <Tabs
            value={selectedOption}
            onValueChange={setSelectedOption}
            className="w-[400px]"
          >
            <TabsList className="grid w-full grid-cols-3 h-12">
              {[
                { id: "deducible", label: "Deducible" },
                { id: "coaseguro", label: "Coaseguro" },
                { id: "total", label: "Total" },
              ].map((option) => (
                <TabsTrigger
                  key={option.id}
                  value={option.id}
                  className="h-10 data-[state=active]:font-bold data-[state=active]:text-primary"
                >
                  {option.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="flex justify-between items-center gap-x-14 w-full">
          {selectedOption === "deducible" && (
            <div className="mb-8 w-80 text-center leading-8">
              <p className="text-gray-600">Con un deducible de $21,000,</p>
              <p className="text-gray-600">tú cubres esos primeros $21,000.</p>
              <p className="text-gray-600">
                De los $279,000 restantes, solo te faltaría cubrir tu coaseguro.
              </p>
            </div>
          )}

          {selectedOption === "coaseguro" && (
            <div className="mb-8 w-80 text-center">
              <p className="text-gray-600 text-balance leading-8">
                Si tu coaseguro, por ejemplo, es del 10%, cubrirías $27,900 y la
                aseguradora se encargaría de lo demás hasta más de $100,000,000
                de pesos de acuerdo con la suma asegurada contratada.
              </p>
            </div>
          )}

          {selectedOption === "total" && (
            <div className="mb-8 text-center w-80">
              <p className="text-gray-600 leading-8">
                En total, solo cubrirías $48,900 y el seguro se encargaría de
                $251,100.
              </p>
            </div>
          )}

          <div className="space-y-1 text-sm w-1/2">
            {rows.map((row, index) => (
              <div
                key={row.label}
                className={`grid grid-cols-2 rounded overflow-hidden ${getHighlightStyle(index)} ${
                  row.special === "sky"
                    ? "bg-primary text-white"
                    : row.special === "blue"
                      ? "bg-blue-900 text-white"
                      : index % 2 === 0
                        ? "bg-gray-100"
                        : "bg-white"
                }`}
              >
                <div className="p-2 font-medium">{row.label}</div>
                <div className={`p-2 text-right ${row.valueColor || ""}`}>
                  {row.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
