import { useParams } from 'react-router-dom';

// ? Components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Empty,
  Separator,
} from '@/components';
import { ContactForm } from '@/modules/interactions/components';

// ? Hooks
import { useLead } from '@/modules/leads/hooks';

export const ContactView = () => {
  const params = useParams<{ id: string }>();
  const { lead, relatedInventories: leadInventories } = useLead({
    id: params.id,
  });

  return (
    <div className="flex h-full">
      <Card className="flex-grow h-full border-none">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="py-2">Detalles del contacto</CardTitle>
        </CardHeader>

        <CardContent className="w-screen md:w-auto">
          <div className="grid grid-cols-6 gap-5 relative">
            <div className="col-span-3 grid grid-cols-6 gap-y-4 border p-4 rounded-lg">
              <div className="col-span-6">
                <h3 className="text-2xl text-alt-green-300 font-semibold">
                  Lead
                </h3>
                <p className="text-xl">{lead?.nombre}</p>
              </div>

              <div className="col-span-3">
                <p className="text-alt-green-300 font-semibold">Correo</p>
                {lead?.correo}
              </div>

              <div className="col-span-3">
                <p className="text-alt-green-300 font-semibold">Telefono</p>
                <span>{lead?.telefono}</span>
              </div>

              <div className="col-span-3">
                <p className="text-alt-green-300 font-semibold">
                  Último contacto
                </p>
                <span>10 - 11 - 2023</span>
              </div>

              <div className="col-span-3">
                <p className="text-alt-green-300 font-semibold">
                  Medio de contacto
                </p>
                <span>Whatsapp</span>
              </div>

              <Separator className="col-span-6 mt-3" />

              <div className="col-span-6 space-y-5 pb-5">
                <h3 className="text-2xl text-alt-green-300 font-semibold">
                  Contactos previos
                </h3>

                <Empty
                  iconClassName="size-10"
                  description="Aún no hay contactos previos con este lead"
                />
              </div>
            </div>

            <div className="col-span-3 border p-4 rounded-lg space-y-5">
              <h3 className="text-2xl text-alt-green-300 font-semibold">
                Historial de conversaciones
              </h3>

              <Empty
                className="h-[20rem] flex-center flex-col"
                iconClassName="size-10"
                description="Aún no hay un historico de conversaciones con este lead"
              />
            </div>

            <div className="col-span-6 border p-4 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">
                Propiedades de interes del lead
              </h3>

              {/* {leadInventories.map((inventory) => (
                <InventoryDetailCard
                  key={inventory.inventoryId}
                  inventory={inventory}
                />
              ))} */}
            </div>

            <ContactForm className="col-span-6 border p-4 rounded-lg space-y-4" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactView;
