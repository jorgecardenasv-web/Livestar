import React from 'react';
import { Input } from "@/shared/components/ui/input";
import numeral from 'numeral';

interface PriceInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const PriceInput: React.FC<PriceInputProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    if (/^[\d,.\s]*$/.test(rawValue)) {
      onChange(rawValue);
    }
  };

  const formatDisplayValue = (value: string) => {
    const num = numeral(value);
    return num.value() ? num.format('0,0.00') : value;
  };

  return (
    <Input
      type="text"
      value={formatDisplayValue(value)}
      onChange={handleChange}
      className="text-right"
    />
  );
};