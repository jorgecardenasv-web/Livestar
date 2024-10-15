"use client";

import { Button } from "@tremor/react";
import { Ellipsis } from "lucide-react";
import { useProspectActions } from "../hooks/use-prospect-actions";
import { Prospect } from "../types/prospect";

export const ProspectActions = ({ prospect }: { prospect: Prospect }) => {
  const { openEditProspectModal } = useProspectActions();

  return (
    <Button
      icon={Ellipsis}
      variant="secondary"
      onClick={() => openEditProspectModal(prospect)}
    />
  );
};
