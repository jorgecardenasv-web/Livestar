import { Button } from "@tremor/react";
import { ActionSelector } from "./action-selector";
import { useProspectActions } from "../hooks/use-prospect-actions";
import { Advisor } from "@/features/advisors/types/advisor";
import { statusProspects } from "../data";

export const createSelectOptions = (advisors: Advisor[]) => {
  return advisors.map((advisor) => ({
    value: advisor.id,
    name: advisor.name,
  }));
};

export const FormSelectorProspect = ({ advisors }: { advisors: Advisor[] }) => {
  const {
    selectedAdvisor,
    selectedStatus,
    setSelectedAdvisor,
    setSelectedStatus,
    formAction,
  } = useProspectActions();

  return (
    <form className="space-y-4" action={formAction}>
      <ActionSelector
        inputName="status"
        label="Estado"
        datasources={statusProspects}
        currentValue={selectedStatus}
        setSelectedValue={setSelectedStatus}
      />
      <ActionSelector
        inputName="userId"
        label="Asesor asignado"
        datasources={createSelectOptions(advisors)}
        currentValue={selectedAdvisor}
        setSelectedValue={setSelectedAdvisor}
      />
      <Button
        type="submit"
        className="w-full bg-primary text-white px-6 py-3 rounded font-bold text-lg mt-10"
      >
        Guardar
      </Button>
    </form>
  );
};
