// ? Utils
import { cn } from '@/lib/utils';

// ? Components
import { Empty } from '@/components';
import { InteractionLiItem } from './InteractionLiItem';

// ? Types
import type { Interaction } from '../types';

interface PreviousInteractionsProps {
  className?: string;
  interactions: Interaction[];
  isLoading: boolean;
}

export const PreviousInteractions = ({
  interactions,
  className,
}: PreviousInteractionsProps) => {
  return (
    <div className={cn('', className)}>
      <h3 className="text-2xl text-alt-green-300 font-semibold mb-3">
        Contactos previos
      </h3>

      <>
        {interactions.length > 0 ? (
          <ul className="overflow-y-auto space-y-5 max-h-[20rem]">
            {interactions.map((interaction) => (
              <InteractionLiItem
                key={interaction.interactionId}
                interaction={interaction}
              />
            ))}
          </ul>
        ) : (
          <Empty
            iconClassName="size-10"
            description="Aún no hay contactos previos con este lead"
          />
        )}
      </>
    </div>
  );
};
