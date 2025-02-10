import { DollarSign } from "lucide-react";
import { NumberInput } from "@/shared/components/ui/number-input";

interface Props {
  value: string | number;
  onChange: (value: string) => void;
  className?: string;
}

export const PriceInput: React.FC<Props> = ({ value, onChange, className }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <NumberInput
      value={value}
      onChange={handleChange}
      icon={<DollarSign className="h-4 w-4 text-gray-500" />}
      className={className}
    />
  );
};
