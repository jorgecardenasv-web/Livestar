'use client'

import { Button, ButtonProps } from "@tremor/react";
import { useFormStatus } from "react-dom";

export const SubmitButton = ({
  textStatic,
  textPending,
  className,
  color,
}: {
  textStatic: string;
  textPending: string;
  className?: string;
  color?: ButtonProps["color"];
}) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className={className} disabled={pending} color={color ?? "sky"}>
      {pending ? textPending : textStatic}
    </Button>
  );
};