import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';

// ? Components
import { Badge, Button } from '@/components';

// ? Types
import type { Lead } from '../../types';
import { Mail, Phone } from 'lucide-react';

export const leadsColumns: ColumnDef<Lead>[] = [
  {
    accessorKey: 'name',
    header: 'Lead',
    cell: ({ row }) => {
      const { name, since } = row.original;
      return (
        <>
          <p className="font-semibold text-2xl">{name}</p>
          <span className="text-sm text-alt-green-300">Lead desde {since}</span>
        </>
      );
    },
  },
  {
    id: 'contact',
    accessorKey: 'email',
    header: 'Contacto',
    cell: ({ row }) => {
      const { email } = row.original;
      return (
        <div className="mt-1">
          <Button
            className="flex items-center gap-2 mt-2 text-alt-green-300 px-2 py-0 h-6"
            size="sm"
            variant="link"
            onClick={() => {
              navigator.clipboard.writeText(email);
              toast.info('Correo copiado en el portapapeles', {
                duration: 1500,
              });
            }}
          >
            <Mail className="size-4 inline-block" />
            <span className="text-sm">{email}</span>
          </Button>

          <Button
            className="flex items-center gap-2 mt-2 text-white px-2 py-0 h-6"
            size="sm"
            variant="link"
            onClick={() => {
              navigator.clipboard.writeText('312 133 5555');
              toast.info('Teléfono copiado en el portapapeles', {
                duration: 1500,
              });
            }}
          >
            <Phone className="size-4 inline-block" />
            <span className="text-sm">312 133 5555</span>
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: 'reason',
    header: 'Motivo',
    cell: ({ row }) => {
      const { reason } = row.original;
      return (
        <Badge className="bg-alt-green-300 text-alt-green-900">{reason}</Badge>
      );
    },
  },
  {
    id: 'properties',
    accessorKey: 'properties',
    header: 'Propiedades',
    cell: ({ row }) => {
      const lead = row.original;
      if (lead.properties.length === 0) {
        return <p>Sin propiedades</p>;
      }
      return <Button>{lead.properties.length} Propiedades</Button>;
    },
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: () => {
      <Button>+</Button>;
    },
  },
];
