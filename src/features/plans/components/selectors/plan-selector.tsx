"use client";

import { Shield, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { setActivePlanType } from "../../actions/set-cookies";
import { useEffect, useRef, useState } from "react";

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
      className={`w-full flex items-center justify-center p-3 sm:px-4 sm:py-3 rounded-lg text-sm font-medium transition-all duration-300 ${planTypeId === type.id
        ? "bg-[#223E99] text-white shadow-md"
        : "bg-white text-[#223E99] border border-[#223E99] hover:bg-sky-50 hover:shadow-sm"
        }`}
    >
      {pending ? (
        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
      ) : (
        icon
      )}
      <span className="whitespace-nowrap">{type.name}</span>
    </button>
  );
};

export const PlanSelector: React.FC<PlanSelectorProps> = ({
  planTypes,
  planTypeId,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(false);

  // Función para verificar el scroll en móvil
  const checkScroll = () => {
    const element = scrollRef.current;
    if (element) {
      const { scrollLeft, scrollWidth, clientWidth } = element;
      setShowLeftGradient(scrollLeft > 0);
      setShowRightGradient(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Efecto para hacer scroll al plan seleccionado en móvil
  useEffect(() => {
    const element = scrollRef.current;
    if (element && planTypeId) {
      const selectedForm = element.querySelector(`form[data-plan-id="${planTypeId}"]`);
      if (selectedForm) {
        const formRect = selectedForm.getBoundingClientRect();
        const containerRect = element.getBoundingClientRect();
        const scrollLeft = formRect.left - containerRect.left - (containerRect.width - formRect.width) / 2;

        element.scrollTo({
          left: element.scrollLeft + scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [planTypeId]);

  // Efecto para verificar el scroll en móvil
  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      checkScroll();
      element.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);

      return () => {
        element.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  return (
    <>
      {/* Diseño para móvil y tablet */}
      <div className="sm:hidden w-full mb-6 relative">
        <h3 className="text-base font-medium text-gray-700">Selecciona el plan a cotizar</h3>
        <div className="flex flex-col gap-3 w-full bg-white p-4 rounded-xl shadow-sm">
          {planTypes.map((type) => (
            <form
              key={type.id}
              action={setActivePlanType}
              className="w-full"
              data-plan-id={type.id}
            >
              <input type="hidden" name="planTypeId" value={type.id} />
              <button
                type="submit"
                className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-all duration-300 ${planTypeId === type.id
                  ? "bg-[#223E99] text-white shadow-md"
                  : "bg-white text-[#223E99] border border-[#223E99] hover:bg-sky-50 hover:shadow-sm"
                  }`}
              >
                <div className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  <span className="whitespace-nowrap">{type.name}</span>
                </div>
                {planTypeId === type.id && (
                  <div className="bg-white rounded-full p-0.5 ml-2">
                    <div className="w-3 h-3 rounded-full bg-[#223E99] border-2 border-white"></div>
                  </div>
                )}
              </button>
            </form>
          ))}
        </div>
      </div>

      {/* Diseño para desktop */}
      <div className="hidden sm:block relative w-full mb-8">
        {showLeftGradient && (
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
        )}
        {showRightGradient && (
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
        )}
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-2"
        >
          <div className="flex justify-center gap-3 min-w-min px-4">
            <div className="flex gap-3 items-center">
              {planTypes.map((type) => (
                <form
                  key={type.id}
                  action={setActivePlanType}
                  className="w-[160px]"
                  data-plan-id={type.id}
                >
                  <input type="hidden" name="planTypeId" value={type.id} />
                  <PlanButton
                    type={type}
                    planTypeId={planTypeId}
                    icon={
                      <Shield className="w-5 h-5 mr-2" />
                    }
                  />
                </form>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};