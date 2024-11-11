import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components';

import { LeadsPropertyCollapsible } from '../LeadsPropertyCollapsible';

interface DataTableProps<Lead, TValue> {
  columns: ColumnDef<Lead, TValue>[];
  data: Lead[];
}

export function LeadsTable<Lead, TValue>({
  columns,
  data,
}: DataTableProps<Lead, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border border-alt-green-900 bg-alt-gray-600">
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
              <Collapsible key={row.id} asChild>
                <>
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => {
                      if (cell.column.columnDef.id === 'properties') {
                        return (
                          <TableCell key={cell.id}>
                            <CollapsibleTrigger asChild>
                              <div>
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </div>
                            </CollapsibleTrigger>
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  <CollapsibleContent asChild>
                    <LeadsPropertyCollapsible
                      // properties={row.getValue('properties')}
                      properties={['1', '2', '3']}
                    />
                  </CollapsibleContent>
                </>
              </Collapsible>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
