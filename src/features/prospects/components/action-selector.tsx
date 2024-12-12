import { Select, SelectItem } from "@tremor/react";

interface ValueSelectorProps {
  currentValue: any;
  inputName: string;
  label: string;
  setSelectedValue: (value: string) => void;
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
  setSelectedValue,
}: ValueSelectorProps) => {
  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div className="space-y-1">
      <label className="text-[13px] font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {label}
      </label>
      <Select
        name={inputName}
        value={currentValue}
        onValueChange={handleValueChange}
        enableClear={false}
        className="w-full"
        id="advisor-select"
      >
        {datasources.map((datasource) => (
          <SelectItem key={datasource.value} value={datasource.value}>
            {datasource.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
