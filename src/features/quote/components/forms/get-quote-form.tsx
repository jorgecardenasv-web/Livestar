"use client";

import { useState } from "react";
import { useQuoteFormRHF } from "../../hooks/use-quote-form-rhf";
import { ProtectionStep, PersonalInfoSection } from "./personal-info-section";
import { ContactInfoSection } from "./contact-info-section";
import { Button } from "@/shared/components/ui/button";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    key: "protection",
    label: "Protección",
  },
  {
    key: "personal",
    label: "Tus datos",
  },
  {
    key: "contact",
    label: "Contacto",
  },
];

export const GetQuoteForm: React.FC<{
  prospect: any;
}> = ({ prospect }) => {
  const {
    formData,
    errors,
    showContactInfo,
    handleInputChange,
    handleChildChange,
    handleProtectedPersonChange,
    handleSubmit,
    isSubmitting,
  } = useQuoteFormRHF(prospect);

  const [currentStep, setCurrentStep] = useState(0);

  const getStepDescription = (stepKey: string) => {
    if (stepKey === "protection") {
      return "¿A quién quieres proteger?";
    }
    if (stepKey === "contact") {
      return "¿Dónde te compartimos tu cotización?";
    }

    switch (formData.protectWho) {
      case "solo_yo":
        return "Cuéntanos un poco más de ti.";
      case "mi_pareja_y_yo":
        return "Cuéntanos más de ti y tu pareja.";
      case "familia":
      case "mis_hijos_y_yo":
      case "solo_mis_hijos":
        return "Cuéntanos más de las personas que vas a proteger.";
      case "mis_padres":
        return "Cuéntanos más de tus padres.";
      case "otros":
        return "Cuéntanos más de las personas que quieres asegurar.";
      default:
        return "Cuéntanos más de las personas que vas a proteger.";
    }
  };

  const handleNext = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
      return;
    }

    if (currentStep === 1 && showContactInfo) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    if (currentStep === 0) return;
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="bg-slate-50/80 border border-slate-200 rounded-2xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Empecemos con tu cobertura
        </h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground">
          Completa unos pasos sencillos para calcular tu cotización.
        </p>
      </div>

      <div className="mb-6 sm:mb-8 rounded-xl border border-slate-200 bg-white/80 px-3 py-3 sm:px-4 sm:py-4">
        <p className="text-[11px] sm:text-xs font-medium uppercase tracking-wide text-slate-500 mb-2">
          Tu progreso
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isDisabled = step.key === "contact" && !showContactInfo;

            return (
              <div
                key={step.key}
                className={`flex items-center gap-3 text-sm sm:text-base ${
                  isDisabled && !isActive ? "opacity-50" : ""
                }`}
              >
                <div
                  className={`flex h-7 w-7 sm:h-8 sm:w-8 flex-none items-center justify-center rounded-full text-[11px] sm:text-xs font-semibold ${
                    isActive
                      ? "bg-primary text-white"
                      : isCompleted
                      ? "bg-primary/10 text-primary"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex flex-col">
                  <span
                    className={`font-medium ${
                      isActive ? "text-slate-900" : "text-slate-700"
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="text-[11px] sm:text-xs text-muted-foreground">
                    {getStepDescription(step.key)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {currentStep === 0 && (
          <ProtectionStep
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            onNextStep={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 1 && (
          <PersonalInfoSection
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            handleChildChange={handleChildChange}
            handleProtectedPersonChange={handleProtectedPersonChange}
            showHeader={false}
          />
        )}

        <AnimatePresence mode="wait">
          {currentStep === 2 && showContactInfo && (
            <motion.div
              key="contact-step"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <ContactInfoSection
                formData={formData}
                errors={errors}
                handleInputChange={handleInputChange}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
          <div className="text-xs sm:text-sm text-muted-foreground">
            {currentStep === 0 && "Primero elige a quién quieres proteger."}
            {currentStep === 1 &&
              "Ahora completa los datos de las personas que vas a proteger."}
            {currentStep === 2 &&
              "Por último, déjanos tus datos de contacto para enviarte la cotización."}
          </div>

          <div className="flex w-full sm:w-auto justify-end gap-3">
            {currentStep > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="h-11 px-5 rounded-lg text-sm sm:text-base"
              >
                Atrás
              </Button>
            )}

            {!isLastStep && (
              <Button
                type="button"
                onClick={handleNext}
                disabled={currentStep === 1 && !showContactInfo}
                className="h-11 px-6 w-full sm:w-auto rounded-lg text-sm sm:text-base"
              >
                Siguiente
              </Button>
            )}

            {isLastStep && (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full sm:w-auto bg-primary text-white rounded-lg font-semibold text-sm sm:text-base px-6 sm:px-8 hover:bg-[#223E99]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Cotizando...
                  </>
                ) : (
                  "Cotizar"
                )}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
