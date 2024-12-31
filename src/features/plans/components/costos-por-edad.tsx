"use client";

import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/shared/components/ui/table";
import { TextInput } from "@/shared/components/ui/text-input";

export function CostosPorEdadTable() {
  const [datos, setDatos] = useState(
    Array.from({ length: 65 }, (_, i) => ({
      edad: i,
      hombre: 0,
      mujer: 0,
    }))
  );

  const handleChange = (
    index: number,
    key: "hombre" | "mujer",
    value: number
  ) => {
    const nuevosDatos = [...datos];
    nuevosDatos[index][key] = value;
    setDatos(nuevosDatos);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Costos por Edad</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Edad</TableHead>
            <TableHead>Hombre</TableHead>
            <TableHead>Mujer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {datos.map((fila, index) => (
            <TableRow key={fila.edad}>
              <TableCell>{fila.edad}</TableCell>
              <TableCell>
                <TextInput
                  type="number"
                  value={fila.hombre}
                  onChange={(e) =>
                    handleChange(index, "hombre", Number(e.target.value))
                  }
                  min={0}
                />
              </TableCell>
              <TableCell>
                <TextInput
                  type="number"
                  value={fila.mujer}
                  onChange={(e) =>
                    handleChange(index, "mujer", Number(e.target.value))
                  }
                  min={0}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Button
        type="submit"
        className="bg-primary text-white rounded-lg px-4 py-2"
      >
        Guardar Costos
      </Button> */}
    </div>
  );
}
