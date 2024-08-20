'use client'

import { SubmitButton } from "@/shared/components/submit-button";
import { Badge, Button, Callout, Dialog, DialogPanel, Select, SelectItem, TextInput } from "@tremor/react";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Advisor } from "../types/advisor";
import { UserStatus } from "@prisma/client";
import { deleteAdvisor } from "../actions/delete-advisor";
import { useNotification } from "@/shared/hooks/notification-provider";
import { useFormState } from "react-dom";
import { editAdvisor } from "../actions/edit-advisor";

export const ListButtonsAdvisors = ({ advisor }: { advisor: Advisor }): JSX.Element => {
    const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
    const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);
    const { showNotification } = useNotification();
    const [state, formAction] = useFormState(editAdvisor, {
        errors: {
            name: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            general: "",
        },
    });

    const handleDeleteAdvisor = async (): Promise<void> => {
        const isOperationConfirmed: boolean = await deleteAdvisor(advisor.id);
        setIsOpenModalDelete(false);

        if (isOperationConfirmed) return showNotification("¡Asesor creado exitosamente!", "success");
        showNotification("Error desconocido", "error");
    }

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
            <Button color="red" onClick={() => setIsOpenModalDelete(true)}>
                <Trash2 size={20} />
            </Button>
            <Button color="blue" onClick={() => setIsOpenModalEdit(true)}>
                <Pencil size={20} />
            </Button>
            {/* ! Delete modal */}
            <Dialog open={isOpenModalDelete} onClose={(val: boolean) => setIsOpenModalDelete(val)} static={true}>
                <DialogPanel>
                    <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">¿Estás seguro de que deseas eliminar este registro?</h3>
                    <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                        Esta acción no se puede deshacer. Una vez eliminado, el registro será eliminado permanentemente de la base de datos. Por favor, asegúrate de que realmente deseas proceder con esta acción.
                    </p>

                    <Callout title="Asesor a eliminar" className="mt-4" color="red">
                        <div className="flex flex-row gap-2 mb-1">
                            <p>Nombre:</p>
                            <p className="font-semibold">{advisor?.name}</p>
                        </div>
                        <div className="flex flex-row gap-2 mb-1">
                            <p>Email:</p>
                            <p className="font-semibold">{advisor?.email}</p>
                        </div>
                        <div className="flex flex-row gap-2 mb-1">
                            <p>Status:</p>
                            <p>{advisor.status === UserStatus.ACTIVE ? <Badge color="green">Activo</Badge> : <Badge color="red">Inactivo</Badge>}</p>
                        </div>
                        <div className="flex flex-row gap-2">
                            <p>Fecha de creación:</p>
                            <p className="font-semibold">{advisor?.createdAt.toLocaleString()}</p>
                        </div>
                    </Callout>

                    <div className="mt-8 w-full flex flex-row gap-2">
                        <SubmitButton textStatic="Eliminar" color="red" className='flex-1' textPending="Eliminando..." onClick={handleDeleteAdvisor} />
                        <Button variant="secondary" color="red" type='button' className='flex-1' onClick={() => setIsOpenModalDelete(false)}>
                            Cancelar
                        </Button>
                    </div>
                </DialogPanel>
            </Dialog>

            {/* ! Edit modal */}
            <Dialog open={isOpenModalEdit} onClose={(val: boolean) => setIsOpenModalEdit(val)} static={true}>
                <DialogPanel>
                    <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">Editar Asesor</h3>
                    <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                        Modifique la información necesaria para actualizar el perfil del asesor.
                    </p>

                    <form action={formAction} className='mt-5'>
                        <div className='mb-4'>
                            <p className='mb-2 leading-5 text-tremor-default  dark:text-dark-tremor-content text-dark-tremor-background'>Nombre completo</p>
                            <TextInput placeholder='' type='text' id="name" name="name" required defaultValue={advisor?.name} error={Boolean(state?.errors?.name?.length)} errorMessage={state?.errors?.name} />
                        </div>
                        <div className='mb-4'>
                            <p className='mb-2 leading-5 text-tremor-default  dark:text-dark-tremor-content text-dark-tremor-background'>Email</p>
                            <TextInput type='email' placeholder='' id="email" name="email" defaultValue={advisor?.email} required error={Boolean(state?.errors?.email?.length)} errorMessage={state?.errors?.email} />
                        </div>
                        <div className='mb-4'>
                            <p className='mb-2 leading-5 text-tremor-default  dark:text-dark-tremor-content text-dark-tremor-background'>Estatus</p>
                            <Select defaultValue={advisor?.status === UserStatus.ACTIVE ? "1" : "2"} id="status" name="status" required>
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
                            <SubmitButton textStatic="Editar Asesor" className='flex-1' textPending="Editando Asesor..." />
                            <Button variant="secondary" type='button' className='flex-1' onClick={() => setIsOpenModalEdit(false)}>
                                Cancelar
                            </Button>
                        </div>
                    </form>
                </DialogPanel>
            </Dialog>
        </>
    );
}