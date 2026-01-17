"use client";

import { useQuoteFormRHF } from "../../hooks/use-quote-form-rhf";
import { PersonalInfoSection } from "./personal-info-section";
import { ContactInfoSection } from "./contact-info-section";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    isSubmitting
  } = useQuoteFormRHF(prospect);

  return (
    <Card className="bg-white shadow-sm border border-slate-200">
      <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Empecemos con tus datos
          </h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Cuéntanos sobre ti y a quién quieres proteger para calcular tu cotización.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-10">
          <PersonalInfoSection
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            handleChildChange={handleChildChange}
            handleProtectedPersonChange={handleProtectedPersonChange}
          />

          <AnimatePresence>
            {showContactInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ContactInfoSection
                  formData={formData}
                  errors={errors}
                  handleInputChange={handleInputChange}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white h-12 sm:h-14 rounded font-semibold text-base sm:text-lg mt-4 sm:mt-6 hover:bg-[#223E99]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                Cotizando...
              </>
            ) : (
              "Cotizar"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
