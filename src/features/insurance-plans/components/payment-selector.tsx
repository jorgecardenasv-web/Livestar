import { CreditCard, Calendar } from "lucide-react";

interface PaymentSelectorProps {
  paymentTypes: string[];
  activePaymentType: string;
  setActivePaymentType: (type: string) => void;
}

export const PaymentSelector: React.FC<PaymentSelectorProps> = ({
  paymentTypes,
  activePaymentType,
  setActivePaymentType,
}) => {
  return (
    <div className="mb-2">
      <h3 className="text-base font-bold text-[#223E99] mb-2">Tipo de Pago</h3>
      <div className="flex space-x-4">
        {paymentTypes.map((type) => (
          <button
            key={type}
            className={`flex items-center px-4 py-2 rounded text-sm font-medium transition-all duration-300 ${
              activePaymentType === type
                ? "bg-[#223E99] text-white shadow-lg transform scale-105"
                : "bg-white text-[#223E99] border-2 border-[#223E99] hover:bg-sky-50 hover:shadow-md"
            }`}
            onClick={() => setActivePaymentType(type)}
          >
            {type === "Mensual" ? (
              <CreditCard className="w-5 h-5 mr-2" />
            ) : (
              <Calendar className="w-5 h-5 mr-2" />
            )}
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};
