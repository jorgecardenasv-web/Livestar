"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { steps } from "./data/steps";
import { useStorytelling } from "../hooks/use-storytelling";

export function InsuranceFlow() {
  const [step, setStep] = useState(0);
  const { openModalStorytelling } = useStorytelling();

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 py-12 px-4">
      <Card className="max-w-6xl mx-auto">
        <CardContent className="pt-6">
          {/* Progress Bar */}
          <div className="w-2/3 mx-auto bg-gray-100 h-2 rounded-full mb-8">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Navigation */}
          <div className="mt-10 px-6 items-center">
            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={steps[step].id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="min-h-[500px] grid place-content-center max-w-[800px] mx-auto"
              >
                {steps[step].component}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between items-center gap-x-4 mt-10">
              <div>
                {step === 0 && (
                  <Button
                    variant="link"
                    onClick={() => setStep(() => steps.length - 1)}
                  >
                    Saltar introducción
                  </Button>
                )}
              </div>
              {/* Quote */}
              {step === steps.length - 1 && (
                <Button
                  onClick={openModalStorytelling}
                  className="bg-primary text-white rounded-lg my-auto"
                >
                  <span className="text-xl">Cotizar ahora</span>
                </Button>
              )}

              <div className="flex items-center gap-x-4">
                <Button
                  onClick={() =>
                    setStep((prev) => (prev - 1 + steps.length) % steps.length)
                  }
                  className="bg-primary text-white size-12 rounded-full my-auto"
                  disabled={step === 0}
                >
                  <ArrowLeft size={24} strokeWidth={3} />
                </Button>
                <Button
                  onClick={() => setStep((prev) => (prev + 1) % steps.length)}
                  className="bg-primary text-white size-12 rounded-full my-auto"
                  disabled={step === steps.length - 1}
                >
                  <ArrowRight size={24} strokeWidth={3} />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
