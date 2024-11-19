import { useNavigate } from 'react-router-dom';

// ? Icons
import { MoreHorizontal } from 'lucide-react';

// ? Components
import {
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

interface ActionsCellProps {
  inventoryId: string;
}

export const ActionsCell = ({ inventoryId }: ActionsCellProps) => {
  const navigate = useNavigate();
  const { deleteMutation } = useInventoryMutations();

  const handleDelete = () => {
    deleteMutation.mutateAsync(inventoryId);
  };

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
        <DropdownMenuItem
          onClick={() => navigate(`/publicaciones/nueva/${inventoryId}`)}
        >
          Publicar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>Eliminar</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Solicitar a marketing</DropdownMenuLabel>
        <DropdownMenuItem>Imagenes</DropdownMenuItem>
        <DropdownMenuItem>Fichas</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
