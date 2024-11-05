// ? Types
import type { Inventory } from '@/modules/inventory/types';
import type { User } from '@/modules/users/types';

export interface Announcement {
  announcementId: string;
  proppitId: string;
  proppitLink: string;
  inmueblesId: string;
  inmueblesLink: string;
  meliId: string;
  meliLink: string;
  inventory: Inventory;
  user: User;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  deletedAt?: string | Date;
}
