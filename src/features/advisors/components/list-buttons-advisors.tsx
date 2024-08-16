'use client'

import { SubmitButton } from "@/shared/components/submit-button";
import { Badge, Button, Callout, Dialog, DialogPanel } from "@tremor/react";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Advisor } from "../types/advisor";
import { UserStatus } from "@prisma/client";

export const ListButtonsAdvisors = ({ advisor }: { advisor: Advisor }): JSX.Element => {
    const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);

    return (
        <>
            <Button color="red" onClick={() => setIsOpenModalDelete(true)}>
                <Trash2 size={20} />
            </Button>
            <Button color="blue">
                <Pencil size={20} />
            </Button>
            {/* ! Delete modal */}
            <Dialog open={isOpenModalDelete} onClose={(val) => setIsOpenModalDelete(val)} static={true}>
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
                        <form action="">
                            <SubmitButton textStatic="Eliminar" color="red" className='flex-1' textPending="Eliminando..." />
                            <Button variant="secondary" color="red" type='button' className='flex-1' onClick={() => setIsOpenModalDelete(false)}>
                                Cancelar
                            </Button>
                        </form>
                    </div>
                </DialogPanel>
            </Dialog>
        </>
    );
}