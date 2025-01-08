"use client";

import { SubmitButton } from "@/shared/components/ui/submit-button";
import { useFormState } from "react-dom";
import { updatePassword } from "../actions/update-password";
import { useEffect, useRef } from "react";
import { useNotificationStore } from "@/features/notification/store/notification-store";
import { PasswordInput } from "@/shared/components/ui/password-input";
import { Card, CardContent } from "@/shared/components/ui/card";

export const PasswordForm = () => {
  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );

  const [state, formAction] = useFormState(updatePassword, null);

  const formRef = useRef<any>(null);

  useEffect(() => {
    if (state?.result) {
      showNotification("Contraseña actualizada", "success");
      formRef.current.reset();
    }
  }, [showNotification, state?.result]);

  return (
    <Card className="mx-auto dark:bg-zinc-800 dark:text-zinc-100 dark:ring-0 w-full">
      <CardContent className="space-y-6 p-6">
        <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
          Editar contraseña
        </h3>
        <form ref={formRef} action={formAction} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="current-password"
              className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              Contraseña actual
            </label>
            <PasswordInput
              id="current-password"
              name="currentPassword"
              placeholder="Escribe tu contraseña actual."
            />
            <span className="text-sm text-red-600">
              {state?.errors?.currentPassword && state?.errors?.currentPassword}
            </span>
          </div>
          <div>
            <label
              htmlFor="current-password"
              className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              Nueva contraseña
            </label>
            <PasswordInput
              id="new-password"
              name="newPassword"
              placeholder="Escribe tu nueva contraseña."
            />
            <span className="text-sm text-red-600">
              {state?.errors?.newPassword && state?.errors?.newPassword}
            </span>
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              Repetir nueva contraseña
            </label>
            <PasswordInput
              id="confirm-password"
              name="confirmPassword"
              placeholder="Escribe de nuevo tu nueva contraseña."
            />
            <span className="text-sm text-red-600">
              {state?.errors?.confirmPassword && state?.errors?.confirmPassword}
            </span>
          </div>
          {state?.error && <p className="text-red-600">{state?.error}</p>}
          <SubmitButton
            textStatic="Cambiar contraseña"
            textPending="Cambiando contraseña..."
          />
        </form>
      </CardContent>
    </Card>
  );
};
