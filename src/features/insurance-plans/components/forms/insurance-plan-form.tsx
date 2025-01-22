"use client";

import { DollarSign, Percent, Upload } from "lucide-react";
import { TextInput } from "@/shared/components/ui/text-input";
import { PriceTableForm } from "./price-table-form";
import { createPlan } from "../../actions/create-plan";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
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
import { Input } from "@/shared/components/ui/input";

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
  const [isMultiple, setIsMultiple] = useState(false);
  const { handleSubmit } = useInsurancePlanForm(createPlan);
  const { setPrices } = usePriceTable();

  useEffect(() => {
    if (plan?.prices.length > 0) {
      setPrices(plan?.prices);
    }
  }, []);

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
            ¿cuenta con multiples deducibles?
          </label>
        </div>
        {isMultiple ? (
          <Table className="w-full text-center border-collapse">
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead className="w-48">0-45 años</TableHead>
                <TableHead className="w-48">45 en adelante</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Nivel Hospitalario A</TableCell>
                <TableCell>
                  <TextInput
                    name="initialPlanA"
                    label=""
                    type="number"
                    icon={<DollarSign className="w-4 h-4 text-gray-500" />}
                    placeholder=" Ingrese Deducible"
                    defaultValue={plan?.coInsuranceCap}
                  />
                </TableCell>
                <TableCell>
                  <TextInput
                    name="finalPlanA"
                    label=""
                    type="number"
                    icon={<DollarSign className="w-4 h-4 text-gray-500" />}
                    placeholder=" Ingrese Deducible"
                    defaultValue={plan?.coInsuranceCap}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Nivel Hospitalario B</TableCell>
                <TableCell>
                  <TextInput
                    name="initialPlanB"
                    label=""
                    type="number"
                    icon={<DollarSign className="w-4 h-4 text-gray-500" />}
                    placeholder=" Ingrese Deducible"
                    defaultValue={plan?.coInsuranceCap}
                  />
                </TableCell>
                <TableCell>
                  <TextInput
                    name="finalPlanB"
                    label=""
                    type="number"
                    icon={<DollarSign className="w-4 h-4 text-gray-500" />}
                    placeholder=" Ingrese Deducible"
                    defaultValue={plan?.coInsuranceCap}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Nivel Hospitalario C</TableCell>
                <TableCell>
                  <TextInput
                    name="initialPlanC"
                    label=""
                    type="number"
                    icon={<DollarSign className="w-4 h-4 text-gray-500" />}
                    placeholder=" Ingrese Deducible"
                    defaultValue={plan?.coInsuranceCap}
                  />
                </TableCell>
                <TableCell>
                  <TextInput
                    name="finalPlanC"
                    label=""
                    type="number"
                    icon={<DollarSign className="w-4 h-4 text-gray-500" />}
                    placeholder=" Ingrese Deducible"
                    defaultValue={plan?.coInsuranceCap}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Nivel Hospitalario D</TableCell>
                <TableCell>
                  <TextInput
                    name="initialPlanD"
                    label=""
                    type="number"
                    icon={<DollarSign className="w-4 h-4 text-gray-500" />}
                    placeholder=" Ingrese Deducible"
                    defaultValue={plan?.coInsuranceCap}
                  />
                </TableCell>
                <TableCell>
                  <TextInput
                    name="finalPlanD"
                    label=""
                    type="number"
                    icon={<DollarSign className="w-4 h-4 text-gray-500" />}
                    placeholder=" Ingrese Deducible"
                    defaultValue={plan?.coInsuranceCap}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : (
          <div className="mx-12 my-8">
            <TextInput
              name="initialPlanA"
              label=""
              type="number"
              icon={<DollarSign className="w-4 h-4 text-gray-500" />}
              placeholder=" Ingrese deducible"
              defaultValue={plan?.coInsuranceCap}
            />
          </div>
        )}
      </Card>

      {/* ------------------------------------------------------ */}

      <PriceTableForm />

      <Card className="w-full">
        <CardHeader>
          <span>
            Adjunta PDF con detalles del plan en caso de ser necesario
          </span>
          <div className="relative">
            <Input
              type="file"
              accept=".pdf"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Importar PDF
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Button className="w-full" type="submit">
        Crear Plan
      </Button>
    </form>
  );
};
