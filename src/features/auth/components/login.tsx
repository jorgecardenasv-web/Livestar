"use client";

import { login } from "../actions/login";
import { SubmitButton } from "@/shared/components/ui/submit-button";
import { TextInput } from "@/shared/components/ui/text-input";
import { PasswordInput } from "@/shared/components/ui/password-input";
import { useLoginForm } from "../hooks/use-login-form";

export const LoginForm = () => {
  const { state, formAction } = useLoginForm(login);

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
              error={state?.inputErrors?.email || ""}
            />
            <PasswordInput
              label="Contraseña"
              id="password"
              name="password"
              autoComplete="current-password"
              placeholder="Escribe tu contraseña"
              error={state?.inputErrors?.password || ""}
            />
            {!state?.success && <p className="text-red-500">{state.message}</p>}
            <SubmitButton
              label="Iniciar sesión"
              labelPending="Iniciando sesión..."
              className="w-full"
            />
          </form>
        </div>
      </div>
    </>
  );
};
