import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// ? Icons
import { Building2, Mail, MoreHorizontal, Phone } from 'lucide-react';

// ? Components
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components';

// ? Types
import type { Lead } from '../../types';
import { copyToClipboard } from '@/lib/utils';

export const leadsColumns: ColumnDef<Lead>[] = [
  {
    accessorKey: 'name',
    header: 'Lead',
    cell: ({ row }) => (
      <>
        <p className="font-semibold text-2xl">{row.original.nombre}</p>
        {row.original.createdAt && (
          <span className="text-sm text-alt-green-300">
            Lead desde el{' '}
            {format(row.original.createdAt, 'PPP', { locale: es })}
          </span>
        )}
      </>
    ),
  },
  {
    id: 'contact',
    accessorKey: 'email',
    header: 'Contacto',
    cell: ({ row }) => {
      const { correo, telefono } = row.original;

      return (
        <div className="mt-1">
          <Button
            className="flex items-center gap-2 mt-2 text-alt-green-300 px-2 py-0 h-6"
            size="sm"
            variant="link"
            onClick={() => {
              copyToClipboard({
                value: 'email',
                message: 'Correo copiado en el portapapeles',
              });
            }}
          >
            <Mail className="size-4 inline-block" />
            <span className="text-sm">{correo}</span>
          </Button>

          <Button
            className="flex items-center gap-2 mt-2 text-white px-2 py-0 h-6"
            size="sm"
            variant="link"
            onClick={() => {
              copyToClipboard({
                value: telefono,
                message: 'Teléfono copiado en el portapapeles',
              });
            }}
          >
            <Phone className="size-4 inline-block" />
            <span className="text-sm">{telefono}</span>
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: 'reason',
    header: 'Motivo',
    cell: ({ row }) => (
      <Badge className="bg-alt-green-300 text-alt-green-900">
        {row.original.tipoAnuncio}
      </Badge>
    ),
  },
  {
    id: 'properties',
    accessorKey: 'properties',
    header: () => <div className="text-center">Propiedades</div>,
    cell: ({ row }) => {
      const { announcements } = row.original;
      const hasAnnouncements = announcements && announcements.length > 0;
      return (
        <div className="flex-center">
          <Button
            disabled={!hasAnnouncements}
            size="icon"
            className="relative"
            onClick={() => row.toggleExpanded()}
          >
            <Building2 />
            {hasAnnouncements && (
              <div className="size-5 bg-red-600 text-white shadow-xl flex-center rounded-full absolute -top-2 -right-2">
                <p className="text-[0.7rem] font-semibold">
                  {announcements.length}
                </p>
              </div>
            )}
          </Button>
        </div>
      );
    },
  },
  {
    id: 'acciones',
    header: () => <div className="flex-center">Acciones</div>,
    cell: () => {
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
              <DropdownMenuItem>Editar</DropdownMenuItem>
              <DropdownMenuItem>Eliminar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
