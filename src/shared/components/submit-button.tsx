'use client'

import { Button, ButtonProps } from "@tremor/react";
import { useFormStatus } from "react-dom";

interface Props extends ButtonProps {
  textStatic: string;
  textPending: string;
}

export const SubmitButton = ({
  textStatic,
  textPending,
  ...props
}: Props) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending ? textPending : textStatic}
    </Button>
  );
};