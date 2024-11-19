export interface Inventory {
  inventoryId: string;

  // ? Direccion
  calleYNumero: string;
  colonia: string | null;
  estado: string | null;
  municipio: string | null;
  cp: number | null;
  googleMaps: string | null;

  // ? Detalles
  folioOriginal: string;
  lista: string;
  tipoPropiedad: string | null;
  recamaras: string | number | null;
  sanitarios: string | number | null;
  estacionamientos: string | number | null;
  terreno: string | number | null;
  construccion: string | number | null;

  // ? Pagos
  primerPago: number | null;
  segundoPago: number | null;
  valorAproximado: number | null;
  total: number | null;

  acreedor: string | null;
  alrededores: string | null;
  calificacion: string | null;
  cesion: string | null;
  contingencia: string | null;
  deudor: string | null;
  direccionOriginal: string | null;
  estadoDeVivienda: string | null;
  estadoProcesal: string | null;
  etapa: string | null;
  etapaProcesal: string | null;
  expediente: string | null;
  fichasUrls: string | null;
  fotosUrls: string | null;
  jurisdiccion: string | null;
  juzgado: string | null;
  latitud: string | null;
  longitud: string | null;
  ultimaActualizacion: string | null;

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface InventoryAddress {
  calleYNumero: string;
  colonia: string | null;
  estado: string | null;
  municipio: string | null;
  cp: number | null;
  googleMaps: string | null;
}

export interface InventoryDetails {
  folioOriginal: string;
  lista: string;
  tipoPropiedad: string | null;
  recamaras: number | null;
  sanitarios: number | null;
  estacionamientos: number | null;
  terreno: number | null;
  construccion: number | null;
}

export interface InventoryPayments {
  primerPago: number | null;
  segundoPago: number | null;
  total: number | null;
  valorAproximado: number | null;
}
