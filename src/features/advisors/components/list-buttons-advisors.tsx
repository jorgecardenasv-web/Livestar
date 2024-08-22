"use client";

import { SubmitButton } from "@/shared/components/submit-button";
import {
  Badge,
  Button,
  Dialog,
  DialogPanel,
  Select,
  SelectItem,
  TextInput,
} from "@tremor/react";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Advisor } from "../types/advisor";
import { UserStatus } from "@prisma/client";
import { useFormState } from "react-dom";
import { editAdvisor } from "../actions/edit-advisor";
import { useNotificationStore } from "@/features/notification/store/notification-store";
import { Modal } from "@/shared/components/modal";
import { useDeleteAdvisor } from "../hooks/use-delete-advisor";
import { DeleteAdvisorForm } from "./delete-advisor-form";

export const ListButtonsAdvisors = ({
  advisor,
}: {
  advisor: Advisor;
}): JSX.Element => {
  const { advisorIdToDelete, openDeleteModalAdvisor, closeDeleteModalAdvisor } = useDeleteAdvisor();
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);
  const { showNotification } = useNotificationStore((state) => state);
  const [state, formAction] = useFormState(editAdvisor, {
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
      setIsOpenModalEdit(false);
      showNotification("¡Asesor editado exitosamente!", "success");
    }

    if (Boolean(state?.errors?.general?.length)) {
      if (state?.errors?.general) {
        setIsOpenModalEdit(false);
        showNotification(state.errors.general ?? "Error desconocido", "error");
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.errors]);

  return (
    <>
      <Button color="red" onClick={() => openDeleteModalAdvisor(advisor.id)}>
        <Trash2 size={20} />
      </Button>
      <Button color="blue" onClick={() => setIsOpenModalEdit(true)}>
        <Pencil size={20} />
      </Button>
      {/* ! Delete modal */}
      <Modal
        isOpen={advisor.id === advisorIdToDelete}
        setIsOpen={closeDeleteModalAdvisor}
        title="¿Estás seguro de que deseas eliminar este registro?"
        description="Esta acción no se puede deshacer. Una vez eliminado, el registro será eliminado permanentemente de la base de datos. Por favor, asegúrate de que realmente deseas proceder con esta acción."
        size="md"
      >
        <DeleteAdvisorForm advisor={advisor} />
      </Modal>

      {/* ! Edit modal */}
      <Dialog
        open={isOpenModalEdit}
        onClose={(val: boolean) => setIsOpenModalEdit(val)}
        static={true}
      >
        <DialogPanel>
          <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Editar Asesor
          </h3>
          <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Modifique la información necesaria para actualizar el perfil del
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
                defaultValue={advisor?.name}
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
                defaultValue={advisor?.email}
                required
                error={Boolean(state?.errors?.email?.length)}
                errorMessage={state?.errors?.email}
              />
            </div>
            <div className="mb-4">
              <p className="mb-2 leading-5 text-tremor-default  dark:text-dark-tremor-content text-dark-tremor-background">
                Estatus
              </p>
              <Select
                defaultValue={advisor?.status === UserStatus.ACTIVE ? "1" : "2"}
                id="status"
                name="status"
                required
              >
                <SelectItem value="1">
                  <Badge color="green">Activo</Badge>
                </SelectItem>
                <SelectItem value="2">
                  <Badge color="red">Inactivo</Badge>
                </SelectItem>
              </Select>
            </div>
            {/* <div className='mb-4'>
                            <p className='mb-2 leading-5 text-tremor-default dark:text-dark-tremor-content text-dark-tremor-background'>Contraseña</p>
                            <TextInput type='password' placeholder='' id="password" value={advisor?.password} name="password" required error={Boolean(state?.errors?.password?.length)} errorMessage={state?.errors?.password} />
                        </div> */}

            <div className="mt-8 w-full flex flex-row gap-2">
              <SubmitButton
                textStatic="Editar Asesor"
                className="flex-1"
                textPending="Editando Asesor..."
              />
              <Button
                variant="secondary"
                type="button"
                className="flex-1"
                onClick={() => setIsOpenModalEdit(false)}
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
