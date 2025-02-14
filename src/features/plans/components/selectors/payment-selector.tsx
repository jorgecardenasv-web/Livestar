"use client";

import { useFormStatus } from "react-dom";
import { CreditCard, Calendar, Loader2 } from "lucide-react";
import { setActivePaymentType } from "../../actions/set-cookies";

interface PaymentSelectorProps {
  paymentTypes: string[];
  activePaymentType: string;
}

const PaymentButton = ({
  type,
  index,
  activePaymentType,
}: {
  type: string;
  index: number;
  activePaymentType: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`absolute top-0 ${index === 0 ? "left-0" : "right-0"
        } w-1/2 h-full flex items-center justify-center text-sm font-medium transition-colors duration-300 ${activePaymentType === type ? "text-white" : "text-[#223E99]"
        }`}
    >
      {pending ? (
        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
      ) : type === "Mensual" ? (
        <CreditCard className="w-5 h-5 mr-2" />
      ) : (
        <Calendar className="w-5 h-5 mr-2" />
      )}
      {type}
    </button>
  );
};

export const PaymentSelector: React.FC<PaymentSelectorProps> = ({
  paymentTypes,
  activePaymentType,
}) => {
  return (
    <div className="mb-8">
      <div className="relative w-64 h-14 bg-white rounded shadow-md">
        <div
          className={`absolute top-0.5 left-0.5 w-[calc(50%-2px)] h-[calc(100%-4px)] bg-[#223E99] rounded transition-transform duration-300 ease-in-out ${activePaymentType === paymentTypes[1] ? "translate-x-full" : ""
            }`}
        />
        {paymentTypes.map((type, index) => (
          <form key={type} action={setActivePaymentType}>
            <input type="hidden" name="paymentType" value={type} />
            <PaymentButton
              type={type}
              index={index}
              activePaymentType={activePaymentType}
            />
          </form>
        ))}
      </div>
    </div>
  );
};
