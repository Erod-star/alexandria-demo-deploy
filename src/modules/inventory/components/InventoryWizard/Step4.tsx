// ? Icons
import { SquarePen } from 'lucide-react';

// ? Components
import { Button, LoadingSpinner } from '@/components';
import { WizardOverviewDetailItem } from '../WizardOverviewDetailItem';

// ? Hooks
import { useInventoryMutations, useInventoryStore } from '../../hooks';

export const Step4 = () => {
  const {
    setPreviousStep,
    setNextStep,
    setCustomStep,
    wizardAddress,
    wizardDetails,
    wizardPayments,
  } = useInventoryStore();

  const { createMutation } = useInventoryMutations();
  const { isPending } = createMutation;

  const handleCreateInventory = async () => {
    if (!wizardAddress || !wizardDetails || !wizardPayments) return;
    const { calleYNumero, colonia, cp, municipio, estado } = wizardAddress;
    try {
      await createMutation.mutateAsync({
        ...wizardAddress,
        ...wizardDetails,
        ...wizardPayments,
        direccionOriginal: `${calleYNumero}, ${colonia}, #${cp}, ${municipio}, ${estado}`,

        fotosUrls: null,
        fichasUrls: null,
        alrededores: null,
        calificacion: null,
        latitud: null,
        longitud: null,
        etapa: null,
        estadoDeVivienda: null,
        deudor: null,
        acreedor: null,
        estadoProcesal: null,
        expediente: null,
        juzgado: null,
        jurisdiccion: null,
        contingencia: null,
        etapaProcesal: null,
        ultimaActualizacion: null,
        cesion: null,
      });
      setNextStep();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="space-y-7 mb-7">
        {wizardAddress && (
          <div className="px-5 pt-3 pb-7 border rounded-md bg-alt-green-800/55 grid grid-cols-4 md:grid-cols-3 gap-4 items-center">
            <div className="col-span-4 md:col-span-3 flex justify-between items-center h-12">
              <h3 className="uppercase font-bold text-lg">
                Direccion de la propiedad
              </h3>

              <Button
                className="h-8 px-2 md:h-10 md:px-4"
                disabled={isPending}
                onClick={() => setCustomStep(1)}
              >
                <SquarePen className="size-5 md:size-6" />
              </Button>
            </div>

            <WizardOverviewDetailItem
              className="col-span-4 sm:col-span-2 md:col-span-1"
              header="Calle y numero:"
              value={wizardAddress.calleYNumero}
            />

            <WizardOverviewDetailItem
              className="col-span-4 sm:col-span-2 md:col-span-1"
              header="Colonia:"
              value={wizardAddress.colonia}
            />

            <WizardOverviewDetailItem
              className="col-span-4 sm:col-span-2 md:col-span-1"
              header="Estado:"
              value={wizardAddress.estado}
            />

            <WizardOverviewDetailItem
              className="col-span-4 sm:col-span-2 md:col-span-1"
              header="Municipio:"
              value={wizardAddress.municipio}
            />

            <WizardOverviewDetailItem
              className="col-span-4 sm:col-span-2 md:col-span-1"
              header="Código postal:"
              value={wizardAddress.cp}
            />

            <WizardOverviewDetailItem
              className="col-span-4 md:col-span-3"
              header="Google Maps:"
              value={wizardAddress.googleMaps}
            />
          </div>
        )}

        {wizardDetails && (
          <div className="px-5 py-3 border rounded-md bg-alt-green-800/55 grid grid-cols-4 md:grid-cols-3 gap-4 items-center">
            <div className="col-span-4 md:col-span-3 flex justify-between items-center h-12">
              <h3 className="uppercase font-bold text-lg">
                Direccion de la propiedad
              </h3>

              <Button
                className="h-8 px-2 md:h-10 md:px-4"
                disabled={isPending}
                onClick={() => setCustomStep(2)}
              >
                <SquarePen />
              </Button>
            </div>

            <WizardOverviewDetailItem
              className="col-span-4 sm:col-span-2 md:col-span-1"
              header="Folio:"
              value={wizardDetails.folioOriginal}
            />

            <WizardOverviewDetailItem
              className="col-span-4 sm:col-span-2 md:col-span-1"
              header="Lista:"
              value={wizardDetails.lista}
            />

            <WizardOverviewDetailItem
              className="col-span-4 sm:col-span-2 md:col-span-1"
              header="Tipo de propiedad:"
              value={wizardDetails.tipoPropiedad}
            />

            <WizardOverviewDetailItem
              className="col-span-4 sm:col-span-2 md:col-span-1"
              header="Recamaras totales:"
              value={wizardDetails.recamaras}
            />

            <WizardOverviewDetailItem
              className="col-span-4 sm:col-span-2 md:col-span-1"
              header="Sanitarios totales:"
              value={wizardDetails.sanitarios}
            />

            <WizardOverviewDetailItem
              className="col-span-4 sm:col-span-2 md:col-span-1"
              header="Estacionamientos totales:"
              value={wizardDetails.estacionamientos}
            />

            <WizardOverviewDetailItem
              className="col-span-4 sm:col-span-2 md:col-span-1"
              header="Terreno total:"
              value={wizardDetails.terreno}
            />

            <WizardOverviewDetailItem
              className="col-span-4 sm:col-span-2 md:col-span-1"
              header="Terreno construido:"
              value={wizardDetails.construccion}
            />
          </div>
        )}

        {wizardPayments && (
          <div className="px-5 pt-3 pb-7 border rounded-md bg-alt-green-800/55 grid col-span-4 md:col-span-3 gap-4 items-center">
            <div className="col-span-4 md:col-span-3 flex justify-between items-center h-12">
              <h3 className="uppercase font-bold text-lg">Pagos</h3>

              <Button
                className="h-8 px-2 md:h-10 md:px-4"
                disabled={isPending}
                onClick={() => setCustomStep(3)}
              >
                <SquarePen />
              </Button>
            </div>

            <WizardOverviewDetailItem
              className="col-span-4 sm:col-span-2 md:col-span-1"
              header="Primer pago:"
              value={wizardPayments.primerPago}
            />

            <WizardOverviewDetailItem
              className="col-span-4 sm:col-span-2 md:col-span-1"
              header="Segundo pago:"
              value={wizardPayments.segundoPago}
            />

            <WizardOverviewDetailItem
              className="col-span-4 sm:col-span-2 md:col-span-1"
              header="Valor aproximado:"
              value={wizardPayments.valorAproximado}
            />

            <WizardOverviewDetailItem
              className="col-span-4 sm:col-span-2 md:col-span-1"
              header="Total:"
              value={wizardPayments.total}
            />
          </div>
        )}
      </div>

      <div className="flex justify-end gap-4 pb-8">
        <Button disabled={isPending} onClick={setPreviousStep}>
          Anterior
        </Button>
        <Button
          className="w-32"
          disabled={isPending}
          onClick={handleCreateInventory}
        >
          {isPending ? (
            <LoadingSpinner className="size-4" />
          ) : (
            'Crear inventario'
          )}
        </Button>
      </div>
    </>
  );
};
