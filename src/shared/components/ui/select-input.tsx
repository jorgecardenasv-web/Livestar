import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Label } from "./label";

interface Props extends SelectPrimitive.SelectProps {
  label: string;
  options: { label: string; value: string }[];
  error: string;
}

export const SelectInput: FC<Props> = ({
  label,
  options,
  error,
  ...props
}) => {
  return (
    <div className="grid w-full">
      <Label htmlFor={props.name}>{label}</Label>
      <Select {...props}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Seleccionar" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
