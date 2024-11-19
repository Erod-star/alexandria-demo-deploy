import { ColumnDef } from '@tanstack/react-table';

import type { FilterFn, Row } from '@tanstack/react-table';

// ? Utils
import { copyToClipboard } from '@/lib/utils';

// ? Icons
import { ArrowUpDown, Building2, House, Info, MapPin } from 'lucide-react';

// ? Components
import { HandleImages } from '@/modules/inventory/components';
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components';

// ? Types
import type { Announcement } from '@/modules/announcements/types';

const customFilterFn: FilterFn<Announcement> = (
  row: Row<Announcement>,
  _: string,
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterValue: any
) => {
  filterValue = filterValue.toLowerCase();

  const { calleYNumero, tipoPropiedad, estado } = row.original.inventory;
  const calleYNumeroTag = calleYNumero.toLowerCase();
  const tipoPropiedadTag = tipoPropiedad?.toLowerCase() || '';
  const estadoTag = estado?.toLowerCase() || '';

  const filterParts = filterValue.split(' ');
  const rowValues = `${calleYNumeroTag} ${tipoPropiedadTag} ${estadoTag}`;

  return filterParts.every((partial: string) => rowValues.includes(partial));
};

export const announcementWithInventoriesColumns: ColumnDef<Announcement>[] = [
  {
    accessorKey: 'inventory.fotosUrls',
    header: () => (
      <div className="flex-center">
        <div className="relative">
          <div className="absolute -top-1 text-xl -right-2 rotate-12">📸</div>
          <div className="text-3xl">🏚️</div>
        </div>
      </div>
    ),
    cell: ({ row }) => {
      const { inventory } = row.original;
      const imgs = inventory.fotosUrls || '';
      return <HandleImages images={[imgs]} />;
    },
  },
  {
    id: 'inventory.calleYNumero',
    accessorKey: 'inventory.calleYNumero',
    filterFn: customFilterFn,
    header: ({ column }) => {
      return (
        <Button
          className="text-lg"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Detalle de la propiedad
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const property = row.original.inventory;
      const fullAddress = `${property.colonia}, ${property.municipio}, ${property.estado}, #${property.cp}`;

      return (
        <div className="max-w-[20rem]">
          <p className="font-bold text-lg mb-1">{property.calleYNumero}</p>
          <div className="text-base flex items-center gap-2 mb-1 text-alt-green-300">
            <div className="px-2">
              {property.tipoPropiedad === 'Departamento' ? (
                <Building2 className="size-4" />
              ) : (
                <House className="size-4" />
              )}
            </div>
            <p> {property.tipoPropiedad} </p>
          </div>

          <div className="flex gap-2 text-sm font-semibold text-gray-300">
            {property.googleMaps && (
              <Button
                className="px-2 py-0 h-6"
                variant="ghost"
                onClick={() => {
                  copyToClipboard({
                    value: property.googleMaps!,
                    message: 'Ubicación copiada en el portapapeles',
                  });
                }}
              >
                <MapPin className="size-4" />
              </Button>
            )}

            <Button
              className="p-0 h-6 text-gray-300 flex justify-start overflow-hidden hover:text-alt-green-300"
              variant="link"
              onClick={() => {
                copyToClipboard({
                  value: fullAddress,
                  message: 'Dirección copiada en el portapapeles',
                });
              }}
            >
              <p className="truncate">{fullAddress}</p>
            </Button>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'proppitId',
    header: () => 'Proppit',
    cell: ({ row }) => {
      const { proppitId } = row.original;
      return (
        <div className="flex justify-start text-start flex-col">
          <p className="text-white font-semibold">{proppitId}</p>
          <p>Vinculo a la propiedad</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'inmueblesId',
    header: () => 'Inmuebles',
    cell: ({ row }) => {
      const { inmueblesId } = row.original;
      return (
        <div className="flex justify-start text-start flex-col">
          <p className="text-white font-semibold">{inmueblesId}</p>
          <p>Vinculo a la propiedad</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'meliId',
    header: () => 'Mercado libre',
    cell: ({ row }) => {
      const { meliId } = row.original;
      return (
        <div className="flex justify-start text-start flex-col">
          <p className="text-white font-semibold">{meliId}</p>
          <p>Vinculo a la propiedad</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'inventory',
    header: '',
    cell: ({ row }) => {
      const { inventory } = row.original;
      return (
        <div className="flex-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={!inventory}
                  size="icon"
                  className="relative"
                  onClick={() => row.toggleExpanded()}
                >
                  <Info />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Detalles de la propiedad</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];