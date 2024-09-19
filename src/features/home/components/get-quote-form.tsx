"use client";

import React, { useState } from "react";
import { useFormState } from "react-dom";
import {
  Button,
  NumberInput,
  Select,
  SelectItem,
  TextInput,
} from "@tremor/react";
import { getQuoteForm } from "../actions/get-quote-form";
import { FadeInAnimatedComponent } from "@/shared/components/FadeInAnimatedComponent";

const initialState = {
  errors: null,
};

export const GetQuoteForm = () => {
  const [state, formAction] = useFormState(getQuoteForm, initialState);
  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.value) {
      setCurrentStep((prev) => Math.min(prev + 1, 10));
    }
  };

  return (
    <form action={formAction} className="space-y-8">
      {/* Just for debuuging the errors messages, i should remove it later, or not? :p */}
      {state.errors &&
        typeof state.errors === "object" &&
        Object.entries(state.errors).map(([field, error]) => (
          <div key={field} className="text-red-500">
            {error}
          </div>
        ))}

      <div className="space-y-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-xl font-bold">Datos Personales</h3>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="space-y-2 col-span-12">
              <FadeInAnimatedComponent>
                <label className="text-sm font-bold text-gray-600">
                  Mi nombre es
                </label>
                <TextInput
                  name="name"
                  className="w-full"
                  placeholder=""
                  required
                  onChange={handleInputChange}
                  error={!!state.errors?.name}
                />
              </FadeInAnimatedComponent>
            </div>

            {currentStep >= 2 && (
              <div className="space-y-2 col-span-12 md:col-span-6">
                <label className="text-sm font-bold text-gray-600">Tengo</label>
                <div className="flex items-center gap-2">
                  <FadeInAnimatedComponent>
                    <NumberInput
                      name="age"
                      className="w-full"
                      placeholder=""
                      required
                      onValueChange={() =>
                        handleInputChange({
                          target: { value: "changed" },
                        } as any)
                      }
                      error={!!state.errors?.age}
                    />
                    <span className="text-sm font-bold text-gray-600">
                      años
                    </span>
                  </FadeInAnimatedComponent>
                </div>
              </div>
            )}

            {currentStep >= 3 && (
              <div className="space-y-2 col-span-12 md:col-span-6">
                <FadeInAnimatedComponent>
                  <label className="text-sm font-bold text-gray-600">Soy</label>
                  <Select
                    name="gender"
                    className="w-full"
                    placeholder="Seleccionar"
                    required
                    onValueChange={() =>
                      handleInputChange({ target: { value: "changed" } } as any)
                    }
                    error={!!state.errors?.gender}
                  >
                    <SelectItem value="hombre">Hombre</SelectItem>
                    <SelectItem value="mujer">Mujer</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </Select>
                </FadeInAnimatedComponent>
              </div>
            )}

            {currentStep >= 4 && (
              <div className="space-y-2 col-span-12 md:col-span-6">
                <FadeInAnimatedComponent>
                  <label className="text-sm font-bold text-gray-600">
                    Mi código postal es
                  </label>
                  <TextInput
                    name="postalCode"
                    className="w-full"
                    placeholder=""
                    required
                    onChange={handleInputChange}
                    error={!!state.errors?.postalCode}
                  />
                </FadeInAnimatedComponent>
              </div>
            )}

            {currentStep >= 5 && (
              <div className="space-y-2 col-span-12 md:col-span-6">
                <FadeInAnimatedComponent>
                  <label className="text-sm font-bold text-gray-600">
                    Quiero proteger a
                  </label>
                  <Select
                    name="protectWho"
                    className="w-full"
                    placeholder="Seleccionar"
                    required
                    onValueChange={() =>
                      handleInputChange({ target: { value: "changed" } } as any)
                    }
                    error={!!state.errors?.protectWho}
                  >
                    <SelectItem value="familia">Familia</SelectItem>
                    <SelectItem value="pareja">Pareja</SelectItem>
                    <SelectItem value="hijos">Hijos</SelectItem>
                  </Select>
                </FadeInAnimatedComponent>
              </div>
            )}

            {currentStep >= 6 && (
              <div className="space-y-2 col-span-12 md:col-span-6">
                <FadeInAnimatedComponent>
                  <label className="text-sm font-bold text-gray-600">
                    Mi pareja es
                  </label>
                  <Select
                    name="partnerGender"
                    className="w-full"
                    placeholder="Seleccionar"
                    onValueChange={() =>
                      handleInputChange({ target: { value: "changed" } } as any)
                    }
                    error={!!state.errors?.partnerGender}
                  >
                    <SelectItem value="hombre">Hombre</SelectItem>
                    <SelectItem value="mujer">Mujer</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </Select>
                </FadeInAnimatedComponent>
              </div>
            )}

            {currentStep >= 7 && (
              <div className="space-y-2 col-span-12 md:col-span-6">
                <FadeInAnimatedComponent>
                  <label className="text-sm font-bold text-gray-600">
                    Mi pareja tiene
                  </label>
                  <div className="flex items-center gap-2">
                    <NumberInput
                      name="partnerAge"
                      className="w-full"
                      placeholder=""
                      onValueChange={() =>
                        handleInputChange({
                          target: { value: "changed" },
                        } as any)
                      }
                      error={!!state.errors?.partnerAge}
                    />
                    <span className="text-sm font-bold text-gray-600">
                      años
                    </span>
                  </div>
                </FadeInAnimatedComponent>
              </div>
            )}

            {currentStep >= 8 && (
              <div className="space-y-2 col-span-12 md:col-span-6">
                <FadeInAnimatedComponent>
                  <label className="text-sm font-bold text-gray-600">
                    Tengo
                  </label>
                  <div className="flex items-center gap-2">
                    <Select
                      name="children"
                      className="w-full"
                      placeholder="Nº"
                      required
                      onValueChange={() =>
                        handleInputChange({
                          target: { value: "changed" },
                        } as any)
                      }
                      error={!!state.errors?.children}
                    >
                      {[...Array(10)].map((_, i) => (
                        <SelectItem key={i} value={String(i)}>
                          {i}
                        </SelectItem>
                      ))}
                    </Select>
                    <span className="text-sm font-bold text-gray-600">
                      hijo(s)
                    </span>
                  </div>
                </FadeInAnimatedComponent>
              </div>
            )}

            {currentStep >= 9 && (
              <div className="space-y-2 col-span-12 md:col-span-6">
                <FadeInAnimatedComponent>
                  <label className="text-sm font-bold text-gray-600">
                    Las edades de mis hijos son
                  </label>
                  <TextInput
                    name="childrenAges"
                    className="w-full"
                    placeholder="Ej: 5, 7, 10"
                    onChange={handleInputChange}
                    error={!!state.errors?.childrenAges}
                  />
                </FadeInAnimatedComponent>
              </div>
            )}
          </div>
        </div>

        {currentStep >= 10 && (
          <FadeInAnimatedComponent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-xl font-bold">Datos de contacto</h3>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="space-y-2 col-span-12 md:col-span-6">
                <label className="text-sm font-bold text-gray-600">
                  Mi whatsapp es
                </label>
                <TextInput
                  name="whatsapp"
                  className="flex-grow"
                  placeholder=""
                  required
                  onChange={handleInputChange}
                  error={!!state.errors?.whatsapp}
                />
              </div>

              <div className="space-y-2 col-span-12 md:col-span-6">
                  <label className="text-sm font-bold text-gray-600">
                    Mi correo es
                  </label>
                  <TextInput
                    name="email"
                    className="flex-grow"
                    placeholder=""
                    required
                    onChange={handleInputChange}
                    error={!!state.errors?.email}
                  />
                </div>
            </div>
          </FadeInAnimatedComponent>
        )}
      </div>

      <Button
        type="submit"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold text-lg w-full mt-6 hover:bg-blue-600"
      >
        Cotizar
      </Button>
    </form>
  );
};
