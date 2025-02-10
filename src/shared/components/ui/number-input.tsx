import { FC, ReactNode, useState, useEffect } from "react";
import { Input, InputProps } from "./input";
import { Label } from "./label";
import { cn } from "@/shared/utils/cn";

interface Props extends Omit<InputProps, 'type' | 'value' | 'defaultValue'> {
  label?: string;
  error?: string;
  darkLabel?: boolean;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  value?: string | number;
  defaultValue?: string | number;
}

export const NumberInput: FC<Props> = ({
  label,
  error,
  darkLabel,
  icon,
  iconPosition = "start",
  className,
  onChange,
  value,
  defaultValue,
  name,
  ...props
}) => {
  const [displayValue, setDisplayValue] = useState('');
  const [hiddenValue, setHiddenValue] = useState('');

  const formatNumber = (val: string | number) => {
    if (val === undefined || val === null || val === '') return '';
    const number = val.toString().replace(/[^\d]/g, '');
    return number ? parseInt(number).toLocaleString('es-MX') : '';
  };

  useEffect(() => {
    const initialValue = value !== undefined ? value : defaultValue;
    if (initialValue !== undefined) {
      const formatted = formatNumber(initialValue);
      setDisplayValue(formatted);
      setHiddenValue(initialValue.toString());
    }
  }, [value, defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '');

    const formatted = formatNumber(rawValue);
    setDisplayValue(formatted);
    setHiddenValue(rawValue);

    if (onChange) {
      e.target.value = rawValue;
      onChange(e);
    }
  };

  return (
    <div className="w-full space-y-1">
      {label && (
        <Label
          htmlFor={name}
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
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          className={cn(
            icon && iconPosition === "start" ? "pl-10" : "",
            icon && iconPosition === "end" ? "pr-10" : "",
            className
          )}
          {...props}
        />
        <input
          type="hidden"
          name={name}
          value={hiddenValue}
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
