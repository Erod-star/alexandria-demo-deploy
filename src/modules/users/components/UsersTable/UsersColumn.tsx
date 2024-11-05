import { useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';

// ? Icons
import { ArrowUpDown, Mail, MoreHorizontal, Phone } from 'lucide-react';

// ? Components
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components';

import { Rewards, Rating } from '@/modules/users/components';

// ? Types
import type { Row, FilterFn } from '@tanstack/react-table';
import type { User } from '@/modules/users/types';

const customFilterFn: FilterFn<User> = (
  row: Row<User>,
  _: string,
  filterValue: any
) => {
  filterValue = filterValue.toLowerCase();

  const { nombre, apellido, correoPersonal, telefono } = row.original;
  const nombreTag = nombre.toLowerCase();
  const apellidoTag = apellido.toLowerCase();
  const correoPersonalTag = correoPersonal.toLowerCase();
  const telefonoTag = telefono.toLowerCase();

  const filterParts = filterValue.split(' ');
  const rowValues = `${nombreTag} ${apellidoTag} ${correoPersonalTag} ${telefonoTag}`;

  return filterParts.every((partial: string) => rowValues.includes(partial));
};

export const usersColumns: ColumnDef<User>[] = [
  {
    id: 'fotoDePerfil',
    header: '',
    cell: ({ row }) => {
      const { nombre, apellido } = row.original;
      return (
        <div className="flex-center">
          <Avatar className="size-20 border-2 border-primary shadow-sm">
            <AvatarImage src="sdfsdfds" alt={nombre} />
            <AvatarFallback className="text-black">
              {nombre[0] + apellido[0]}
            </AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },
  {
    id: 'detalle',
    accessorKey: 'nombre',
    filterFn: customFilterFn,
    header: ({ column }) => {
      return (
        <Button
          className="text-lg"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { nombre, apellido, telefono, correoPersonal } = row.original;

      return (
        <>
          <p className="font-semibold text-2xl px-2">
            {nombre} {apellido}
          </p>

          <div>
            <Button
              className="flex items-center gap-2 mt-2 text-alt-green-300 px-2 py-0 h-6"
              size="sm"
              variant="link"
              onClick={() => {
                navigator.clipboard.writeText(correoPersonal);
                toast('Correo copiado en el portapapeles', {
                  duration: 1500,
                });
              }}
            >
              <Mail className="size-3 inline-block" />
              <span className="text-sm">{correoPersonal}</span>
            </Button>

            <Button
              className="flex items-center gap-2 text-white px-2 py-0 h-6"
              size="sm"
              variant="link"
              onClick={() => {
                navigator.clipboard.writeText(telefono);
                toast('Teléfono copiado en el portapapeles', {
                  duration: 1500,
                });
              }}
            >
              <Phone className="size-3 inline-block" />
              <span className="text-sm">{telefono}</span>
            </Button>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: 'rol',
    header: 'Rol',
    cell: ({ row }) => (
      <Badge className="capitalize" variant="altaltium">
        {row.original.rol}
      </Badge>
    ),
  },
  {
    accessorKey: 'recompensas',
    header: 'Recompensas',
    cell: ({ row }) => <Rewards rewards={row.original.recompensas !== null} />,
  },
  {
    accessorKey: 'calificacion',
    header: 'Calificación',
    cell: ({ row }) => <Rating rating={row.original.calificacion || 0} />,
  },
  {
    id: 'acciones',
    header: 'Acciones',
    cell: ({ row }) => {
      const { userId } = row.original;
      const navigate = useNavigate();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigate(`editar/${userId}`)}>
              Editar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
