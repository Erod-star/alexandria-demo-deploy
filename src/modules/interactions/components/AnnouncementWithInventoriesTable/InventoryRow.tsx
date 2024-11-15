// ? Types
import type { Inventory } from '@/modules/inventory/types';

// ? Types
interface InventoryRowProps {
  inventory: Inventory;
}

export const InventoryRow = ({ inventory }: InventoryRowProps) => {
  return <div>{inventory.calleYNumero}</div>;
};
