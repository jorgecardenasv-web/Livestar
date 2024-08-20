import { Card } from "@tremor/react";
import { ModalAddAdvisors } from "./modal-add-advisors";

export const HeaderAdvisors = (): JSX.Element => {
    return (
        <Card className="flex flex-row items-center justify-between gap-2 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-0">
            <section>
                <h3 className="font-semibold text-lg text-tremor-content-strong dark:text-dark-tremor-content-strong">Asesores</h3>
                <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">Visión general de todos los asesores registrados en tu organización.</p>
            </section>
            <ModalAddAdvisors />
        </Card>
    );
}