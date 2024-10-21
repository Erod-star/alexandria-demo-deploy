import { cn } from '@/lib/utils';

interface WizardOverviewDetailItemProps {
  header: string;
  value: string | number | null;
  className?: string;
}

export const WizardOverviewDetailItem = ({
  header,
  value,
  className = '',
}: WizardOverviewDetailItemProps) => {
  return (
    <div className={cn('border p-3 rounded-md', className)}>
      <p className="text-base font-semibold">{header}</p>
      <span className="text-alt-green-300">
        {value ? value : 'No establecido'}
      </span>
    </div>
  );
};
