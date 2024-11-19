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
import { usersColumns, UsersTable } from '../components';

// ? Hooks
import { useUsers } from '../hooks';

function UsersView() {
  const navigate = useNavigate();
  const { users, isLoading } = useUsers();

  return (
    <div className="flex h-full">
      <Card className="flex-grow h-full border-none">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Usuarios</CardTitle>

          <Button
            className="text-base font-semibold"
            onClick={() => navigate('/usuarios/nuevo')}
          >
            + Usuario
          </Button>
        </CardHeader>

        <CardContent className="w-screen md:w-auto">
          {isLoading ? (
            <TableSkeleton amountOfFilters={1} />
          ) : (
            <UsersTable columns={usersColumns} data={users} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default UsersView;
