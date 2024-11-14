// ? Types
import type { Lead } from '@/modules/leads/types';
import type { User } from '@/modules/users/types';

export interface Interaction {
  interactionId: string;
  interactionNotes: string;
  interactionDate: Date;
  interactionDuration: number;
  interactionStatus: boolean;
  nextContactDate: Date;
  scheduledMeeting: boolean;
  meetingDate: Date;
  user: User;
  lead: Lead;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}
