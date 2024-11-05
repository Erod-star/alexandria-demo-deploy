// ? Components
import { Skeleton } from '../ui/skeleton';

interface TableSkeletonProps {
  amountOfFilters?: number;
  needsFilters?: boolean;
}

export const TableSkeleton = ({
  amountOfFilters = 2,
  needsFilters = true,
}: TableSkeletonProps) => {
  return (
    <div className="mt-4">
      {needsFilters && (
        <>
          <div className="md:max-w-[50rem]">
            <Skeleton className="h-4 w-2/3 md:w-72" />
            <Skeleton className="mt-2 h-10 w-full" />
          </div>

          <div className="my-5 grid grid-cols-2 gap-5 md:flex">
            {[...Array(amountOfFilters)].map((_, index) => (
              <div key={index}>
                <Skeleton className="h-4 w-2/3 md:w-32" />
                <Skeleton className="mt-2 h-8 w-full md:w-44" />
              </div>
            ))}
          </div>
        </>
      )}

      {[...Array(4)].map((_, index) => (
        <Skeleton key={index} className="mt-3 h-14 w-full" />
      ))}
      <div className="[mask-image:linear-gradient(transparent,white_0%,white_45%,transparent)]">
        <Skeleton className="mt-3 h-14 w-full border-b-0" />
      </div>
    </div>
  );
};
