'use client'

import { Button } from "@tremor/react";
import { useFormStatus } from "react-dom";

export const SubmitButton = ({
  textStatic,
  textPending,
}: {
  textStatic: string;
  textPending: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full" color="sky">
      {pending ? textPending : textStatic}
    </Button>
  );
};