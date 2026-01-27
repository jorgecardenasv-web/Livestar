"use client";

import { CreditCard, Calendar } from "lucide-react";
import { setActivePaymentType } from "../../actions/set-cookies";

interface PaymentSelectorProps {
  paymentTypes: string[];
  activePaymentType: string;
}

export const PaymentSelector: React.FC<PaymentSelectorProps> = ({
  paymentTypes,
  activePaymentType,
}) => {
  return (
    <div className="mb-4 sm:mb-8 w-full sm:max-w-[16rem] mx-auto">
      <h3 className="text-base font-medium text-gray-700 sm:hidden">Selecciona tu forma de pago</h3>

      {/* Versión móvil - botones en columna */}
      <div className="sm:hidden w-full">
        <div className="flex flex-col gap-3 bg-white p-4 rounded-xl shadow-sm">
          {paymentTypes.map((type, index) => (
            <form
              key={type}
              action={setActivePaymentType}
              className="w-full"
            >
              <input type="hidden" name="paymentType" value={type} />
              <button
                type="submit"
                aria-pressed={activePaymentType === type}
                aria-label={`Seleccionar pago ${type}`}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-all duration-300 ${activePaymentType === type
                  ? "bg-[#223E99] text-white shadow-md"
                  : "bg-white text-[#223E99] border border-[#223E99] hover:bg-sky-50 hover:shadow-sm"
                  }`}
              >
                <div className="flex items-center">
                  {type === "Mensual" ? (
                    <CreditCard className="w-5 h-5 mr-2" />
                  ) : (
                    <Calendar className="w-5 h-5 mr-2" />
                  )}
                  <span className="whitespace-nowrap">{type}</span>
                </div>
                {activePaymentType === type && (
                  <div className="bg-white rounded-full p-0.5 ml-2">
                    <div className="w-3 h-3 rounded-full bg-[#223E99] border-2 border-white"></div>
                  </div>
                )}
              </button>
            </form>
          ))}
        </div>
      </div>

      {/* Versión desktop - selector con slider */}
      <div className="hidden sm:block relative w-full h-14 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <div
          className={`absolute top-0 w-1/2 h-full bg-[#223E99] rounded-xl transition-all duration-300 ease-in-out ${activePaymentType === "Anual" ? "translate-x-full" : "translate-x-0"
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
              <button
                type="submit"
                aria-pressed={activePaymentType === type}
                aria-label={`Seleccionar pago ${type}`}
                className={`w-full h-full flex items-center justify-center text-sm font-medium transition-colors duration-300 ${activePaymentType === type ? "text-white" : "text-[#223E99]"}`}
              >
                {type === "Mensual" ? (
                  <CreditCard className="w-5 h-5 mr-2" />
                ) : (
                  <Calendar className="w-5 h-5 mr-2" />
                )}
                <span className="font-medium">{type}</span>
              </button>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
};
