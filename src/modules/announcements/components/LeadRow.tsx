import { useNavigate } from 'react-router-dom';

// ? Icons
import { Mail } from 'lucide-react';

// ? Components
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components';

// ? Types
import type { Lead } from '@/modules/leads/types';

interface LeadRowProps {
  lead: Lead;
}

export const LeadRow = ({ lead }: LeadRowProps) => {
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Lead</TableHead>
          <TableHead>Medio de contacto</TableHead>
          <TableHead>Fecha de contacto</TableHead>
          <TableHead>Telefono</TableHead>
          <TableHead>Correo</TableHead>
          <TableHead>Estatus</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell>{lead.nombre}</TableCell>
          <TableCell>Whatsapp</TableCell>
          <TableCell>{lead.fechaContacto}</TableCell>
          <TableCell>{lead.telefono}</TableCell>
          <TableCell>{lead.correo}</TableCell>
          <TableCell>Por contactar</TableCell>
          <TableCell>
            <Button size="icon" onClick={() => navigate('/')}>
              <Mail />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
