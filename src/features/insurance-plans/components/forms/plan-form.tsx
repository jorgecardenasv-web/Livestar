"use client";

import { DollarSign, Percent } from "lucide-react";
import { TextInput } from "@/shared/components/ui/text-input";
import { PriceTableForm } from "./price-table-form";
import { createPlan } from "../../actions/create-plan";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { SelectInput } from "@/shared/components/ui/select-input";
import { useInsurancePlanForm } from "../../hooks/use-insurance-plan-form";
import { useEffect, useState } from "react";
import { usePriceTable } from "../../hooks/use-price-table";
import { PlanType } from "@prisma/client";
import {
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHead,
  TableBody,
} from "@/shared/components/ui/table";
import { SubmitButton } from "@/shared/components/ui/submit-button";

interface Insurance {
  id: string;
  name: string;
}

interface Props {
  insurances: Insurance[];
  planTypes: PlanType[];
  plan?: any;
}

export const InsurancePlanForm = ({ insurances, plan, planTypes }: Props) => {
  const { handleSubmit } = useInsurancePlanForm(createPlan);
  const { setPrices, setIsMultiple, isMultiple } = usePriceTable();

  useEffect(() => {
    if (plan?.prices.length > 0) {
      setPrices(plan?.prices);
    }
    // Inicializar isMultiple basado en la estructura del deducible
    if (plan?.deductibles) {
      setIsMultiple(!(plan.deductibles.default >= 0));
    }
  }, [plan]);

  return (
    <form action={handleSubmit} className="mx-auto space-y-6 w-full">
      <Card>
        <CardContent className="space-y-6 p-6">
          <SelectInput
            name="planTypeId"
            label="Nombre del Plan"
            options={planTypes.map((planType) => ({
              label: planType.name,
              value: planType.id,
            }))}
            defaultValue={plan?.planType?.id}
            onValueChange={(e) => console.log(e)}
            required
          />

          <SelectInput
            name="companyId"
            label="Compañía"
            options={insurances.map((insurance) => ({
              label: insurance.name,
              value: insurance.id,
            }))}
            defaultValue={plan?.company.id}
            required
          />

          <TextInput
            name="sumInsured"
            label="Suma Asegurada"
            type="number"
            icon={<DollarSign className="w-4 h-4 text-gray-500" />}
            placeholder="Ingrese suma asegurada"
            defaultValue={plan?.sumInsured}
            required
          />

          <TextInput
            name="coInsurance"
            label="Coaseguro"
            type="number"
            icon={<Percent className="w-4 h-4 text-gray-500" />}
            step="0.01"
            min="0"
            max="1"
            defaultValue={plan?.coInsurance}
            placeholder="Ej: 0.10"
            required
          />

          <TextInput
            name="coInsuranceCap"
            label="Tope de Coaseguro"
            type="number"
            icon={<DollarSign className="w-4 h-4 text-gray-500" />}
            placeholder="Ingrese tope de coaseguro"
            defaultValue={plan?.coInsuranceCap}
          />
        </CardContent>
      </Card>
      {/* ------------------------------------------------------ */}
      <Card>
        <div className="ml-8 flex items-center space-x-2 my-4">
          <input
            type="checkbox"
            id="confirmation"
            checked={isMultiple}
            onChange={(e) => setIsMultiple(e.target.checked)}
            className="h-5 w-5 text-[#223E99] focus:ring-[#223E99] border-gray-300 rounded"
          />
          <label htmlFor="confirmation">
            ¿Cuenta con múltiples opciones de deducible?
          </label>
        </div>
        {isMultiple ? (
          <div className="overflow-x-auto px-5">
            <Table className="w-full text-center border-collapse min-w-[600px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-48"></TableHead>
                  <TableHead className="w-1/2">Opción 2</TableHead>
                  <TableHead className="w-1/2">Opción 4</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {["A", "B", "C", "D"].map((nivel) => (
                  <TableRow key={nivel}>
                    <TableCell className="font-medium text-left whitespace-nowrap">
                      Nivel Hospitalario {nivel}
                    </TableCell>
                    <TableCell>
                      <div className="mx-auto">
                        <TextInput
                          name={`deducible.opcion_2.${nivel}`}
                          type="number"
                          icon={
                            <DollarSign className="w-4 h-4 text-gray-500" />
                          }
                          placeholder="Ingrese deducible"
                          defaultValue={plan?.deductibles?.opcion_2?.[nivel]}
                          className="w-full"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="mx-auto">
                        <TextInput
                          name={`deducible.opcion_4.${nivel}`}
                          type="number"
                          icon={
                            <DollarSign className="w-4 h-4 text-gray-500" />
                          }
                          placeholder="Ingrese deducible"
                          defaultValue={plan?.deductibles?.opcion_4?.[nivel]}
                          className="w-full"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="mx-12 my-8">
            <TextInput
              name="deducible.default"
              label="Deducible"
              type="number"
              icon={<DollarSign className="w-4 h-4 text-gray-500" />}
              placeholder="Ingrese Deducible"
              defaultValue={plan?.deductibles?.default}
            />
          </div>
        )}
      </Card>

      {/* ------------------------------------------------------ */}

      <PriceTableForm />

      <SubmitButton
        label="Crear Plan"
        labelPending="creando..."
        className="w-full"
        type="submit"
      />
    </form>
  );
};
