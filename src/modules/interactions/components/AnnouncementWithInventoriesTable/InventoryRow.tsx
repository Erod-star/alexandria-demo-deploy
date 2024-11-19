// ? Components
import { Badge } from '@/components';

// ? Types
import type { Inventory } from '@/modules/inventory/types';

// ? Types
interface InventoryRowProps {
  inventory: Inventory;
}

export const InventoryRow = ({ inventory }: InventoryRowProps) => {
  return (
    <div className="grid grid-cols-10 gap-5 gap-y-7">
      <div className="flex flex-col col-span-8 gap-2">
        <p className="text-xl font-semibold text-alt-green-300">
          {inventory.calleYNumero}
        </p>
        <Badge className="w-24 h-7 flex-center" variant="altaltium">
          Pendiente
        </Badge>
      </div>

      <div className="col-span-2 justify-items-end text-muted-foreground">
        <p>Folio: #{inventory.folioOriginal}</p>
      </div>

      <div className="col-span-4 overflow-hidden">
        <p className="text-alt-green-300">Calle y número</p>
        <span className="truncate">{inventory.calleYNumero}</span>
      </div>

      <div className="col-span-4">
        <p className="text-alt-green-300">Colonia</p>
        <span>{inventory.colonia}</span>
      </div>

      <div className="col-span-2">
        <p className="text-alt-green-300">Estado</p>
        <span>{inventory.estado}</span>
      </div>

      <div className="col-span-4">
        <p className="text-alt-green-300">Alcaldía / Municipio</p>
        <span>{inventory.municipio}</span>
      </div>

      <div className="col-span-6">
        <p className="text-alt-green-300">Código postal</p>
        <span>{inventory.cp}</span>
      </div>

      <div className="flex flex-col gap-2 col-span-2">
        <p className="text-alt-green-300 text-center">Baños</p>
        <Badge className="mx-4 flex-center" variant="altaltium">
          {inventory.sanitarios}
        </Badge>
      </div>

      <div className="flex flex-col gap-2 col-span-2">
        <p className="text-alt-green-300 text-center">Habitaciones</p>
        <Badge className="mx-4 flex-center" variant="altaltium">
          {inventory.recamaras}
        </Badge>
      </div>

      <div className="flex flex-col gap-2 col-span-2">
        <p className="text-alt-green-300 text-center">Estacionamientos</p>
        <Badge className="mx-4 flex-center" variant="altaltium">
          {inventory.estacionamientos}
        </Badge>
      </div>

      <div className="flex flex-col gap-2 col-span-2">
        <p className="text-alt-green-300 text-center">Valor comercial</p>
        <Badge className="mx-4 flex-center" variant="altaltium">
          {inventory.primerPago}
        </Badge>
      </div>

      <div className="flex flex-col gap-2 col-span-2">
        <p className="text-alt-green-300 text-center">Valor remate</p>
        <Badge className="mx-4 flex-center" variant="altaltium">
          {inventory.segundoPago || 'N/A'}
        </Badge>
      </div>
    </div>
  );
};
