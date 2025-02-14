import { Card, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { NumberInput } from "@/shared/components/ui/number-input";
import { Separator } from "@/shared/components/ui/separator";
import { Upload } from "lucide-react";
import { usePriceTableHDIForm } from "../../../hooks/use-price-table-hdi";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { useRef } from "react";
import { PriceDataHDI } from "../../../types";

interface PriceTableHDIFormProps {
  prices: PriceDataHDI[];
  setPrices: (prices: PriceDataHDI[]) => void;
}

export const PriceTableHDIForm: React.FC<PriceTableHDIFormProps> = ({ prices, setPrices }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handlePriceChange, handleFileUpload } = usePriceTableHDIForm(prices, setPrices);

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
            <span>Tabla de Precios HDI por Edad</span>
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
        <ScrollArea className="h-[800px] rounded p-4">
          {prices.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] text-center">Edad</TableHead>
                  <TableHead className="text-center">Prima Mensual (1.0)</TableHead>
                  <TableHead className="text-center">Prima Mensual (2-12)</TableHead>
                  <TableHead className="text-center">PT Anual</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prices.map((price) => (
                  <TableRow key={`price-row-${price.age}`}>
                    <TableCell className="text-center">{price.age}</TableCell>
                    <TableCell>
                      <NumberInput
                        value={price.monthlyPrice1}
                        onChange={(e) =>
                          handlePriceChange(price.age, "monthlyPrice1", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <NumberInput
                        value={price.monthlyPrice2to12}
                        onChange={(e) =>
                          handlePriceChange(price.age, "monthlyPrice2to12", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <NumberInput
                        value={price.annualPrice}
                        onChange={(e) =>
                          handlePriceChange(price.age, "annualPrice", e.target.value)
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