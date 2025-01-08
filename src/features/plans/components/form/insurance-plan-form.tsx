import { DollarSign, Percent, Building2, FileText } from "lucide-react";
import { TextInput } from "@/shared/components/ui/text-input";
import { PriceTableForm } from "./price-table-form";
import { addPlan } from "../../actions/add-plan";
import { Button } from "@/shared/components/ui/button";

export default function InsurancePlanForm() {
  return (
    <form action={addPlan} className="max-w-4xl mx-auto space-y-6">
      <TextInput
        name="name"
        label="Nombre del Plan"
        icon={<FileText className="w-4 h-4 text-gray-500" />}
        placeholder="Ingrese nombre del plan"
        required
      />

      <TextInput
        name="companyId"
        label="Compañía"
        type="number"
        icon={<Building2 className="w-4 h-4 text-gray-500" />}
        placeholder="ID de la compañía"
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

      <PriceTableForm />

      <Button className="w-full" type="submit">Crear Plan</Button>
    </form>
  );
}
