import { useNavigate } from 'react-router-dom';

// ? Components
import { Button, Separator } from '@/components';
import { useInventoryStore } from '../../hooks';

export const Step5 = () => {
  const navigate = useNavigate();
  const { resetInventoryWizard } = useInventoryStore();

  return (
    <div className="flex-center flex-col gap-8 h-full animate-fade-in">
      <h2 className="text-3xl lg:text-4xl text-center font-semibold mb-5">
        🎉 ¡Inventario creado exitosamente! 🎉
      </h2>

      <div className="flex flex-col gap-3 md:gap-5">
        <Button
          onClick={() => {
            resetInventoryWizard();
          }}
        >
          Crear otra propiedad
        </Button>

        <div className="flex-center gap-5 w-full overflow-hidden text-xl">
          <Separator /> ó <Separator />
        </div>

        <Button
          onClick={() => {
            navigate('/inventario');
            resetInventoryWizard();
          }}
        >
          Volver a la lista de propiedades
        </Button>
      </div>
    </div>
  );
};
