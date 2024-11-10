import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';

// ? Icons
import { Building2, Hand, House, MapPin, MoreHorizontal } from 'lucide-react';

// ? Components
import { HandleImages } from '@/modules/inventory/components';
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components';

// ? Utils
import { formatToMxn } from '@/lib/utils';

// ? Types
import type { Announcement } from '../../types';

export const announcementColumns: ColumnDef<Announcement>[] = [
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
    header: 'Detalles de la propiedad',
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
                  navigator.clipboard.writeText(property.googleMaps!);
                  toast('Ubicación copiada en el protapapeles', {
                    duration: 1500,
                  });
                }}
              >
                <MapPin className="size-4" />
              </Button>
            )}

            <Button
              className="p-0 h-6 text-gray-300 flex justify-start hover:text-alt-green-300"
              variant="link"
              onClick={() => {
                navigator.clipboard.writeText(fullAddress);
                toast('Dirección copiada en el portapapeles', {
                  duration: 1500,
                });
              }}
            >
              <p className="overflow-hidden truncate">{fullAddress}</p>
            </Button>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'inventory.etapa',
    header: () => <div className="text-center">Estado de venta</div>,
    cell: ({ row }) => {
      const { inventory } = row.original;
      return (
        <div className="flex-center">
          <Badge variant="altaltium" className="text-sm font-semibold">
            {inventory.etapa || 'Sin etapa'}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'inventory.valorAproximado',
    header: () => <div className="text-center">Valor aproximado</div>,
    cell: ({ row }) => {
      const { inventory } = row.original;

      return (
        <div className="flex-center">
          <p className="text-lg font-semibold">
            {inventory.valorAproximado
              ? formatToMxn(inventory.valorAproximado)
              : 'Sin definir'}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: 'leads',
    header: () => <div className="text-center">Leads</div>,
    cell: () => (
      <div className="flex-center">
        {/* // TODO: Maybe do a custom component for this? */}
        <Button size="icon" className="relative">
          <Hand />
          {/* <Contact /> */}
          <div className="size-5 bg-red-600 text-white shadow-xl flex-center rounded-full absolute -top-2 -right-2">
            <p className="text-[0.7rem] font-semibold">2</p>
          </div>
        </Button>
      </div>
    ),
  },
  {
    id: 'acciones',
    header: () => <div className="flex justify-end">Acciones</div>,
    cell: () => {
      return (
        <div className="flex justify-end pr-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => console.log('::Editar')}>
                Editar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
