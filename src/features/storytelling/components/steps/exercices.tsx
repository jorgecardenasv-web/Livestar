"use client";

import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { CircleHelp } from "lucide-react";
import { useState } from "react";

const rows = [
  { label: "Monto de la reclamación", value: "$300,000" },
  {
    label: "Deducible a pagar",
    value: "-$20,000",
    valueColor: "text-red-500",
  },
  { label: "Saldo después del Deducible", value: "$280,000" },
  { label: "% de Coaseguro", value: "10%", valueColor: "text-sky-500" },
  { label: "Coaseguro a pagar", value: "$28,000" },
  {
    label: "Tu participación",
    value: "$48,000",
    special: "sky",
  },
  {
    label: "Participación de la aseguradora",
    value: "$252,000",
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

  const getBGStyle = (index: number) => {
    if (
      (selectedOption === "deducible" && (index === 0 || index === 1 || index === 2)) ||
      (selectedOption === "coaseguro" && (index === 3 || index === 4)) ||
      selectedOption === "total"
    ) {
      return "";
    }
    return "opacity-20";
  };

  const showQuestionIcon = (index: number) => {
    return (
      (selectedOption === "deducible" && index === 1) ||
      (selectedOption === "coaseguro" && (index === 3 || index === 4))
    );
  };

  const getTooltipMessage = () => {
    if (selectedOption === "deducible") {
      return "Si contrataste la cláusula de eliminación de deducible por accidente, tu deducible sería $0.";
    }
    if (selectedOption === "coaseguro") {
      return "Recuerda que el coaseguro puede ser del %0 de la cuenta hospitalaria.";
    }
    return null;
  };

  return (
    <div className="w-full px-0 sm:px-4">
      <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-center text-gray-600 mb-2 sm:mb-4">
        ¿Cómo se cubre un siniestro en la vida real?
      </h2>
      <h4 className="text-center text-xs sm:text-base text-gray-500 mb-4 sm:mb-8">
        Imagina que sufres una emergencia médica y los gastos ascienden a $300,000.
      </h4>
      <div className="mb-2 sm:mb-8 w-full">
        <div className="flex justify-center mb-4 sm:mb-8">
          <Tabs
            value={selectedOption}
            onValueChange={setSelectedOption}
            className="w-full md:w-[600px]"
          >
            <TabsList className="w-full grid grid-cols-3 h-10 bg-muted p-1 rounded-lg">
              {[
                { id: "deducible", label: "Deducible" },
                { id: "coaseguro", label: "Coaseguro" },
                { id: "total", label: "Total" },
              ].map((option) => (
                <TabsTrigger
                  key={option.id}
                  value={option.id}
                  className="text-sm data-[state=active]:font-semibold data-[state=active]:text-primary relative rounded-md transition-all"
                >
                  {option.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:gap-x-8 w-full">
          <div className="text-center leading-5 sm:leading-8 text-sm sm:text-base w-full sm:w-80 flex items-center min-h-[130px]">
            <div className="w-full">
              {selectedOption === "deducible" && (
                <p className="text-gray-600">
                  Con un deducible de $20,000,<br />
                  tú cubres esos primeros $20,000.<br />
                  De los $280,000 restantes, solo te faltaría cubrir tu coaseguro.
                </p>
              )}

              {selectedOption === "coaseguro" && (
                <p className="text-gray-600">
                  Si tu coaseguro, por ejemplo, es del 10%, cubrirías $28,000 y la
                  aseguradora se encargaría de lo demás hasta más de $100,000,000 de
                  pesos de acuerdo a la suma asegurada contratada.
                </p>
              )}

              {selectedOption === "total" && (
                <p className="text-gray-600">
                  En total, solo cubrirías $48,000 y el seguro se encargaría de
                  $252,000.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-0.5 sm:space-y-1 text-xs sm:text-sm w-full sm:w-1/2">
            {rows.map((row, index) => (
              <TooltipProvider key={row.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`grid grid-cols-2 rounded overflow-hidden cursor-pointer items-center py-1 sm:py-2 px-1 sm:px-2 ${getHighlightStyle(
                        index
                      )} ${getBGStyle(index)} ${row.special === "sky"
                        ? "bg-primary text-white"
                        : row.special === "blue"
                          ? "bg-blue-900 text-white"
                          : index % 2 === 0
                            ? "bg-gray-100"
                            : "bg-white"
                        }`}
                    >
                      <div className="font-medium flex items-center gap-x-1">
                        {row.label}
                        {showQuestionIcon(index) && (
                          <CircleHelp className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                        )}
                      </div>
                      <div className={`text-right ${row.valueColor || ""}`}>
                        {row.value}
                      </div>
                    </div>
                  </TooltipTrigger>
                  {getTooltipMessage() && (
                    <TooltipContent className="bg-gray-800 text-white p-2 rounded text-xs shadow-lg">
                      {getTooltipMessage()}
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
