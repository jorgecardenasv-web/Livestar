import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import { setActivePlanType } from "../../actions/add-cookies";


interface PlanSelectorProps {
  planTypes: string[];
  activePlanType: string;
}

export const PlanSelector: React.FC<PlanSelectorProps> = ({
  planTypes,
  activePlanType = "Plan Básico",
}) => {
  const getPlanIcon = (type: string) => {
    switch (type) {
      case "Plan Básico":
        return <Shield className="w-5 h-5 mr-2" />;
      case "Plan Intermedio":
        return <ShieldCheck className="w-5 h-5 mr-2" />;
      case "Plan Plus":
        return <ShieldAlert className="w-5 h-5 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="mb-2">
      <div className="flex flex-wrap gap-4">
        {planTypes.map((type) => (
          <form key={type} action={setActivePlanType}>
            <input type="hidden" name="planType" value={type} />
            <button
              type="submit"
              className={`flex items-center px-4 py-3 rounded text-sm font-medium transition-all duration-300 ${
                activePlanType === type
                  ? "bg-[#223E99] text-white shadow-lg transform scale-105"
                  : "bg-white text-[#223E99] border-2 border-[#223E99] hover:bg-sky-50 hover:shadow-md"
              }`}
            >
              {getPlanIcon(type)}
              {type}
            </button>
          </form>
        ))}
      </div>
    </div>
  );
};
