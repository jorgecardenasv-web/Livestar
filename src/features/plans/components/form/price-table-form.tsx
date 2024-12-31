"use client";

import { Upload } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/shared/components/ui/card";
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
import { usePriceForm } from "../../hooks/use-price-table";
import { PriceInput } from "../ui/price-input";

export const PriceTableForm: React.FC = () => {
  const { handleFileUpload, handlePriceChange, prices } = usePriceForm();

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
      <CardContent>
        <div
          className="rounded-md border"
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
                        value={row.mensualHombre}
                        onChange={(value) =>
                          handlePriceChange(row.age, "mensualHombre", value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <PriceInput
                        value={row.mensualMujer}
                        onChange={(value) =>
                          handlePriceChange(row.age, "mensualMujer", value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <PriceInput
                        value={row.anualHombre}
                        onChange={(value) =>
                          handlePriceChange(row.age, "anualHombre", value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <PriceInput
                        value={row.anualMujer}
                        onChange={(value) =>
                          handlePriceChange(row.age, "anualMujer", value)
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
      </CardContent>
    </Card>
  );
};
