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
    <div className="bg-gradient-to-b from-white to-blue-50 pb-6 sm:pb-10 px-2 sm:px-6">
      <Card className="max-w-6xl mx-auto bg-white overflow-hidden">
        <CardContent className="pt-4 sm:pt-6 px-2 sm:px-6">
          {/* Progress Bar */}
          <div className="w-[90%] sm:w-2/3 mx-auto bg-gray-100 h-2 rounded-full mb-6 sm:mb-10">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Navigation */}
          <div className="mt-4 sm:mt-8 items-center">
            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={steps[step].id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="min-h-[350px] sm:min-h-[500px] grid place-content-center max-w-full sm:max-w-[800px] mx-auto px-2 sm:px-8 overflow-x-hidden"
              >
                {steps[step].component}
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center gap-y-4 sm:gap-y-6 mt-6 sm:mt-12"
            >
              <div className="flex flex-col md:flex-row justify-between items-center w-full gap-y-4 sm:gap-y-6 md:gap-y-0">
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
                        onClick={() => setStep(() => steps.length - 1)}
                        className="text-primary border-primary hover:bg-primary/70 hover:text-white text-base px-5 h-12"
                      >
                        <SkipForward className="animate-pulse" size={22} />
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
                        className="bg-primary text-white rounded px-5 my-auto hover:bg-primary/90 h-12"
                      >
                        <span className="text-lg font-medium">Cotizar ahora</span>
                        <ArrowRight className="ml-2 animate-pulse" size={30} />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Middle Space */}
                <div className="flex-1"></div>

                <div className="flex-1 flex justify-end items-center gap-x-4">
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
                      onClick={() =>
                        setStep((prev) => (prev + 1) % steps.length)
                      }
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
