// ? Components
import { Skeleton } from '../ui/skeleton';

interface TableSkeletonProps {
  amountOfFilters?: number;
}

export const TableSkeleton = ({ amountOfFilters = 2 }: TableSkeletonProps) => {
  return (
    <div className="mt-4">
      <Skeleton className="mt-4 h-10 w-[50rem]" />

      <div className="my-5 flex gap-4">
        {[...Array(amountOfFilters)].map((_, index) => (
          <div key={index}>
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-44 mt-2" />
          </div>
        ))}
      </div>

      {[...Array(9)].map((_, index) => (
        <Skeleton key={index} className="mt-3 h-14 w-full" />
      ))}
    </div>
  );
};
