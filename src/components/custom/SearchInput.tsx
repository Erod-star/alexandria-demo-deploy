import * as React from 'react';

import { cn } from '@/lib/utils';

// ? Icons
import { Search } from 'lucide-react';

export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;

const SearchInput = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex h-10 items-center rounded-md border border-input bg-background pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2',
          className
        )}
      >
        <Search className="h-[16px] w-[16px]" />
        <input
          className="w-full p-2 bg-transparent placeholder:text-gray-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          type="search"
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Search.displayName = 'Search';

export { SearchInput };
