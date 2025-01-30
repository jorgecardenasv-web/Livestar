"use client";

import { Upload } from "lucide-react";
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
import { PriceInput } from "../inputs/price-input";
import { Separator } from "@/shared/components/ui/separator";
import { PriceData, usePriceTableForm } from "../../hooks/use-price-table";

interface PriceTableFormProps {
  prices: PriceData[];
  setPrices: (prices: PriceData[]) => void;
}

export const PriceTableForm: React.FC<PriceTableFormProps> = ({ prices, setPrices }) => {
  const { handlePriceChange, handleFileUpload } = usePriceTableForm(prices, setPrices);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Tabla de Precios por Edad y Género</span>
          <div className="relative">
            <Input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
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
      <div
        className="rounded p-4"
        style={{
          maxHeight: "500px",
          overflowY: "auto",
        }}
      >
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
              {prices.map((row) => (
                <TableRow key={row.age}>
                  <TableCell className="text-center">{row.age}</TableCell>
                  <TableCell>
                    <PriceInput
                      value={(row.monthlyPriceMale ?? 0).toString()}
                      onChange={(value) =>
                        handlePriceChange(row.age, "monthlyPriceMale", value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <PriceInput
                      value={(row.monthlyPriceFemale ?? 0).toString()}
                      onChange={(value) =>
                        handlePriceChange(row.age, "monthlyPriceFemale", value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <PriceInput
                      value={(row.annualPriceMale ?? 0).toString()}
                      onChange={(value) =>
                        handlePriceChange(row.age, "annualPriceMale", value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <PriceInput
                      value={(row.annualPriceFemale ?? 0).toString()}
                      onChange={(value) =>
                        handlePriceChange(row.age, "annualPriceFemale", value)
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
      </div>
    </Card>
  );
};
