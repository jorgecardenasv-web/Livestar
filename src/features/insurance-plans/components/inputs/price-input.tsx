import { memo } from "react";
import { Input } from "@/shared/components/ui/input";

const PriceInput = memo(
  ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (value: string) => void;
  }) => (
    <Input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full"
    />
  )
);

PriceInput.displayName = "PriceInput";

export { PriceInput };
