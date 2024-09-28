interface PlanSelectorProps {
  planTypes: string[];
  activePlanType: string;
  setActivePlanType: (type: string) => void;
}

export const PlanSelector: React.FC<PlanSelectorProps> = ({ planTypes, activePlanType, setActivePlanType }) => {
  return (
    <div className="inline-flex p-1 border border-zinc-300 rounded-md bg-white">
      {planTypes.map((type) => (
        <button
          key={type}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            activePlanType === type
              ? 'bg-[#223E99] text-white shadow-sm'
              : 'text-zinc-500 hover:text-zinc-700'
          }`}
          onClick={() => setActivePlanType(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
};