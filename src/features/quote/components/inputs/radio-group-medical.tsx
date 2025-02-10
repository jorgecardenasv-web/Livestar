import React from "react";
import { RadioOption } from "../../types";
import { cn } from "@/shared/utils/cn";

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value: RadioOption | undefined;
  onChange: (name: string, value: RadioOption) => void;
  disabled?: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  disabled,
}) => (
  <div className="flex space-x-4">
    {options.map((option) => (
      <label
        key={option}
        className="flex items-center space-x-2 cursor-pointer"
      >
        <input
          type="radio"
          name={name}
          value={option}
          disabled={disabled}
          checked={value === option}
          onChange={() => onChange(name, option)}
          className={cn("form-radio text-primary", {
            "cursor-not-allowed text-gray-400": disabled,
          })}
        />
        <span>{option}</span>
      </label>
    ))}
  </div>
);

export default RadioGroup;
