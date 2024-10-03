import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";

interface PlanSelectorProps {
  planTypes: string[];
  activePlanType: string;
  setActivePlanType: (type: string) => void;
}

export const PlanSelector: React.FC<PlanSelectorProps> = ({
  planTypes,
  activePlanType,
  setActivePlanType,
}) => {
  const getPlanIcon = (type: string) => {
    switch (type) {
      case "Esencial":
        return <Shield className="w-5 h-5 mr-2" />;
      case "Protegido":
        return <ShieldCheck className="w-5 h-5 mr-2" />;
      case "Blindado":
        return <ShieldAlert className="w-5 h-5 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="mb-2">
      <h3 className="text-base font-bold text-[#223E99] mb-2">Tipo de Plan</h3>
      <div className="flex flex-wrap gap-4">
        {planTypes.map((type) => (
          <button
            key={type}
            className={`flex items-center px-4 py-2 rounded text-sm font-medium transition-all duration-300 ${
              activePlanType === type
                ? "bg-[#223E99] text-white shadow-lg transform scale-105"
                : "bg-white text-[#223E99] border-2 border-[#223E99] hover:bg-sky-50 hover:shadow-md"
            }`}
            onClick={() => setActivePlanType(type)}
          >
            {getPlanIcon(type)}
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};
