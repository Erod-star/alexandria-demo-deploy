import { useEffect } from 'react';
import Confetti from 'react-confetti';

// ? Hooks
import { useInventoryStore } from '../hooks';

// ? Components
import { InventoryWizard, UploadInventoryFile } from '../components';
import { Button } from '@/components';

const CreateInventoryView = () => {
  const { currentStep, resetInventoryWizard } = useInventoryStore();

  useEffect(() => {
    resetInventoryWizard();
  }, []);

  return (
    <div className="relative w-full h-full border rounded-md p-5 overflow-auto">
      {currentStep === 5 && <Confetti className="w-full h-full" />}

      {currentStep !== 0 && currentStep !== 5 && (
        <Button
          className="absolute right-5"
          variant="destructive"
          // TODO: Deshabilitar el botón cuando se este cargando la creacion
          onClick={resetInventoryWizard}
        >
          Cancelar y generar por archivo
        </Button>
      )}

      {currentStep !== 0 ? <InventoryWizard /> : <UploadInventoryFile />}
    </div>
  );
};

export default CreateInventoryView;
