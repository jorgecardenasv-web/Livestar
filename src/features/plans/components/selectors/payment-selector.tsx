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
      className={`w-full h-full flex items-center justify-center text-sm font-medium transition-colors duration-300 ${activePaymentType === type ? "text-white" : "text-[#223E99]"
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
    <div className="mb-4 sm:mb-8 w-full max-w-[16rem] mx-auto">
      <div className="relative w-full h-12 sm:h-14 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div
          className={`absolute top-0 w-1/2 h-full bg-[#223E99] rounded-lg transition-all duration-300 ease-in-out ${activePaymentType === "Anual" ? "translate-x-full" : "translate-x-0"
            }`}
        />
        <div className="relative h-full flex">
          {paymentTypes.map((type, index) => (
            <form
              key={type}
              action={setActivePaymentType}
              className="w-1/2 h-full"
            >
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
    </div>
  );
};
