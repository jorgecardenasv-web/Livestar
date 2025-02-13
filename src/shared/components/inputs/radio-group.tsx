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
      <div className="flex justify-start">
      <Label className="text-lg">{label}</Label>
      </div>
      <div className={cn("flex ", position === "column" ? "space-y-2 flex-col" : "space-y-1 flex-row")}>
        {
          options.map((option) => (
            <div key={option.value} className={cn("flex items-center space-x-1 ", position === "column" ? "" : "mr-4")}>
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))
        }
      </div>
    </ShadcnRadioGroup>
  )
}