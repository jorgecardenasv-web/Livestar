"use client";

import { Button } from "@tremor/react";
import { Pencil, Trash2 } from "lucide-react";
import { Advisor } from "../types/advisor";
import { Modal } from "@/shared/components/modal";
import { useDeleteAdvisor } from "../hooks/use-delete-advisor";
import { DeleteAdvisorForm } from "./delete-advisor-form";
import { useEditAdvisor } from "../hooks/use-edit-advisor";
import { EditAdvisorForm } from "./edit-advisor-form";

export const ListButtonsAdvisors = ({
  advisor,
}: {
  advisor: Advisor;
}): JSX.Element => {
  const { advisorIdToDelete, openDeleteModalAdvisor, closeDeleteModalAdvisor } = useDeleteAdvisor();
  const { advisorIdToEdit, closeEditModalAdvisor, openEditModalAdvisor } = useEditAdvisor();


  return (
    <>
      <Button color="red" onClick={() => openDeleteModalAdvisor(advisor.id)}>
        <Trash2 size={20} />
      </Button>
      <Button color="blue" onClick={() => openEditModalAdvisor(advisor.id)}>
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
      <Modal
        isOpen={advisor.id === advisorIdToEdit}
        setIsOpen={closeEditModalAdvisor}
        title="Editar Asesor"
        description="Modifique la información necesaria para actualizar el perfil del asesor."
        size="md"
      >
        <EditAdvisorForm advisor={advisor} />
      </Modal>
    </>
  );
};
