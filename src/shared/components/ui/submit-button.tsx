"use client";

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./button";

interface Props extends ButtonProps {
  label: string;
  labelPending: string;
  disabled?: boolean;
}

export const SubmitButton = ({ label, labelPending, disabled, ...props }: Props) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={disabled || pending} {...props}>
      {pending ? labelPending : label}
    </Button>
  );
};
