import { useNavigate } from 'react-router-dom';

// ? Components
import {
  Button,
  Card,
  TableSkeleton,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components';
import {
  inventoryColumns,
  InventoryTable,
} from '@/modules/inventory/components';

// ? Hooks
import { useInventories } from '../hooks';

function InventoryView() {
  const navigate = useNavigate();
  const { inventories, isLoading } = useInventories();

  return (
    <div className="flex h-full">
      <Card className="flex-grow h-full border-none ">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Inventario</CardTitle>

          <Button
            className="text-base font-semibold"
            onClick={() => navigate('/inventario/nuevo')}
          >
            + Propiedad
          </Button>
        </CardHeader>

        <CardContent className="w-screen md:w-auto md:overflow-auto">
          {isLoading ? (
            <TableSkeleton amountOfFilters={3} />
          ) : (
            <InventoryTable columns={inventoryColumns} data={inventories} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default InventoryView;
