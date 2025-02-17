"use client";

import { Shield, ShieldCheck, ShieldAlert, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { setActivePlanType } from "../../actions/set-cookies";

interface PlanType {
  id: string;
  name: string;
  orderIndex: number;
}

interface PlanSelectorProps {
  planTypes: PlanType[];
  planTypeId: string;
}

const PlanButton = ({
  type,
  planTypeId,
  icon
}: {
  type: PlanType;
  planTypeId: string;
  icon: React.ReactNode;
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`flex items-center px-4 py-3 rounded text-sm font-medium transition-all duration-300 ${planTypeId === type.id
        ? "bg-[#223E99] text-white shadow-lg transform scale-105"
        : "bg-white text-[#223E99] border-2 border-[#223E99] hover:bg-sky-50 hover:shadow-md"
        }`}
    >
      {pending ? (
        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
      ) : (
        icon
      )}
      {type.name}
    </button>
  );
};

export const PlanSelector: React.FC<PlanSelectorProps> = ({
  planTypes,
  planTypeId,
}) => {
  const getPlanIcon = (orderIndex: number) => {
    const icons = [
      <Shield key="shield" className="w-5 h-5 mr-2" />,
      <ShieldCheck key="shield-check" className="w-5 h-5 mr-2" />,
      <ShieldAlert key="shield-alert" className="w-5 h-5 mr-2" />
    ];
    return icons[orderIndex] || icons[0];
  };

  return (
    <div className="mb-2">
      <div className="flex flex-wrap gap-4">
        {planTypes.map((type) => (
          <form key={type.id} action={setActivePlanType}>
            <input type="hidden" name="planTypeId" value={type.id} />
            <PlanButton
              type={type}
              planTypeId={planTypeId}
              icon={getPlanIcon(type.orderIndex)}
            />
          </form>
        ))}
      </div>
    </div>
  );
};
