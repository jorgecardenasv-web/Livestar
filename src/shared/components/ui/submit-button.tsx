"use client";

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./button";

interface Props extends ButtonProps {
  label: string;
  labelPending: string;
}

export const SubmitButton = ({ label, labelPending, ...props }: Props) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending ? labelPending : label}
    </Button>
  );
};
