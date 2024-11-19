// ? Components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  TableSkeleton,
} from '@/components';
import { AnnouncementsTable, announcementColumns } from '../components';

// ? Hooks
import { useAnnouncements } from '../hooks';

const AnnouncementsView = () => {
  const { announcements, isLoading } = useAnnouncements();

  return (
    <div className="flex h-full">
      <Card className="flex-grow h-full border-none">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="py-2">Publicaciones</CardTitle>
        </CardHeader>

        <CardContent className="w-screen md:w-auto">
          {isLoading ? (
            <TableSkeleton amountOfFilters={0} />
          ) : (
            <AnnouncementsTable
              columns={announcementColumns}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              data={announcements as any}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementsView;
