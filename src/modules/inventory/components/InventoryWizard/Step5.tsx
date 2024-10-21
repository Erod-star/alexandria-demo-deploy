import { useNavigate } from 'react-router-dom';

// ? Components
import { Button } from '@/components';
import { useInventoryStore } from '../../hooks';

export const Step5 = () => {
  const navigate = useNavigate();
  const { resetInventoryWizard } = useInventoryStore();

  return (
    <div className="flex-center flex-col gap-8 h-full animate-fade-in">
      <h2 className="text-4xl font-semibold">
        🎉 ¡Inventario creado exitosamente! 🎉
      </h2>

      <div className="flex flex-col gap-3">
        <Button
          onClick={() => {
            resetInventoryWizard();
          }}
        >
          Crear otro inventario
        </Button>
        <Button
          onClick={() => {
            navigate('/inventario');
            resetInventoryWizard();
          }}
        >
          Volver a la lista de inventarios
        </Button>
      </div>
    </div>
  );
};
