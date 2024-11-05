import { useEffect, useState } from 'react';

// ? Components
import { Button, CardContent, Progress } from '@/components';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { Step4 } from './Step4';
import { Step5 } from './Step5';

// ? Hooks
import { useInventoryStore } from '@/modules/inventory/hooks';

export const InventoryWizard = () => {
  const { currentStep, resetInventoryWizard } = useInventoryStore();

  const [title, setTitle] = useState('Ingresa la dirección de la propiedad');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentStep === 1) {
      setProgress(20);
      setTitle('Ingresa la dirección de la propiedad');
    } else if (currentStep === 2) {
      setProgress(45);
      setTitle('Ingresa los detalles de la propiedad');
    } else if (currentStep === 3) {
      setProgress(75);
      setTitle('Ingresa los detalles del pago');
    } else if (currentStep === 4) {
      setProgress(95);
      setTitle('Antes de concluir por favor revisa los datos');
    }
  }, [currentStep]);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(20), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CardContent className="flex flex-col h-full">
      {currentStep !== 0 && currentStep !== 5 && (
        <div className="w-full flex justify-end mt-5">
          <Button
            variant="destructive"
            // TODO: Deshabilitar el botón cuando se este cargando la creacion
            onClick={resetInventoryWizard}
          >
            Cancelar y generar por archivo
          </Button>
        </div>
      )}

      {currentStep !== 5 && (
        <div className="space-y-4 mt-5 sm:mt-0">
          <h2 className="text-3xl font-semibold">Creación manual</h2>

          <h3 className="text-xl">{title}</h3>

          <Progress
            className="bg-alt-green-900 border border-slate-500"
            value={progress}
          />
        </div>
      )}

      <div className="mt-8 h-full relative">
        {currentStep === 1 && <Step1 />}
        {currentStep === 2 && <Step2 />}
        {currentStep === 3 && <Step3 />}
        {currentStep === 4 && <Step4 />}
        {currentStep === 5 && <Step5 />}
      </div>
    </CardContent>
  );
};
