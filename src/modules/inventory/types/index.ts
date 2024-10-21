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

/*
        {
            "inventoryId": "87e7dbf3-eb59-4449-9944-7b8198e13a20",
            "lista": "BBVAClassic",
            "fotosUrls": null,
            "fichasUrls": null,
            "folioOriginal": "86228",
            "tipoPropiedad": "Local Comercial",
            "calleYNumero": "Calle Ave. Constitucion Número 1966",
            "colonia": "Luis Donaldo Colosio",
            "municipio": "San Pedro, Coah",
            "estado": "Coahuila",
            "cp": "27838",
            "construccion": "188.2",
            "terreno": "352",
            "recamaras": "3",
            "sanitarios": "2.5",
            "estacionamientos": "2",
            "primerPago": "777000",
            "segundoPago": null,
            "total": "777000",
            "valorAproximado": null,
            "alrededores": null,
            "googleMaps": "https://www.google.com/maps/search/?api=1&query=Calle+Ave.+Constitucion+Número+1966,+Luis+Donaldo+Colosio,+San+Pedro,+Coah,+Coahuila,+27838",
            "calificacion": null,
            "latitud": null,
            "longitud": null,
            "etapa": "Classic",
            "estadoDeVivienda": null,
            "direccionOriginal": "Ave. Constitucion Num. 1966, L-12 Y 13, Mza-7 Luis Donaldo Colosio",
            "deudor": null,
            "acreedor": null,
            "estadoProcesal": null,
            "expediente": null,
            "juzgado": null,
            "jurisdiccion": null,
            "contingencia": null,
            "etapaProcesal": null,
            "ultimaActualizacion": null,
            "cesion": null,
            "createdAt": "2024-10-14T18:40:04.357Z",
            "updatedAt": "2024-10-14T18:40:04.357Z",
            "deletedAt": null
        },
*/
