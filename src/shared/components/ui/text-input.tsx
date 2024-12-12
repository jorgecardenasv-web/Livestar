import { FC } from "react";
import { Input, InputProps } from "./input";
import { Label } from "./label";

interface Props extends InputProps {
  label: string;
  error: string;
  darkLabel?: boolean;
}

export const TextInput: FC<Props> = ({ label, error, darkLabel, ...props }) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label
        htmlFor={props.name}
        className={`${darkLabel ? "text-white" : null}`}
      >
        {label}
      </Label>
      <Input {...props} />
      <span className="text-sm text-red-600">{error}</span>
    </div>
  );
};
