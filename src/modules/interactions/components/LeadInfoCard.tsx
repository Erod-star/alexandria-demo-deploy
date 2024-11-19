// ? Utils
import { cn } from '@/lib/utils';

// ? Components
import { Skeleton } from '@/components';

// ? Types
import type { Lead } from '@/modules/leads/types';

interface LeadIteracionsCardProps {
  lead?: Lead;
  isLoading: boolean;
  className?: string;
}

export const LeadIteracionsCard = ({
  lead,
  isLoading,
  className,
}: LeadIteracionsCardProps) => {
  return (
    <div className={cn('border p-4 rounded-lg space-y-4', className)}>
      <div>
        <h3 className="text-2xl text-alt-green-300 font-semibold">Lead</h3>
        {isLoading ? (
          <Skeleton className="w-60 h-6 mt-1" />
        ) : (
          <p className="text-xl">{lead?.nombre}</p>
        )}
      </div>

      <div>
        <p className="text-alt-green-300 font-semibold">Correo</p>
        {isLoading ? (
          <Skeleton className="w-full h-6 mt-1" />
        ) : (
          <span>{lead?.correo}</span>
        )}
      </div>

      <div>
        <p className="text-alt-green-300 font-semibold">Telefono</p>
        {isLoading ? (
          <Skeleton className="w-full h-6 mt-1" />
        ) : (
          <span>{lead?.telefono}</span>
        )}
      </div>

      <div>
        <p className="text-alt-green-300 font-semibold">Último contacto</p>
        {isLoading ? (
          <Skeleton className="w-full h-6 mt-1" />
        ) : (
          <span>10 - 11 - 2023</span>
        )}
      </div>

      <div>
        <p className="text-alt-green-300 font-semibold">Medio de contacto</p>
        {isLoading ? (
          <Skeleton className="w-full h-6 mt-1" />
        ) : (
          <span>Whatsapp</span>
        )}
      </div>
    </div>
  );
};
