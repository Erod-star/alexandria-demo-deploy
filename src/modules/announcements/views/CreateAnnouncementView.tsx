import { useParams } from 'react-router-dom';

// ? Components
import { Card, CardHeader, CardContent, CardTitle } from '@/components';
import { CreateAnnouncementForm } from '../components';
import { InventoryDetailCard } from '@/modules/inventory/components';

// ? Hooks
import { useInventory } from '@/modules/inventory/hooks';

const CreateAnnouncementView = () => {
  const params = useParams();

  const { inventory, isLoading } = useInventory({ id: params.id });

  return (
    <div className="flex h-full">
      <Card className="flex-grow border-none overflow-x-scroll">
        <CardHeader>
          <CardTitle>Creación de nueva publicación</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-7 gap-x-5">
          <InventoryDetailCard
            className="col-span-4 max-h-[44rem]"
            inventory={inventory}
            isLoading={isLoading}
          />

          <CreateAnnouncementForm className="col-span-3 max-h-[44rem]" />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAnnouncementView;
