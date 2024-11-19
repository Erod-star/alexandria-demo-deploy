// ? Types
import type { Lead } from '@/modules/leads/types';
import type { Inventory } from '@/modules/inventory/types';

export interface Announcement {
  announcementId: string;
  proppitId: string;
  proppitLink: string;
  inmueblesId: string;
  inmueblesLink: string;
  meliId: string;
  meliLink: string;
  inventory: Inventory;
  leads: Lead[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
  deletedAt?: string | Date;
}
