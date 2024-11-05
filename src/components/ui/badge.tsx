/* eslint-disable */
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        // ? Custom
        success:
          'bg-green-400 border-green-950 text-green-950 px-3 py-1 shadow-md',
        warning:
          'bg-amber-300 border-amber-800 text-amber-950 px-3 py-1 shadow-md',
        danger: 'bg-red-400 border-red-950 text-black px-3 py-1 shadow-md',
        base: '',
        // ? Departments
        altaltium:
          'bg-alt-green-300 text-black border-alt-green-600 shadow-sm px-3 py-1',
      },
    },
    defaultVariants: {
      variant: 'base',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
