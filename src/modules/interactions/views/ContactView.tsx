import { useParams } from 'react-router-dom';
import { withAuthInfo, WithAuthInfoProps } from '@propelauth/react';

// ? Components
import { Card, CardContent, CardHeader, CardTitle } from '@/components';
import {
  announcementWithInventoriesColumns,
  AnnouncementWithInventoriesTable,
  CreateInteractionForm,
  LeadIteracionsCard,
  PreviousInteractions,
} from '@/modules/interactions/components';

// ? Hooks
import { useInteractions } from '../hooks';
import { useLead } from '@/modules/leads/hooks';
import { useUser } from '@/modules/users/hooks';

export const ContactView = withAuthInfo(({ user }: WithAuthInfoProps) => {
  const params = useParams<{ leadId: string }>();

  const { lead, isLoading } = useLead({
    id: params.leadId,
  });

  const { currentUserId } = useUser({
    propelAuthId: user?.userId,
  });

  const { interactions } = useInteractions({
    leadId: lead?.leadId,
    userId: currentUserId,
  });

  return (
    <div className="flex h-full">
      <Card className="flex-grow h-full border-none">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="py-2">Detalles del contacto</CardTitle>
        </CardHeader>

        <CardContent className="w-screen md:w-auto">
          <div className="grid grid-cols-6 gap-5 relative">
            <LeadIteracionsCard
              className="col-span-2"
              isLoading={isLoading}
              lead={lead}
            />

            <div className="col-span-4 border p-4 rounded-lg space-y-5">
              <PreviousInteractions
                interactions={interactions}
                isLoading={isLoading}
              />
            </div>

            <div className="col-span-6 border p-4 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">
                Propiedades de interes del lead
              </h3>

              {lead?.announcements && (
                <AnnouncementWithInventoriesTable
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  data={lead.announcements as any}
                  columns={announcementWithInventoriesColumns}
                />
              )}
            </div>

            <CreateInteractionForm
              className="col-span-6 border p-4 rounded-lg space-y-4"
              userId={currentUserId}
              leadId={lead?.leadId}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

export default ContactView;
