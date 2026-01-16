"use client";

import { useGetQuoteForm } from "../../hooks/use-get-quote-form";
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
  } = useGetQuoteForm(prospect);

  return (
    <Card className="bg-white">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-8">
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

          <Button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white p-6 rounded font-bold text-lg mt-6 hover:bg-[#223E99]">
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
