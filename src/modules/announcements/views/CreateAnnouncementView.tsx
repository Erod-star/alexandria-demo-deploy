import { useParams } from 'react-router-dom';

// ? Components
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  Skeleton,
} from '@/components';

// ? Hooks
import { useInventory } from '@/modules/inventory/hooks';

const CreateAnnouncementView = () => {
  const params = useParams();

  const { inventory, isLoading } = useInventory({ id: params.id });

  return (
    <div className="flex h-full">
      <Card className="flex-grow h-full border-none overflow-x-scroll">
        <CardHeader>
          <CardTitle>Creación de nueva publicación</CardTitle>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <Skeleton className="w-full h-5" />
          ) : (
            <p>{inventory?.calleYNumero}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAnnouncementView;
