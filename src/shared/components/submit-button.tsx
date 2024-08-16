'use client'

import { Button } from "@tremor/react";
import { useFormStatus } from "react-dom";

export const SubmitButton = ({
  textStatic,
  textPending,
  className,
}: {
  textStatic: string;
  textPending: string;
  className?: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className={className} disabled={pending} color="sky">
      {pending ? textPending : textStatic}
    </Button>
  );
};