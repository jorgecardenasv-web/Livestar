import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";

interface TableSkeletonProps {
  columns: string[];
  rowCount: number;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({ columns, rowCount }) => {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-2xl">
        <Table>
          <TableHead>
            <TableRow>
              {columns?.map((column, index) => (
                <TableHeaderCell key={index}>
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-2/4"></div>
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHead>
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