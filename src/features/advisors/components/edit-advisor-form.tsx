import { SubmitButton } from "@/shared/components/submit-button";
import { Badge, Button, Select, SelectItem, TextInput } from "@tremor/react";
import { useEditAdvisor } from "../hooks/use-edit-advisor";
import { Advisor } from "../types/advisor";
import { UserStatus } from "@prisma/client";

export const EditAdvisorForm = ({ advisor }: { advisor: Advisor }) => {
    const { formAction, formState, closeEditModalAdvisor } = useEditAdvisor();

    return (
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
                    error={Boolean(formState?.errors?.name?.length)}
                    errorMessage={formState?.errors?.name}
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
                    error={Boolean(formState?.errors?.email?.length)}
                    errorMessage={formState?.errors?.email}
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
                    onClick={closeEditModalAdvisor}
                >
                    Cancelar
                </Button>
            </div>
        </form>
    );
};
