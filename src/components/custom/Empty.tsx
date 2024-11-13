// ? Utils
import { cn } from '@/lib/utils';

// ? Icons
import { CircleAlert } from 'lucide-react';

interface EmptyProps {
  children?: React.ReactNode;
  className?: string;
  description?: string;
  header?: string;
  iconClassName?: string;
}

export const Empty = ({
  description = 'No se encontraron resultados para este recurso',
  header = 'Sin resultados',
  className = '',
  children,
  iconClassName,
}: EmptyProps) => {
  return (
    <div className="flex-center">
      <div
        className={cn(
          'text-center p-12 rounded-sm bg-gray-600 border border-white',
          className
        )}
      >
        <div className="flex-center mb-2">
          <CircleAlert className={cn('size-[100px]', iconClassName)} />
        </div>
        <h2 className="text-2xl font-bold">{header}</h2>
        {children ? children : <p>{description}</p>}
      </div>
    </div>
  );
};
