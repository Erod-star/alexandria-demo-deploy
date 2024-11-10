// ? Components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  TableSkeleton,
} from '@/components';
// import { AnnouncementsTable } from '../components';

// ? Hooks
import { useAnnouncements } from '../hooks';

const AnnouncementsView = () => {
  const { announcements, isLoading } = useAnnouncements();

  return (
    <div className="flex h-full">
      <Card className="flex-grow h-full border-none overflow-x-scroll">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Publicaciones</CardTitle>
        </CardHeader>

        <CardContent className="w-screen md:w-auto md:overflow-scroll">
          {isLoading ? (
            <TableSkeleton amountOfFilters={0} />
          ) : (
            // <AnnouncementsTable />
            announcements.map(({ announcementId }) => (
              <p key={announcementId}>{announcementId}</p>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementsView;
