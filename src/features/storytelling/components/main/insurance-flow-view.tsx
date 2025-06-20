"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, SkipForward } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { steps } from "../data/steps";
import { useStorytelling } from "../../hooks/use-storytelling";

export function InsuranceFlow() {
  const [step, setStep] = useState(0);
  const { openModalStorytelling } = useStorytelling();

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full max-w-7xl mx-auto flex flex-col px-4 sm:px-6 md:px-8 py-6 sm:py-8 lg:border mb-10 rounded-lg">
      {/* Progress Bar */}
      <div className="w-[90%] sm:w-3/4 md:w-2/3 mx-auto bg-gray-100 h-1.5 sm:h-2 rounded-full mb-6 sm:mb-8">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-between gap-y-6 sm:gap-y-8">
        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={steps[step].id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 grid place-content-center max-w-full sm:max-w-[600px] md:max-w-[800px] mx-auto w-full"
          >
            {steps[step].component}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Navigation Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="sticky bottom-0 py-4 sm:py-6 bg-gradient-to-t from-white via-white to-white/80 backdrop-blur-sm z-20"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 max-w-4xl mx-auto relative">
            {/* Skip Intro or Quote Button */}
            <AnimatePresence mode="wait">
              {step === 0 ? (
                <motion.div
                  key="skip-intro"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="outline"
                    onClick={openModalStorytelling}
                    className="w-full sm:w-auto text-primary border-primary hover:bg-primary/70 hover:text-white text-sm sm:text-base px-6 py-3 h-12"
                  >
                    <SkipForward className="animate-pulse" size={18} />
                    <span className="ml-2">Saltar introducción</span>
                  </Button>
                </motion.div>
              ) : step === steps.length - 1 && (
                <motion.div
                  key="quote-button"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full sm:w-auto"
                >
                  <Button
                    onClick={openModalStorytelling}
                    className="w-full sm:w-auto bg-primary text-white px-6 py-3 h-12 hover:bg-primary/90"
                  >
                    <span className="text-base sm:text-lg font-medium">Cotizar ahora</span>
                    <ArrowRight className="ml-2 animate-pulse" size={20} />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex-1"></div>

            {/* Navigation Arrows */}
            <div className="flex justify-center sm:justify-end items-center gap-x-3 sm:gap-x-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Button
                  onClick={() => setStep((prev) => (prev - 1 + steps.length) % steps.length)}
                  className="bg-primary text-white size-10 sm:size-12 rounded-full"
                  disabled={step === 0}
                >
                  <ArrowLeft size={20} strokeWidth={2.5} />
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Button
                  onClick={() => setStep((prev) => (prev + 1) % steps.length)}
                  className="bg-primary text-white size-10 sm:size-12 rounded-full"
                  disabled={step === steps.length - 1}
                >
                  <ArrowRight size={20} strokeWidth={2.5} />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
