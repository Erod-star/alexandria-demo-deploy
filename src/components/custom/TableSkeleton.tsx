// ? Components
import { Table, TableHeader, TableRow } from '../ui/table';
import { Skeleton } from '../ui/skeleton';

export const TableSkeleton = () => {
  return (
    <div className="mt-4">
      <div className="flex gap-4">
        <Skeleton className="mt-4 h-10 w-[25rem]" />

        <div>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-44 mt-2" />
        </div>

        <div>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-44 mt-2" />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {[...Array(9)].map((_, index) => (
              <Skeleton key={index} className="mt-2 h-14 w-full" />
            ))}
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  );
};
