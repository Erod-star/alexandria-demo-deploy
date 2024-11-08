// ? Utils
import { cn } from '@/lib/utils';

// ? Components
import { Badge, Empty } from '@/components';

// ? Types
import type { Inventory } from '../../types';

interface InventoryDetailCardProps {
  inventory?: Inventory;
  isLoading?: boolean;
  className?: string;
}

export const InventoryDetailCard = ({
  inventory,
  isLoading,
  className,
}: InventoryDetailCardProps) => {
  return (
    <div
      className={cn(
        'border rounded-md p-4 shadow-lg shadow-slate-700/45',
        className
      )}
    >
      {isLoading && <div>Loading...</div>}

      {inventory && !isLoading ? (
        <div className="grid grid-cols-10 gap-5">
          {/* // ? Nombre y status, folio? */}
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

          {/* // ? Imagenes y detalles (habitaciones, baños, estacionamientos) */}
          <div className="col-span-8 h-[25rem] flex flex-col gap-[0.5rem]">
            <div className="h-[20rem] bg-alt-green-600 w-full rounded-md" />
            <div className="h-[4.5rem] gap-3 flex">
              <div className=" bg-alt-green-600 w-1/3 rounded-md" />
              <div className=" bg-alt-green-600 w-1/3 rounded-md" />
              <div className=" bg-alt-green-600 w-1/3 rounded-md" />
            </div>
          </div>

          <div className="col-span-2 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p className="text-alt-green-300 text-center">Baños</p>
              <Badge className="mx-4 flex-center" variant="altaltium">
                {inventory.sanitarios}
              </Badge>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-alt-green-300 text-center">Habitaciones</p>
              <Badge className="mx-4 flex-center" variant="altaltium">
                {inventory.recamaras}
              </Badge>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-alt-green-300 text-center">Estacionamientos</p>
              <Badge className="mx-4 flex-center" variant="altaltium">
                {inventory.estacionamientos}
              </Badge>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-alt-green-300 text-center">Valor comercial</p>
              <Badge className="mx-4 flex-center" variant="altaltium">
                {inventory.primerPago}
              </Badge>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-alt-green-300 text-center">Valor remate</p>
              <Badge className="mx-4 flex-center" variant="altaltium">
                {inventory.segundoPago || 'N/A'}
              </Badge>
            </div>
          </div>

          {/* // ? Direccion */}
          <div className="col-span-6 overflow-hidden">
            <p className="text-alt-green-300">Calle y número</p>
            <span className="overflow-hidden truncate">
              Texto exageradamente largo para validar que la clase sea buena
            </span>
            {/* <span className="truncate">{inventory.calleYNumero}</span> */}
          </div>

          <div className="col-span-4">
            <p className="text-alt-green-300">Colonia</p>
            <span>{inventory.colonia}</span>
          </div>

          <div className="col-span-4">
            <p className="text-alt-green-300">Estado</p>
            <span>{inventory.estado}</span>
          </div>

          <div className="col-span-4">
            <p className="text-alt-green-300">Alcaldía / Municipio</p>
            <span>{inventory.municipio}</span>
          </div>

          <div className="col-span-2">
            <p className="text-alt-green-300">Código postal</p>
            <span>{inventory.cp}</span>
          </div>
        </div>
      ) : (
        <div className="h-full flex-center">
          <Empty header="¡Error!">
            No se encontro un inventario para ese id
          </Empty>
        </div>
      )}
    </div>
  );
};
