import { useState } from 'react';

import {
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  getFilteredRowModel,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  SearchInput,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Label,
  Empty,
} from '@/components';

interface InventoryTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function InventoryTable<TData, TValue>({
  columns,
  data,
}: InventoryTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [etapa, setEtapa] = useState('all');
  const [recamaras, setRecamaras] = useState('all');
  const [sanitarios, setSanitarios] = useState('all');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <>
      <div className="mt-5 flex flex-col justify-center gap-3">
        <Label className="text-alt-green-300">
          Buscar por dirección, estado o tipo de propiedad
        </Label>
        <SearchInput
          className="w-[50rem] bg-alt-gray-600 border-gray-400"
          placeholder="Departamento Las Rosas Veracruz..."
          value={
            (table.getColumn('calleYNumero')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('calleYNumero')?.setFilterValue(event.target.value)
          }
        />
      </div>

      <div className="my-5 flex gap-4">
        <div className="flex flex-col justify-center gap-2">
          <Label className="text-alt-green-300" htmlFor="categoria">
            Etapa
          </Label>
          <Select
            value={etapa}
            onValueChange={(value) => {
              setEtapa(value);
              if (value === 'all') {
                table.getColumn('etapa')?.setFilterValue(null);
              } else {
                table.getColumn('etapa')?.setFilterValue(value);
              }
            }}
          >
            <SelectTrigger id="categoria" className="w-[180px]">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Todas</SelectItem>

                <SelectLabel>Premium</SelectLabel>
                <SelectItem value="Cobranza">Cobranza</SelectItem>
                <SelectItem value="Juicio">Juicio</SelectItem>
                <SelectItem value="Sentencia">Sentencia</SelectItem>
                <SelectItem value="Adjudicadas">Adjudicadas</SelectItem>

                <SelectLabel>Classic</SelectLabel>
                <SelectItem value="Altaltium">Altaltium</SelectItem>
                <SelectItem value="Preventa">Preventa</SelectItem>
                <SelectItem value="Consignación">Consignación</SelectItem>
                <SelectItem value="Banco">Banco</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col justify-center gap-2">
          <Label className="text-alt-green-300" htmlFor="categoria">
            Recámaras
          </Label>
          <Select
            value={recamaras}
            onValueChange={(value) => {
              setRecamaras(value);
              if (value === 'all') {
                table.getColumn('detalle')?.setFilterValue('');
                setSanitarios('all');
              } else {
                const sanitariosVal = sanitarios === 'all' ? '' : sanitarios;
                table
                  .getColumn('detalle')
                  ?.setFilterValue(
                    `recamaras${value} sanitarios${sanitariosVal}`
                  );
              }
            }}
          >
            <SelectTrigger id="categoria" className="w-[180px]">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Cualquier cantidad</SelectItem>
              <SelectItem value="0">0</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col justify-center gap-2">
          <Label className="text-alt-green-300" htmlFor="categoria">
            Sanitarios
          </Label>
          <Select
            value={sanitarios}
            onValueChange={(value) => {
              setSanitarios(value);
              if (value === 'all') {
                table.getColumn('detalle')?.setFilterValue('');
                setRecamaras('all');
              } else {
                const recamarasVal = recamaras === 'all' ? '' : recamaras;
                table
                  .getColumn('detalle')
                  ?.setFilterValue(
                    `sanitarios${value} recamaras${recamarasVal}`
                  );
              }
            }}
          >
            <SelectTrigger id="categoria" className="w-[180px]">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Cualquier cantidad</SelectItem>
              <SelectItem value="0">0</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

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
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => {
                    const cellId = cell.column.columnDef.id;
                    return (
                      <TableCell
                        key={cell.id}
                        className={cellId === 'actions' ? 'p-0 px-4' : ''}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24">
                  <Empty />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

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
