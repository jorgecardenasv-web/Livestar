"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, SkipForward } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { steps } from "../data/steps";
import { useStorytelling } from "../../hooks/use-storytelling";

export function InsuranceFlow() {
  const [step, setStep] = useState(0);
  const { openModalStorytelling } = useStorytelling();

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="px-2 sm:px-4 md:px-6 flex items-center">
      <Card className="max-w-6xl w-full mx-auto bg-white overflow-hidden h-[calc(100vh-8rem)] max-h-[700px]">
        <CardContent className="px-2 sm:px-4 md:px-6 h-full flex flex-col">
          {/* Progress Bar */}
          <div className="w-[85%] sm:w-3/4 md:w-2/3 mx-auto bg-gray-100 h-1.5 sm:h-2 rounded-full mb-2 sm:mb-3">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Navigation */}
          <div className="flex-1 flex flex-col justify-between">
            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={steps[step].id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 grid place-content-center max-w-full sm:max-w-[600px] md:max-w-[800px] mx-auto px-2 sm:px-6 md:px-8 overflow-y-auto"
              >
                {steps[step].component}
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center gap-y-2 sm:gap-y-3 mt-2 sm:mt-3 px-4 sm:px-6 md:px-10"
            >
              <div className="flex flex-col md:flex-row justify-between items-center w-full md:gap-y-0">
                {/* Skip Intro or Quote Button */}
                <AnimatePresence mode="wait">
                  {step === 0 ? (
                    <motion.div
                      key="skip-intro"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="w-full md:w-auto text-center"
                    >
                      <Button
                        variant="outline"
                        onClick={openModalStorytelling}
                        className="text-primary border-primary hover:bg-primary/70 hover:text-white text-sm sm:text-base px-4 sm:px-5 h-10 sm:h-12"
                      >
                        <SkipForward className="animate-pulse" size={20} />
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
                      className="w-full md:w-auto text-center"
                    >
                      <Button
                        onClick={openModalStorytelling}
                        className="bg-primary text-white rounded px-4 sm:px-5 my-auto hover:bg-primary/90 h-10 sm:h-12"
                      >
                        <span className="text-base sm:text-lg font-medium">Cotizar ahora</span>
                        <ArrowRight className="ml-2 animate-pulse" size={24} />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Middle Space */}
                <div className="flex-1"></div>

                <div className="flex-1 flex justify-end items-center gap-x-3 sm:gap-x-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <Button
                      onClick={() =>
                        setStep(
                          (prev) => (prev - 1 + steps.length) % steps.length
                        )
                      }
                      className="bg-primary text-white size-10 sm:size-12 rounded-full my-auto"
                      disabled={step === 0}
                    >
                      <ArrowLeft size={20} strokeWidth={2.5} />
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <Button
                      onClick={() =>
                        setStep((prev) => (prev + 1) % steps.length)
                      }
                      className="bg-primary text-white size-10 sm:size-12 rounded-full my-auto"
                      disabled={step === steps.length - 1}
                    >
                      <ArrowRight size={20} strokeWidth={2.5} />
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
