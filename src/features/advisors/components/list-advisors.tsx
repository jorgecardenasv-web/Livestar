import {
    Card,
    Badge,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
} from '@tremor/react';
import { Advisor } from "../types/advisor";
import { UserStatus } from "@prisma/client";
import { PaginationListAdvisors } from './pagination-list-advisors';
import { ListButtonsAdvisors } from './list-buttons-advisors';

export const ListAdvisors = ({ advisors }: { advisors: Advisor[] }): JSX.Element => {

    return (
        <>
            <Card>
                <Table>
                    <TableHead>
                        <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
                            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                Nombre
                            </TableHeaderCell>
                            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                Email
                            </TableHeaderCell>
                            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                Rol
                            </TableHeaderCell>
                            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                Status
                            </TableHeaderCell>
                            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                Fecha de creación
                            </TableHeaderCell>
                            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                Acciones
                            </TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {advisors.map((advisor: Advisor) => (
                            <TableRow key={advisor.id}>
                                <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">{advisor.name}</TableCell>
                                <TableCell>{advisor.email}</TableCell>
                                <TableCell>{`${advisor.role.charAt(0).toUpperCase()}${advisor.role.slice(1).toLowerCase()}`}</TableCell>
                                <TableCell>{advisor.status === UserStatus.ACTIVE ? <Badge color="green">Activo</Badge> : <Badge color="red">Inactivo</Badge>}</TableCell>
                                <TableCell>{advisor.createdAt.toLocaleString()}</TableCell>
                                <TableCell className="flex gap-1">
                                    <ListButtonsAdvisors advisor={advisor} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
            <PaginationListAdvisors totalCount={advisors.length} />
        </>
    );
}