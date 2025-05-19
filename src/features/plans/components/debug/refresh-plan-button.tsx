'use client';

import { Button } from "@/shared/components/ui/button";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

export const RefreshPlanButton = () => {
  const router = useRouter();
  
  const handleRefresh = () => {
    router.refresh();
  };
  
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleRefresh}
      className="flex items-center gap-1 text-xs"
    >
      <RefreshCw size={12} />
      <span>Actualizar datos</span>
    </Button>
  );
};
