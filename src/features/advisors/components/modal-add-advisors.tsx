"use client";

import { Button, Dialog, DialogPanel, TextInput } from "@tremor/react";
import { UserRoundPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { addAdvisor } from "../actions/add-advisor";
import { SubmitButton } from "@/shared/components/submit-button";
import { useNotification } from "@/shared/hooks/notification-provider";

export const ModalAddAdvisors = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { showNotification } = useNotification();
  const [state, formAction] = useFormState(addAdvisor, {
    errors: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      general: "",
    },
  });

  useEffect(() => {
    if (state.errors === null) {
      setIsOpen(false);
      showNotification("¡Asesor creado exitosamente!", "success");
    }

    if (Boolean(state?.errors?.general?.length)) {
      if (state?.errors?.general) {
        setIsOpen(false);
        showNotification(state.errors.general ?? "Error desconocido", "error");
      }
    }

  }, [showNotification, state.errors]);

  return (
    <>
      <button
        className="flex items-center flex-row bg-primary p-3 gap-1 rounded-md text-white text-base"
        onClick={() => setIsOpen(true)}
      >
        <UserRoundPlus size={20} />
        <span className="m-0 text-sm hidden lg:block">Crear asesor</span>
      </button>
      <Dialog
        open={isOpen}
        onClose={(val: boolean) => setIsOpen(val)}
        static={true}
      >
        <DialogPanel>
          <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Crear Nuevo Asesor
          </h3>
          <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Ingrese la información requerida para crear un nuevo perfil de
            asesor.
          </p>

          <form action={formAction} className="mt-5">
            <div className="mb-4">
              <p className="mb-2 leading-5 text-tremor-default  dark:text-dark-tremor-content text-dark-tremor-background">
                Nombre completo
              </p>
              <TextInput
                placeholder=""
                type="text"
                id="name"
                name="name"
                required
                error={Boolean(state?.errors?.name?.length)}
                errorMessage={state?.errors?.name}
              />
            </div>
            <div className="mb-4">
              <p className="mb-2 leading-5 text-tremor-default  dark:text-dark-tremor-content text-dark-tremor-background">
                Email
              </p>
              <TextInput
                type="email"
                placeholder=""
                id="email"
                name="email"
                required
                error={Boolean(state?.errors?.email?.length)}
                errorMessage={state?.errors?.email}
              />
            </div>
            <div className="mb-4">
              <p className="mb-2 leading-5 text-tremor-default  dark:text-dark-tremor-content text-dark-tremor-background">
                Contraseña
              </p>
              <TextInput
                type="password"
                placeholder=""
                id="password"
                name="password"
                required
                error={Boolean(state?.errors?.password?.length)}
                errorMessage={state?.errors?.password}
              />
            </div>
            <div className="mb-4">
              <p className="mb-2 leading-5 text-tremor-default  dark:text-dark-tremor-content text-dark-tremor-background">
                Confirme contraseña
              </p>
              <TextInput
                type="password"
                placeholder=""
                id="password-confirmation"
                name="password-confirmation"
                required
                error={Boolean(state?.errors?.passwordConfirmation?.length)}
                errorMessage={state?.errors?.passwordConfirmation}
              />
            </div>

            <div className="mt-8 w-full flex flex-row gap-2">
              <SubmitButton
                textStatic="Crear Asesor"
                className="flex-1"
                textPending="Creando Asesor..."
              />
              <Button
                variant="secondary"
                type="button"
                className="flex-1"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </DialogPanel>
      </Dialog>
    </>
  );
};
