'use client';

import React, { FC } from 'react';
import {
  Card,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Select,
  SelectItem
} from "@tremor/react";
import { Advisor } from "../types/advisor";
import { UserStatus } from "@prisma/client";
import { ListButtonsAdvisors } from "./list-buttons-advisors";
import { format } from 'date-fns';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface ListAdvisorsProps {
  advisors: Advisor[];
}

export const ListAdvisors: FC<ListAdvisorsProps> = ({ advisors }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const statusOptions = [
    { value: '', label: 'Todos' },
    { value: UserStatus.ACTIVE, label: 'Activo' },
    { value: UserStatus.INACTIVE, label: 'Inactivo' }
  ];

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams);    
    if (value) {
      params.set('status', value);
    } else {
      params.delete('status');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const formatDate = (date: Date) => {
    return format(new Date(date), 'dd/MM/yyyy, HH:mm:ss');
  };

  return (
    <>
      <div className="mb-4">
        <Select
          className="max-w-xs"
          onValueChange={handleStatusChange}
          placeholder="Filtrar por estado"
          defaultValue=""
        >
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Card className="dark:bg-dark-tremor-background-subtle">
        <Table>
          <TableHead>
            <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
              <TableHeaderCell>Nombre</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Rol</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Fecha de creación</TableHeaderCell>
              <TableHeaderCell>Acciones</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {advisors.map((advisor: Advisor) => (
              <TableRow key={advisor.id}>
                <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {advisor.name}
                </TableCell>
                <TableCell>{advisor.email}</TableCell>
                <TableCell>{`${advisor.role
                  .charAt(0)
                  .toUpperCase()}${advisor.role
                  .slice(1)
                  .toLowerCase()}`}</TableCell>
                <TableCell>
                  {advisor.status === UserStatus.ACTIVE ? (
                    <Badge color="green">Activo</Badge>
                  ) : (
                    <Badge color="red">Inactivo</Badge>
                  )}
                </TableCell>
                <TableCell>{formatDate(advisor.createdAt)}</TableCell>
                <TableCell className="flex gap-1">
                  <ListButtonsAdvisors advisor={advisor} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};