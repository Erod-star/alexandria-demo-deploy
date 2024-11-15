// ? Components
import { Separator, Skeleton } from '@/components';
import { PreviousInteractions } from './PreviousInteractions';

// ? Types
import type { Interaction } from '../types';
import type { Lead } from '@/modules/leads/types';

interface LeadIteracionsCardProps {
  lead?: Lead;
  interactions: Interaction[];
  isLoading: boolean;
}

export const LeadIteracionsCard = ({
  interactions,
  lead,
  isLoading,
}: LeadIteracionsCardProps) => {
  return (
    <div className="col-span-2 grid grid-cols-6 gap-4 border p-4 rounded-lg">
      <div className="col-span-6">
        <h3 className="text-2xl text-alt-green-300 font-semibold">Lead</h3>
        {isLoading ? (
          <Skeleton className="w-60 h-6 mt-1" />
        ) : (
          <p className="text-xl">{lead?.nombre}</p>
        )}
      </div>

      <div className="col-span-3">
        <p className="text-alt-green-300 font-semibold">Correo</p>
        {isLoading ? (
          <Skeleton className="w-full h-6 mt-1" />
        ) : (
          <span>{lead?.correo}</span>
        )}
      </div>

      <div className="col-span-3">
        <p className="text-alt-green-300 font-semibold">Telefono</p>
        {isLoading ? (
          <Skeleton className="w-full h-6 mt-1" />
        ) : (
          <span>{lead?.telefono}</span>
        )}
      </div>

      <div className="col-span-3">
        <p className="text-alt-green-300 font-semibold">Último contacto</p>
        {isLoading ? (
          <Skeleton className="w-full h-6 mt-1" />
        ) : (
          <span>10 - 11 - 2023</span>
        )}
      </div>

      <div className="col-span-3">
        <p className="text-alt-green-300 font-semibold">Medio de contacto</p>
        {isLoading ? (
          <Skeleton className="w-full h-6 mt-1" />
        ) : (
          <span>Whatsapp</span>
        )}
      </div>

      <Separator className="col-span-6 mt-3" />

      <div className="col-span-6">
        <PreviousInteractions
          interactions={interactions}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
