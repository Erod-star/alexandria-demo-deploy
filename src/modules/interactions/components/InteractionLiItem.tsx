import { format } from 'date-fns';

// ? Types
import type { Interaction } from '../types';
import { cn } from '@/lib/utils';

interface InteractionLiItemProps {
  interaction: Interaction;
}

export const InteractionLiItem = ({ interaction }: InteractionLiItemProps) => {
  return (
    <li>
      <p className="text-alt-green-300">
        {format(interaction.interactionDate, 'dd/MM/yyyy')}
      </p>
      <span
        className={cn(
          'text-lg font-semibold',
          interaction.interactionStatus ? 'text-green-500' : 'text-red-500'
        )}
      >
        {interaction.interactionStatus ? 'Se contacto' : 'No se contacto'}
      </span>
      <p>{interaction.interactionNotes}</p>
    </li>
  );
};
