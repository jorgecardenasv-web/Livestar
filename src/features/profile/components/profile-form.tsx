"use client";

import { SubmitButton } from "@/shared/components/ui/submit-button";
import { Card, TextInput } from "@tremor/react";
import { updateProfile } from "../actions/update-profile";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useNotificationStore } from "@/features/notification/store/notification-store";
import { AuthenticadedUser } from "@/lib/iron-session/types";

export const ProfileForm = ({ user }: { user: AuthenticadedUser }) => {
  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );

  const [state, formAction] = useFormState(updateProfile, null);

  useEffect(() => {
    if (state?.result) {
      showNotification("Perfil actualizado", "success");
    }
  }, [state?.result, showNotification]);

  return (
    <Card className="mx-auto dark:bg-zinc-800 dark:text-zinc-100 dark:ring-0">
      <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
        Editar perfil
      </h3>
      <form action={formAction} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="name"
            className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
          >
            Nombre
          </label>
          <TextInput
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Escribe tu nombre."
            defaultValue={user?.name ?? ""}
          />
          {<span className="text-sm text-red-500">{state?.errors?.name}</span>}
        </div>
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
            defaultValue={user?.email ?? ""}
          />
          <span className="text-sm text-red-500">{state?.errors?.email}</span>
        </div>
        <SubmitButton
          textStatic="Actualizar información"
          textPending="Actualizando información..."
        />
      </form>
    </Card>
  );
};
