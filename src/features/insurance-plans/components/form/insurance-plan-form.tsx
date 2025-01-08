"use client";

import { DollarSign, Percent, Building2, FileText } from "lucide-react";
import { TextInput } from "@/shared/components/ui/text-input";
import { PriceTableForm } from "./price-table-form";
import { addPlan } from "../../actions/add-plan";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { SelectInput } from "@/shared/components/ui/select-input";
import { useInsurancePlanForm } from "../../hooks/use-insurance-plan-form";

interface InsuranceCompany {
  id: string;
  name: string;
}

interface Props {
  insuranceCompanies: InsuranceCompany[];
}

export default function InsurancePlanForm({ insuranceCompanies }: Props) {
  const { handleSubmit } = useInsurancePlanForm(addPlan);

  return (
    <form action={handleSubmit} className="mx-auto space-y-6">
      <Card>
        <CardContent className="space-y-6 p-6">
          <SelectInput
            name="name"
            label="Nombre del Plan"
            options={[
              {
                label: "Plan básico",
                value: "Plan Básico",
              },
              {
                label: "Plan Intermedio",
                value: "Plan Intermedio",
              },
              {
                label: "Plan Plus",
                value: "Plan Plus",
              },
            ]}
            required
          />

          <SelectInput
            name="companyId"
            label="Compañía"
            options={insuranceCompanies.map((insuranceCompany) => ({
              label: insuranceCompany.name,
              value: insuranceCompany.id,
            }))}
            required
          />

          <TextInput
            name="sumInsured"
            label="Suma Asegurada"
            type="number"
            icon={<DollarSign className="w-4 h-4 text-gray-500" />}
            placeholder="Ingrese suma asegurada"
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
            placeholder="Ej: 0.10"
            required
          />

          <TextInput
            name="coInsuranceCap"
            label="Tope de Coaseguro"
            type="number"
            icon={<DollarSign className="w-4 h-4 text-gray-500" />}
            placeholder="Ingrese tope de coaseguro"
          />
        </CardContent>
      </Card>

      <PriceTableForm />

      <Button className="w-full" type="submit">
        Crear Plan
      </Button>
    </form>
  );
}
