import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table';
import React from 'react';

interface TableSkeletonProps {
  columns: string[];
  rowCount: number;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({ columns, rowCount }) => {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              {columns?.map((column, index) => (
                <TableHead key={index}>
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-2/4"></div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(rowCount)].map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4"></div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};