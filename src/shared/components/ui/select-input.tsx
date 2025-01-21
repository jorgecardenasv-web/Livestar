import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Label } from "./label";
import { cn } from "@/shared/utils/cn";

interface Props extends SelectPrimitive.SelectProps {
  label: string;
  options: { label: string; value: string }[];
  darkLabel?: boolean;
  error?: string;
}

export const SelectInput: FC<Props> = ({
  label,
  options,
  error,
  darkLabel,
  ...props
}) => {
  return (
    <div className="w-full space-y-1">
      {label && (
        <Label
          htmlFor={props.name}
          className={cn(darkLabel ? "text-white" : "", label ? "mt-4" : "")}
        >
          {label}
        </Label>
      )}
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
