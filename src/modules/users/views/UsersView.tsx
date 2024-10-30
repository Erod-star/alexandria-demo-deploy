import { useNavigate } from 'react-router-dom';

// ? Components
import { Button, TableSkeleton } from '@/components';
import { usersColumns, UsersTable } from '../components';

// ? Hooks
import { useUsers } from '../hooks';

function UsersView() {
  const navigate = useNavigate();
  const { users, isLoading } = useUsers();

  return (
    <div className="h-full">
      <section className="flex justify-between">
        <h2 className="text-4xl font-bold">Usuarios</h2>

        <Button
          className="text-base font-semibold"
          onClick={() => navigate('/usuarios/nuevo')}
        >
          + Usuario
        </Button>
      </section>

      <div className="pb-6">
        {isLoading ? (
          <TableSkeleton amountOfFilters={1} />
        ) : (
          <UsersTable columns={usersColumns} data={users} />
        )}
      </div>
    </div>
  );
}

export default UsersView;
