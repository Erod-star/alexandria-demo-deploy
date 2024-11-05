import { useEffect } from 'react';
import Confetti from 'react-confetti';

// ? Hooks
import { useInventoryStore } from '../hooks';

// ? Components
import { InventoryWizard, UploadInventoryFile } from '../components';
import { Card } from '@/components';

const CreateInventoryView = () => {
  const { currentStep, resetInventoryWizard } = useInventoryStore();

  useEffect(() => {
    resetInventoryWizard();
  }, []);

  return (
    <Card className="relative w-full h-full border-none">
      {currentStep === 5 && <Confetti className="w-full h-full" />}

      {currentStep !== 0 ? <InventoryWizard /> : <UploadInventoryFile />}
    </Card>
  );
};

export default CreateInventoryView;
