// ? Utils
import { cn } from '@/lib/utils';

// ? Icons
import { Loader } from 'lucide-react';

interface LoadingSpinnerProps {
  height?: string;
  width?: string;
  className?: string;
  role?: string;
  dataTestId?: string;
}

export const ScreenLoadingSpinner = ({
  width = '3rem',
  height = '3rem',
  className = '',
  role = 'status',
  dataTestId = 'screen-loading-spinner',
}: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center justify-center h-screen loader-modifier">
      <Loader
        role={role}
        className={cn('animate-spin', className)}
        width={width}
        height={height}
        data-testid={dataTestId}
      />
    </div>
  );
};

export const LoadingSpinner = ({
  width = '3rem',
  height = '3rem',
  className = '',
  role = 'status',
  dataTestId = 'loading-spinner',
}: LoadingSpinnerProps) => {
  return (
    <Loader
      role={role}
      className={cn('animate-spin', className)}
      width={width}
      height={height}
      data-testid={dataTestId}
    />
  );
};
