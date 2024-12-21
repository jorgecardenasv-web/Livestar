"use client";

import { useFormState } from "react-dom";
import { signin } from "../actions/signin";
import { SubmitButton } from "@/shared/components/ui/submit-button";
import { TextInput } from "@/shared/components/ui/text-input";
import { PasswordInput } from "@/shared/components/ui/password-input";

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
            <TextInput
              label="Correo electrónico"
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder="escribe tu correo electrónico"
              error={state?.errors?.email || ""}
            />
            <PasswordInput
              label="Contraseña"
              id="password"
              name="password"
              autoComplete="current-password"
              placeholder="Escribe tu contraseña"
              error={state?.errors?.password || ""}
            />
            {state?.error && <p className="text-red-500">{state.error}</p>}
            <SubmitButton
              textStatic="Iniciar sesión"
              textPending="Iniciando sesión..."
              className="w-full"
            />
          </form>

        </div>
      </div>
    </>
  );
};
