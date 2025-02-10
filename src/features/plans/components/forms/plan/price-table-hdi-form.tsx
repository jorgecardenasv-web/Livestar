import { Card, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { PriceInput } from "../../inputs/price-input";
import { Separator } from "@/shared/components/ui/separator";
import { Upload } from "lucide-react";
import { usePriceTableHDIForm } from "../../../hooks/use-price-table-hdi";
import { ScrollArea } from "@/shared/components/ui/scroll-area";

interface PriceTableHDIFormProps {
  prices: any[];
  setPrices: (prices: any[]) => void;
}

export const PriceTableHDIForm: React.FC<PriceTableHDIFormProps> = ({ prices, setPrices }) => {
  const { handlePriceChange, handleFileUpload } = usePriceTableHDIForm(prices, setPrices);

  return (
    <div className="rounded-xl bg-muted/50 p-5">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Tabla de Precios HDI por Edad</span>
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
                {prices.map((row) => {
                  return (
                    <TableRow key={row.age}>
                      <TableCell className="text-center">{row.age}</TableCell>
                      <TableCell>
                        <PriceInput
                          value={(row.monthlyPrice1 ?? 0).toString()}
                          onChange={(value) =>
                            handlePriceChange(row.age, "monthlyPrice1", value)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <PriceInput
                          value={(row.monthlyPrice2to12 ?? 0).toString()}
                          onChange={(value) =>
                            handlePriceChange(row.age, "monthlyPrice2to12", value)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <PriceInput
                          value={(row.annualPrice ?? 0).toString()}
                          onChange={(value) =>
                            handlePriceChange(row.age, "annualPrice", value)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
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