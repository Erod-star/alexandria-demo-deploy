import { useParams } from 'react-router-dom';
import { withAuthInfo, type WithAuthInfoProps } from '@propelauth/react';

// ? Components
import { Card, CardHeader, CardContent, CardTitle } from '@/components';
import { CreateAnnouncementForm } from '../components';
import { InventoryDetailCard } from '@/modules/inventory/components';

// ? Hooks
import { useInventory } from '@/modules/inventory/hooks';
import { useUser } from '@/modules/users/hooks';

const CreateAnnouncementView = withAuthInfo(({ user }: WithAuthInfoProps) => {
  const params = useParams();

  const { inventory, isLoading } = useInventory({ id: params.id });
  const { currentUserId } = useUser({ propelAuthId: user?.userId });

  return (
    <div className="flex h-full">
      <Card className="flex-grow border-none">
        <CardHeader>
          <CardTitle>Creación de nueva publicación</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-7 gap-x-5">
          <InventoryDetailCard
            className="col-span-4 max-h-[40rem]"
            inventory={inventory}
            isLoading={isLoading}
          />

          <CreateAnnouncementForm
            className="col-span-3 max-h-[40rem]"
            inventoryId={params.id}
            userId={currentUserId}
          />
        </CardContent>
      </Card>
    </div>
  );
});

export default CreateAnnouncementView;
