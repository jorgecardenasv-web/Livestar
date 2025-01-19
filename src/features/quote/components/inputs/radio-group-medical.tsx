import React from "react";
import { RadioOption } from "../../types";

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value: RadioOption | undefined;
  onChange: (name: string, value: RadioOption) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
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
          checked={value === option}
          onChange={() => onChange(name, option)}
          className="form-radio text-primary"
        />
        <span>{option}</span>
      </label>
    ))}
  </div>
);

export default RadioGroup;
