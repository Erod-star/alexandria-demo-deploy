import { useNavigate } from 'react-router-dom';

// ? Components
import { Button, TableSkeleton } from '@/components';
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
    <div className="h-full">
      <section className="flex justify-between">
        <h2 className="text-4xl font-bold">Inventario</h2>

        <Button
          className="text-base font-semibold"
          onClick={() => navigate('/inventario/nuevo')}
        >
          + Propiedad
        </Button>
      </section>

      <div className="pb-6">
        {/* // TODO: Añadir loader  */}
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <InventoryTable columns={inventoryColumns} data={inventories} />
        )}
      </div>
    </div>
  );
}

export default InventoryView;
