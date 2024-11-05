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
      {value ? (
        <span className="text-alt-green-300">{value}</span>
      ) : (
        <span className="text-red-400">No establecido</span>
      )}
    </div>
  );
};
