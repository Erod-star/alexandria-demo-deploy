// ? Types
import type { Announcement } from '@/modules/announcements/types';

export interface Lead {
  leadId: string;
  nombre: string;
  telefono: string;
  correo: string;
  mensaje: string;
  fechaContacto: string;
  tipoAnuncio: string;
  idAnuncio: string;
  announcementId?: string;
  announcements?: Announcement[];
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
  deletedAt?: string | Date | null;
}
