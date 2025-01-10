"use client";

import { DollarSign, Percent } from "lucide-react";
import { TextInput } from "@/shared/components/ui/text-input";
import { PriceTableForm } from "./price-table-form";
import { addPlan } from "../../actions/add-plan";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { SelectInput } from "@/shared/components/ui/select-input";
import { useInsurancePlanForm } from "../../hooks/use-insurance-plan-form";
import { useEffect } from "react";
import { usePriceTable } from "../../hooks/use-price-table";
import { PlanType } from "@prisma/client";

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
  const { handleSubmit } = useInsurancePlanForm(addPlan);
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
            name="name"
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

      <PriceTableForm />

      <Button className="w-full" type="submit">
        Crear Plan
      </Button>
    </form>
  );
};
