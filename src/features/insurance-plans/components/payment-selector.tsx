interface PaymentSelectorProps {
  paymentTypes: string[];
  activePaymentType: string;
  setActivePaymentType: (type: string) => void;
}

export const PaymentSelector: React.FC<PaymentSelectorProps> = ({ paymentTypes, activePaymentType, setActivePaymentType }) => {
  return (
    <div className="inline-flex p-1 border border-zinc-300 rounded-md bg-white">
      {paymentTypes.map((type) => (
        <button
          key={type}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            activePaymentType === type
              ? 'bg-[#223E99] text-white shadow-sm'
              : 'text-zinc-500 hover:text-zinc-700'
          }`}
          onClick={() => setActivePaymentType(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
};