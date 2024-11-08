"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { steps } from "./data/steps";

export function InsuranceFlow() {
  const [step, setStep] = useState(0);

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
          <div className="mt-10 flex justify-around px-6 items-center">
            <Button
              onClick={() =>
                setStep((prev) => (prev - 1 + steps.length) % steps.length)
              }
              className="bg-primary text-white size-12 rounded-full my-auto"
              disabled={step === 0}
            >
              <ArrowLeft size={24} strokeWidth={3} />
            </Button>

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="min-h-[500px] flex flex-col items-center space-y-10 max-w-[800px] mx-auto"
              >
                <h2 className="text-3xl font-bold text-center text-gray-600 mb-6">
                  {steps[step].title}
                </h2>
                <div className="text-center text-gray-600 max-w-3xl mx-auto leading-9 text-balance">
                  {steps[step].content}
                </div>
                {steps[step].footerContent && (
                  <div className="text-sm text-center text-gray-500">
                    {steps[step].footerContent}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            <Button
              onClick={() => setStep((prev) => (prev + 1) % steps.length)}
              className="bg-primary text-white size-12 rounded-full my-auto"
              disabled={step === steps.length - 1}
            >
              <ArrowRight size={24} strokeWidth={3} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
