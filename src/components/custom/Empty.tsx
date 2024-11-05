// ? Utils
import { cn } from '@/lib/utils';

// ? Icons
import { CircleAlert } from 'lucide-react';

interface EmptyProps {
  description?: string;
  header?: string;
  className?: string;
  children?: React.ReactNode;
}

export const Empty = ({
  description = 'No se encontraron resultados para este recurso',
  header = 'Sin resultados',
  className = '',
  children,
}: EmptyProps) => {
  return (
    <div className="flex-center">
      <div
        className={cn(
          `m-8 text-center p-12 rounded-sm bg-gray-600 border border-white`,
          className
        )}
      >
        <div className="flex-center mb-2">
          <CircleAlert className="size-[100px]" />
        </div>
        <h2 className="text-2xl font-bold">{header}</h2>
        {children ? children : <p>{description}</p>}
      </div>
    </div>
  );
};
