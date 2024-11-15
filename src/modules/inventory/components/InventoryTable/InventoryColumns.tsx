import { useNavigate } from 'react-router-dom';
import { ColumnDef, FilterFn, Row } from '@tanstack/react-table';
import { toast } from 'sonner';

// ? Icons
import {
  House,
  MoreHorizontal,
  Building2,
  ArrowUpDown,
  MapPin,
} from 'lucide-react';

// ? Components
import { HandleImages } from '../HandleImages';
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components';

// ? Hooks
import { useInventoryMutations } from '../../hooks';

// ? Utils
import { formatToMxn } from '@/lib/utils';

// ? Types
import type { Inventory } from '../../types';

const customFilterFn: FilterFn<Inventory> = (
  row: Row<Inventory>,
  _: string,
  filterValue: any
) => {
  filterValue = filterValue.toLowerCase();

  const { calleYNumero, tipoPropiedad, estado } = row.original;
  const calleYNumeroTag = calleYNumero.toLowerCase();
  const tipoPropiedadTag = tipoPropiedad?.toLowerCase() || '';
  const estadoTag = estado?.toLowerCase() || '';

  const filterParts = filterValue.split(' ');
  const rowValues = `${calleYNumeroTag} ${tipoPropiedadTag} ${estadoTag}`;

  return filterParts.every((partial: string) => rowValues.includes(partial));
};

const detalleFilterFn: FilterFn<Inventory> = (
  row: Row<Inventory>,
  _: string,
  filterValue: any
) => {
  if (filterValue === null) return true;
  const { recamaras, sanitarios, estacionamientos } = row.original;
  const recamarasTag = `recamaras${recamaras || 0}`;
  const sanitariosTag = `sanitarios${sanitarios || 0}`;
  const estacionamientosTag = `estacionamientos${estacionamientos || 0}`;

  const filterParts = filterValue.split(' ');
  const rowValues = `${recamarasTag} ${sanitariosTag} ${estacionamientosTag}`;

  return filterParts.every((partial: string) => rowValues.includes(partial));
};

export const inventoryColumns: ColumnDef<Inventory>[] = [
  {
    id: 'fotosUrls',
    accessorKey: 'fotosUrls',
    header: () => (
      <div className="flex-center">
        <div className="relative">
          <div className="absolute -top-1 text-xl -right-2 rotate-12">📸</div>
          <div className="text-3xl">🏚️</div>
        </div>
      </div>
    ),
    cell: ({ row }) => {
      const property = row.original;
      // TODO: Arreglar esto una vez que se tenga la estructura correcta
      const imgs = property.fotosUrls || '';
      return <HandleImages images={[imgs]} />;
    },
  },
  {
    id: 'calleYNumero',
    accessorKey: 'calleYNumero',
    filterFn: customFilterFn,
    header: ({ column }) => {
      return (
        <Button
          className="text-lg"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Ubicación
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const property = row.original;
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
              className="p-0 h-6 text-gray-300 max-w-[16rem] flex justify-start overflow-hidden hover:text-alt-green-300"
              variant="link"
              onClick={() => {
                navigator.clipboard.writeText(fullAddress);
                toast('Dirección copiada en el portapapeles', {
                  duration: 1500,
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
    id: 'detalle',
    accessorKey: 'detalle',
    filterFn: detalleFilterFn,
    header: () => <div className="text-center">Detalle</div>,
    cell: ({ row }) => {
      const property = row.original;
      const { recamaras, sanitarios, estacionamientos } = property;
      return (
        <div className="flex-center text-sm min-w-[10rem]">
          <ul>
            <li>
              Recamaras:{' '}
              <span className="text-alt-green-300">{recamaras || '0'}</span>
            </li>
            <li>
              Sanitarios:{' '}
              <span className="text-alt-green-300">{sanitarios || '0'}</span>
            </li>
            <li>
              Estacionamientos:{' '}
              <span className="text-alt-green-300">
                {estacionamientos || '0'}
              </span>
            </li>
          </ul>
        </div>
      );
    },
  },
  {
    id: 'etapa',
    accessorKey: 'etapa',
    header: () => <div className="text-center min-w-[7rem]">Etapa</div>,
    cell: ({ row }) => {
      const property = row.original;
      return (
        <div className="flex-center">
          <Badge variant="altaltium">{property.etapa || 'Sin etapa'}</Badge>
        </div>
      );
    },
  },
  {
    id: 'lista',
    accessorKey: 'lista',
    header: 'Lista',
  },
  {
    id: 'valorAproximado',
    accessorKey: 'valorAproximado',
    header: 'Valor comercial',
    cell: ({ row }) => {
      const property = row.original;
      const { primerPago, segundoPago, etapa } = property;

      return (
        <div className="text-sm space-y-4">
          <div>
            <p>Primer pago:</p>
            <span className="text-alt-green-300">
              {formatToMxn(primerPago || 0)}
            </span>
          </div>

          {etapa?.toLowerCase() !== 'classic' && (
            <div>
              <p>Segundo pago:</p>
              <span className="text-alt-green-300">
                {formatToMxn(segundoPago || 0)}
              </span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    id: 'terreno',
    header: 'Terreno',
    cell: ({ row }) => {
      const property = row.original;
      const { terreno, construccion } = property;

      return (
        <div className="text-sm space-y-4">
          <div>
            <p>Total:</p>
            <span className="text-alt-green-300">{terreno}</span> m²
          </div>

          <div>
            <p>Contruido:</p>
            <span className="text-alt-green-300">{construccion}</span> m²
          </div>
        </div>
      );
    },
  },
  {
    id: 'acciones',
    header: () => <div className="flex-center">Acciones</div>,
    cell: ({ row }) => {
      const navigate = useNavigate();
      const { deleteMutation } = useInventoryMutations();

      const { inventoryId } = row.original;
      const handleDelete = () => {
        deleteMutation.mutateAsync(inventoryId);
      };

      return (
        <div className="px-2 flex-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigate(`/publicaciones/nueva/${inventoryId}`)}
              >
                Publicar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>
                Eliminar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Solicitar a marketing</DropdownMenuLabel>
              <DropdownMenuItem>Imagenes</DropdownMenuItem>
              <DropdownMenuItem>Fichas</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
