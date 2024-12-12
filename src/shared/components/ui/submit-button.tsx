'use client'

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./button";

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