import React, { useState } from 'react';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ExpandedState,
  getExpandedRowModel,
} from '@tanstack/react-table';

// ? Components
import { LeadRow } from '../LeadRow';
import {
  Button,
  Label,
  SearchInput,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components';

// ? Types
import { Lead } from '@/modules/leads/types';

interface LeadData {
  leads: Lead[];
}

interface AnnouncementsTableProps<TData extends LeadData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: [];
}

export function AnnouncementsTable<TData extends LeadData, TValue>({
  columns,
  data,
}: AnnouncementsTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      expanded,
    },
  });

  return (
    <>
      <div className="flex flex-col justify-center gap-3 mb-5">
        <Label className="text-alt-green-300">
          Buscar por dirección, estado o tipo de propiedad
        </Label>
        <SearchInput
          className="w-full md:max-w-[50rem] bg-alt-gray-600 border-gray-400"
          placeholder="Departamento Las Rosas Veracruz..."
          value={
            (table
              .getColumn('inventory.calleYNumero')
              ?.getFilterValue() as string) ?? ''
          }
          onChange={(event) => {
            const column = table.getColumn('inventory.calleYNumero');
            column?.setFilterValue(event.target.value);
          }}
        />
      </div>

      <div className="rounded-md border border-alt-green-900 bg-alt-gray-600">
        <div className="relative w-full overflow-auto">
          <Table className="border-b-8 border-alt-green-900">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>

                    {row.getIsExpanded() && (
                      <TableRow>
                        <TableCell colSpan={columns.length} className="h-24">
                          {row.original.leads.map((lead: Lead) => (
                            <LeadRow key={lead.leadId} lead={lead} />
                          ))}
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end space-x-2 py-4 mr-4">
          <Button
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </>
  );
}
