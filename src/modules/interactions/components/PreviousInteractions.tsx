import { format } from 'date-fns';

// ? Utils
import { cn } from '@/lib/utils';

// ? Components
import { Empty, Skeleton } from '@/components';

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
  isLoading,
}: PreviousInteractionsProps) => {
  return (
    <div className={cn('', className)}>
      <h3 className="text-2xl text-alt-green-300 font-semibold mb-3">
        Contactos previos
      </h3>

      {isLoading ? (
        <ul className="space-y-3">
          {[...Array(4)].map((_, index) => (
            <li key={index}>
              <Skeleton
                className={`${index % 2 === 0 ? 'w-full' : 'w-2/3'} h-6`}
              />
            </li>
          ))}
        </ul>
      ) : (
        <>
          {interactions.length > 0 ? (
            <ul className="overflow-y-auto max-h-[10rem] space-y-3">
              {interactions.map((interaction) => (
                <li key={interaction.interactionId}>
                  <p className="text-alt-green-300 flex gap-5">
                    {format(interaction.interactionDate, 'dd/MM/yyyy')}
                    <span className="text-white">
                      {interaction.interactionStatus
                        ? 'Se contacto'
                        : 'No se contacto'}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <Empty
              iconClassName="size-10"
              description="Aún no hay contactos previos con este lead"
            />
          )}
        </>
      )}
    </div>
  );
};
