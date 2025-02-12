"use client";

import { useRef } from "react";
import { Card, CardHeader, CardTitle } from "@/shared/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { NumberInput } from "@/shared/components/ui/number-input";
import { Separator } from "@/shared/components/ui/separator";
import { Upload } from "lucide-react";
import { PriceData, usePriceTableForm } from "../../../hooks/use-price-table";
import { ScrollArea } from "@/shared/components/ui/scroll-area";

interface PriceTableFormProps {
  prices: PriceData[];
  setPrices: (prices: PriceData[]) => void;
}

export const PriceTableForm: React.FC<PriceTableFormProps> = ({
  prices,
  setPrices,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handlePriceChange, handleFileUpload } = usePriceTableForm(
    prices,
    setPrices
  );

  const onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await handleFileUpload(e);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="rounded-xl bg-muted/50 p-5">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Tabla de Precios por Edad y Género</span>
            <div className="relative">
              <Input
                ref={fileInputRef}
                type="file"
                accept=".xlsx, .xls"
                onChange={onFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Importar Excel
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <Separator />
        <ScrollArea className="h-[500px] rounded p-4">
          {prices.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] text-center">Edad</TableHead>
                  <TableHead colSpan={2} className="text-center">
                    Mensual
                  </TableHead>
                  <TableHead colSpan={2} className="text-center">
                    Anual
                  </TableHead>
                </TableRow>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead className="text-center">Hombre</TableHead>
                  <TableHead className="text-center">Mujer</TableHead>
                  <TableHead className="text-center">Hombre</TableHead>
                  <TableHead className="text-center">Mujer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prices.map((row, index) => (
                  <TableRow key={row.age}>
                    <TableCell className="text-center">{row.age}</TableCell>
                    <TableCell>
                      <NumberInput
                        value={row.monthlyPriceMale}
                        onChange={(e) =>
                          handlePriceChange(index, "monthlyPriceMale", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <NumberInput
                        value={row.monthlyPriceFemale}
                        onChange={(e) =>
                          handlePriceChange(index, "monthlyPriceFemale", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <NumberInput
                        value={row.annualPriceMale}
                        onChange={(e) =>
                          handlePriceChange(index, "annualPriceMale", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <NumberInput
                        value={row.annualPriceFemale}
                        onChange={(e) =>
                          handlePriceChange(index, "annualPriceFemale", e.target.value)
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-4 text-center">No hay datos para mostrar</div>
          )}
        </ScrollArea>
      </Card>
    </div>
  );
};