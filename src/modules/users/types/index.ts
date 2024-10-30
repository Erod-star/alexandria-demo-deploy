export interface User {
  userId: string;
  nombre: string;
  apellido: string;
  telefono: string;
  rol: Department;
  correoPersonal: string;
  correoEmpresarial?: string;
  calificacion?: number;
  recompensas?: null;
}

export type Department =
  | 'Marketing'
  | 'Juridico'
  | 'Ventas'
  | 'Gerencia'
  | 'Dirección'
  | 'Admin'
  | 'Client'
  | 'Asistencia'
  | 'Seguimiento';
