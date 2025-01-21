import { FC, ReactNode } from "react";
import { Input, InputProps } from "./input";
import { Label } from "./label";
import { cn } from "@/shared/utils/cn";

interface Props extends InputProps {
  label?: string;
  error?: string;
  darkLabel?: boolean;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
}

export const TextInput: FC<Props> = ({
  label,
  error,
  darkLabel,
  icon,
  iconPosition = "start",
  className,
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
      <div className="relative">
        {icon && iconPosition === "start" && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
          </div>
        )}
        <Input
          className={cn(
            icon && iconPosition === "start" ? "pl-10" : "",
            icon && iconPosition === "end" ? "pr-10" : "",
            className
          )}
          {...props}
        />
        {icon && iconPosition === "end" && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {icon}
          </div>
        )}
      </div>
      {error && <span className="text-sm text-destructive">{error}</span>}
    </div>
  );
};
