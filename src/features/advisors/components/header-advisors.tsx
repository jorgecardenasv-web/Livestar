import { Card } from "@tremor/react";

export const HeaderAdvisors = (): JSX.Element => {
    return (
        <Card>
            <h3 className="font-semibold text-lg text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Asesores
            </h3>
            <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                Visión general de todos los asesores registrados en tu organización.
            </p>
        </Card>
    );
}