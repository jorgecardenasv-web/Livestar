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
    <div className="bg-gradient-to-b from-white to-blue-50 pb-10 px-4">
    <Card className="max-w-6xl mx-auto bg-white">
      <CardContent className="pt-4">
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
  
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex flex-col items-center gap-y-4 mt-10"
          >
            <div className="flex flex-col md:flex-row justify-between items-center w-full gap-y-4 md:gap-y-0">
              {/* Skip Intro Button */}
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div
                    key="skip-intro"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="w-full md:w-auto text-center"
                  >
                    <Button
                      variant="link"
                      onClick={() => setStep(() => steps.length - 1)}
                      className="text-primary"
                    >
                      Saltar introducción
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
  
              {/* Navigation Buttons */}
              <div className="flex-1 flex justify-center">
                {/* Quote */}
                <AnimatePresence mode="wait">
                  {step === steps.length - 1 && (
                    <motion.div
                      key="quote-button"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Button
                        onClick={openModalStorytelling}
                        className="bg-primary text-white rounded p-6 my-auto"
                      >
                        <span className="text-xl">Cotizar ahora</span>
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
  
              <div className="flex-1 flex justify-end items-center gap-x-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <Button
                    onClick={() =>
                      setStep((prev) => (prev - 1 + steps.length) % steps.length)
                    }
                    className="bg-primary text-white size-12 rounded-full my-auto"
                    disabled={step === 0}
                  >
                    <ArrowLeft size={24} strokeWidth={3} />
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <Button
                    onClick={() => setStep((prev) => (prev + 1) % steps.length)}
                    className="bg-primary text-white size-12 rounded-full my-auto"
                    disabled={step === steps.length - 1}
                  >
                    <ArrowRight size={24} strokeWidth={3} />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  </div>  
  );
}