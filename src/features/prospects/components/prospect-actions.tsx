"use client";

import { Ellipsis } from "lucide-react";
import { useProspectActions } from "../hooks/use-prospect-actions";
import { Prospect } from "../types/prospect";
import { Button } from "@/shared/components/ui/button";

export const ProspectActions = ({ prospect }: { prospect: Prospect }) => {
  const { openEditProspectModal } = useProspectActions();

  return (
    <Button variant="outline" onClick={() => openEditProspectModal(prospect)}>
      <Ellipsis size={20} />
    </Button>
  );
};
