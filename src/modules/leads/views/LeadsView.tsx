import { useNavigate } from 'react-router-dom';

// ? Components
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  TableSkeleton,
} from '@/components';
import { leadsColumns, LeadsTable } from '@/modules/leads/components';

// ? Hooks
import { useLeads } from '../hooks';

function LeadsView() {
  const navigate = useNavigate();

  const { leads, isLoading } = useLeads();

  return (
    <div className="flex h-full">
      <Card className="flex-grow h-full border-none">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Leads</CardTitle>

          <Button
            className="text-base font-semibold"
            onClick={() => navigate('/leads/nuevo')}
          >
            + Lead
          </Button>
        </CardHeader>

        <CardContent className="w-screen md:w-auto md:overflow-auto">
          {isLoading ? (
            <TableSkeleton amountOfFilters={0} />
          ) : (
            <LeadsTable columns={leadsColumns} data={leads} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default LeadsView;
