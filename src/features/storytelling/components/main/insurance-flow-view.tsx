"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, SkipForward } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { steps } from "../data/steps";
import { useStorytelling } from "../../hooks/use-storytelling";

export function InsuranceFlow() {
  const [step, setStep] = useState(0);
  const { openModalStorytelling } = useStorytelling();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const progress = ((step + 1) / steps.length) * 100;

  const handleStepChange = useCallback((newStep: number) => {
    setStep(newStep);
    setTimeout(() => {
      if (contentRef.current) {
        const headerOffset = 200;
        const elementPosition = contentRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 50);
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-[750px] w-full max-w-7xl mx-auto flex flex-col px-4 sm:px-6 md:px-8 py-6 sm:py-8 lg:border rounded-lg mb-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="sticky top-0 py-4 sm:py-6 mb-8 sm:mb-12 bg-gradient-to-t from-white via-white to-white/80 backdrop-blur-sm z-30"
      >
        <div className="relative w-[90%] sm:w-3/4 md:w-2/3 mx-auto">
          {/* Línea base */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 sm:h-2 bg-gray-100 rounded-full" />

          {/* Barra de progreso */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 h-1.5 sm:h-2 bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />

          {/* Puntos de progreso */}
          <div className="relative flex justify-between items-center">
            {steps.map((_, index) => {
              const isCompleted = index <= step;
              const isCurrent = index === step;
              return (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`size-4 sm:size-5 rounded-full flex items-center justify-center
                    ${isCompleted ? 'bg-primary' : 'bg-gray-200'}
                    ${isCurrent ? 'ring-4 ring-primary/30' : ''}
                  `}
                >
                  {isCompleted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="size-2 sm:size-2.5 bg-white rounded-full"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Container Buttons */}
        <div className="flex flex-col sm:flex-row-reverse justify-between items-center gap-4 sm:gap-6 max-w-4xl mx-auto relative mt-6">
          <div className="flex justify-center items-center gap-x-3 sm:gap-x-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Button
                onClick={() =>
                  handleStepChange((step - 1 + steps.length) % steps.length)
                }
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
                onClick={() => handleStepChange((step + 1) % steps.length)}
                className="bg-primary text-white size-10 sm:size-12 rounded-full"
                disabled={step === steps.length - 1}
              >
                <ArrowRight size={20} strokeWidth={2.5} />
              </Button>
            </motion.div>
          </div>

          <div className="flex-1"></div>

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
                  <span className="text-base sm:text-lg font-medium">
                    Cotizar ahora
                  </span>
                  <ArrowRight className="ml-2 animate-pulse" size={20} />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col justify-between gap-y-6 sm:gap-y-8">
        <AnimatePresence mode="wait">
          <motion.div
            ref={contentRef}
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
      </div>
    </div>
  );
}
