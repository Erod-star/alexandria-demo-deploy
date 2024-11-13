import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components';
import { Mail } from 'lucide-react';

export const ContactView = () => {
  return (
    <div className="flex h-full">
      <Card className="flex-grow h-full border-none">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="py-2">Detalles del contacto</CardTitle>
        </CardHeader>

        <CardContent className="w-screen md:w-auto">
          <div className="grid grid-cols-6 gap-5 relative">
            <div className="col-span-3 grid grid-cols-6 gap-y-6 border p-4 rounded-lg">
              <div className="col-span-6">
                <h3 className="text-2xl text-alt-green-300 font-semibold">
                  Lead
                </h3>
                <p className="text-xl">Edson Rodriguez</p>

                <Button
                  className="flex items-center gap-2 text-white px-0"
                  variant="link"
                >
                  <Mail className="size-5" />
                  <span>edson@gmail.com</span>
                </Button>
              </div>

              <div className="col-span-2">
                <p className="text-alt-green-300 font-semibold">Telefono</p>
                <span>+52 3121135597</span>
              </div>

              <div className="col-span-2">
                <p className="text-alt-green-300 font-semibold">
                  Último contacto
                </p>
                <span>10 - 11 - 2023</span>
              </div>

              <div className="col-span-2">
                <p className="text-alt-green-300 font-semibold">
                  Medio de contacto
                </p>
                <span>Whatsapp</span>
              </div>
            </div>

            <div className=" col-span-3 border p-4 rounded-lg">
              <h3 className="text-2xl text-alt-green-300 font-semibold">
                Historial de conversaciones
              </h3>
            </div>

            <div className=" col-span-3 border p-4 rounded-lg">
              <h3 className="text-2xl text-alt-green-300 font-semibold">
                Contactos previos
              </h3>
            </div>

            <div className=" col-span-3 border p-4 rounded-lg">
              <h3 className="text-2xl text-alt-green-300 font-semibold">
                Detalles de la llamada
              </h3>
            </div>

            <div className="col-span-6 border p-4 rounded-lg">
              <h3 className="text-2xl text-alt-green-300 font-semibold">
                Propiedades de interes del lead
              </h3>
            </div>
            <div className="col-span-6 border p-4 rounded-lg">
              <h3 className="text-2xl text-alt-green-300 font-semibold">
                Propiedades de interes del lead
              </h3>
            </div>
            <div className="col-span-6 border p-4 rounded-lg">
              <h3 className="text-2xl text-alt-green-300 font-semibold">
                Propiedades de interes del lead
              </h3>
            </div>
            <div className="col-span-6 border p-4 rounded-lg">
              <h3 className="text-2xl text-alt-green-300 font-semibold">
                Propiedades de interes del lead
              </h3>
            </div>
            <div className="col-span-6 border p-4 rounded-lg">
              <h3 className="text-2xl text-alt-green-300 font-semibold">
                Propiedades de interes del lead
              </h3>
            </div>
            <div className="col-span-6 border p-4 rounded-lg">
              <h3 className="text-2xl text-alt-green-300 font-semibold">
                Propiedades de interes del lead
              </h3>
            </div>
            <div className="col-span-6 border p-4 rounded-lg">
              <h3 className="text-2xl text-alt-green-300 font-semibold">
                Propiedades de interes del lead
              </h3>
            </div>
            <div className="col-span-6 border p-4 rounded-lg">
              <h3 className="text-2xl text-alt-green-300 font-semibold">
                Propiedades de interes del lead
              </h3>
            </div>
            <div className="col-span-6 border p-4 rounded-lg">
              <h3 className="text-2xl text-alt-green-300 font-semibold">
                Propiedades de interes del lead
              </h3>
            </div>

            <div className="sticky bottom-0 bg-alt-green-300 text-alt-green-900 col-span-6">
              Holaaa
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactView;
