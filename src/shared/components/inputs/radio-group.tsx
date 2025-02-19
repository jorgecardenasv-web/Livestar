import { ComponentProps } from "react";
import { RadioGroupItem, RadioGroup as ShadcnRadioGroup } from "../ui/radio-group"
import { Label } from "../ui/label";
import { cn } from "@/shared/utils/cn";

interface RadioGroupProps extends ComponentProps<typeof ShadcnRadioGroup> {
  label: string;
  options: { label: string; value: string }[];
  position?: "column" | "row";
}

export function RadioGroup({ label, options, position = "column", ...props }: RadioGroupProps) {
  return (
    <ShadcnRadioGroup {...props}>
      <div className={cn("flex space-x-4", position === "column" ? "flex-col" : "flex-row")}>
        {
          options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))
        }
      </div>
    </ShadcnRadioGroup>
  )
}