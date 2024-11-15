"use client";

import { TextInput } from "@tremor/react";
import { useFormState } from "react-dom";
import { signin } from "../actions/signin";
import { SubmitButton } from "@/shared/components/submit-button";

export const SigninForm = () => {
  const [state, formAction] = useFormState(signin, {
    errors: {
      email: "",
      password: "",
    },
  });

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h3 className="text-center text-3xl font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Iniciar sesión
          </h3>
          <form action={formAction} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Correo electrónico
              </label>
              <TextInput
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="Escribe tu correo electrónico."
              />
              <span className="text-sm text-red-500">
                {state?.errors?.email}
              </span>
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Contraseña
              </label>
              <TextInput
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                placeholder="Escribe tu contraseña."
              />
              <span className="text-sm text-red-600">
                {state?.errors?.password && state.errors.password}
              </span>
            </div>
            {state?.error && <p className="text-red-500">{state.error}</p>}
            <SubmitButton
              textStatic="Iniciar sesión"
              textPending="Iniciando sesión..."
            />
          </form>
        </div>
      </div>
    </>
  );
};
