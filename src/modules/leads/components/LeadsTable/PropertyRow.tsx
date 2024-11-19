// ? Utils
import { copyToClipboard } from '@/lib/utils';

// ? Components
import { Badge } from '@/components';

// ? Types
import type { Announcement } from '@/modules/announcements/types';
import { Copy } from 'lucide-react';

interface PropertyRowProps {
  announcement: Announcement;
}

export const PropertyRow = ({ announcement }: PropertyRowProps) => {
  return (
    <div>
      <div className="flex justify-around border p-5 rounded-md">
        <div
          className="space-y-2 text-center group cursor-pointer"
          onClick={() =>
            copyToClipboard({
              value: announcement.proppitId,
              message: 'Id de Proppit copiada en el portapapeles',
            })
          }
        >
          <div className="flex-center gap-3 group-hover:text-alt-green-300">
            <p className="font-semibold">Id Proppit</p>
            <Copy className="mt-1 size-3" />
          </div>

          <Badge
            className="group-hover:bg-alt-green-300/55"
            variant="altaltium"
          >
            {announcement.proppitId}
          </Badge>
        </div>

        <div
          className="space-y-2 text-center group cursor-pointer"
          onClick={() =>
            copyToClipboard({
              value: announcement.inmueblesId,
              message: 'Id de Inmuebles24 copiada en el portapapeles',
            })
          }
        >
          <div className="flex-center gap-3 group-hover:text-alt-green-300">
            <p className="font-semibold">Id Inmuebles24</p>
            <Copy className="mt-1 size-3" />
          </div>

          <Badge
            className="group-hover:bg-alt-green-300/55"
            variant="altaltium"
          >
            {announcement.inmueblesId}
          </Badge>
        </div>

        <div
          className="space-y-2 text-center group cursor-pointer"
          onClick={() =>
            copyToClipboard({
              value: announcement.meliId,
              message: 'Id de Mercado libre copiada en el portapapeles',
            })
          }
        >
          <div className="flex-center gap-3 group-hover:text-alt-green-300">
            <p className="font-semibold">Id Mercado libre</p>
            <Copy className="mt-1 size-3" />
          </div>

          <Badge
            className="group-hover:bg-alt-green-300/55"
            variant="altaltium"
          >
            {announcement.meliId}
          </Badge>
        </div>
      </div>

      {announcement.inventory && (
        <div className="mt-3 grid grid-cols-5 gap-5 gap-y-7 p-5">
          <div className="flex flex-col col-span-4 gap-2">
            <p className="text-xl font-semibold text-alt-green-300">
              {announcement.inventory.calleYNumero}
            </p>
            <Badge className="w-24 h-7 flex-center" variant="altaltium">
              Pendiente
            </Badge>
          </div>

          <div className="col-span-1 justify-items-end text-muted-foreground">
            <p>Folio: #{announcement.inventory.folioOriginal}</p>
          </div>

          <div className="col-span-2 overflow-hidden">
            <p className="text-alt-green-300">Calle y número</p>
            <span className="truncate">
              {announcement.inventory.calleYNumero}
            </span>
          </div>

          <div className="col-span-2">
            <p className="text-alt-green-300">Colonia</p>
            <span>{announcement.inventory.colonia}</span>
          </div>

          <div className="col-span-1">
            <p className="text-alt-green-300">Estado</p>
            <span>{announcement.inventory.estado}</span>
          </div>

          <div className="col-span-2">
            <p className="text-alt-green-300">Colonia</p>
            <span>{announcement.inventory.colonia}</span>
          </div>

          <div className="col-span-3 overflow-hidden">
            <p className="text-alt-green-300">Alcaldía / Municipio</p>
            <span className="truncate">{announcement.inventory.municipio}</span>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-alt-green-300 text-center">Baños</p>
            <Badge className="mx-4 flex-center" variant="altaltium">
              {announcement.inventory.sanitarios}
            </Badge>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-alt-green-300 text-center">Habitaciones</p>
            <Badge className="mx-4 flex-center" variant="altaltium">
              {announcement.inventory.recamaras}
            </Badge>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-alt-green-300 text-center">Estacionamientos</p>
            <Badge className="mx-4 flex-center" variant="altaltium">
              {announcement.inventory.estacionamientos}
            </Badge>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-alt-green-300 text-center">Valor comercial</p>
            <Badge className="mx-4 flex-center" variant="altaltium">
              {announcement.inventory.primerPago}
            </Badge>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-alt-green-300 text-center">Valor remate</p>
            <Badge className="mx-4 flex-center" variant="altaltium">
              {announcement.inventory.segundoPago || 'N/A'}
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};
