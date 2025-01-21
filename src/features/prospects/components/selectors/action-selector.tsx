import { SelectInput } from "@/shared/components/ui/select-input";

interface ValueSelectorProps {
  currentValue: any;
  inputName: string;
  label: string;
  datasources: {
    value: string;
    name: string;
  }[];
}

export const ActionSelector = ({
  currentValue,
  label,
  datasources,
  inputName,
}: ValueSelectorProps) => {
  return (
    <SelectInput
      label={label}
      name={inputName}
      value={currentValue}
      options={datasources.map((datasource) => ({
        value: datasource.value,
        label: datasource.name,
      }))}
    />
  );
};
