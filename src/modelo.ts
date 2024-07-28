export interface Carta {
  idFoto: number;
  imagen: string;
  estaVuelta: boolean;
  encontrada: boolean;
}

export interface InfoCarta {
  idFoto: number;
  imagen: string;
}

export type EstadoPartida =
  | 'PartidaNoIniciada'
  | 'CeroCartasLevantadas'
  | 'UnaCartaLevantada'
  | 'DosCartasLevantadas'
  | 'PartidaCompleta';

export interface Tablero {
  cartas: Carta[];
  estadoPartida: EstadoPartida;
  indiceCartaVolteadaA?: number;
  indiceCartaVolteadaB?: number;
  numIntentos: number;
}

export const infoCartas: InfoCarta[] = [
  {
    idFoto: 1,
    imagen: 'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png',
  },
  {
    idFoto: 2,
    imagen: 'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png',
  },
  {
    idFoto: 3,
    imagen: 'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/3.png',
  },
  {
    idFoto: 4,
    imagen: 'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/4.png',
  },
  {
    idFoto: 5,
    imagen: 'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/5.png',
  },
  {
    idFoto: 6,
    imagen: 'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/6.png',
  },
];

export const crearCartaInicial = (idFoto: number, imagen: string): Carta => ({
  idFoto,
  imagen,
  estaVuelta: false,
  encontrada: false,
});

export const crearColeccionDeCartasInicial = (infoCartas: InfoCarta[]): Carta[] => {
  let coleccionDeCartasInicial = JSON.parse(JSON.stringify(infoCartas)).map(
    (infocarta: InfoCarta) => {
      return crearCartaInicial(infocarta.idFoto, infocarta.imagen);
    }
  );

  coleccionDeCartasInicial = [...coleccionDeCartasInicial, ...coleccionDeCartasInicial];

  return coleccionDeCartasInicial;
};

export let cartas: Carta[] = crearColeccionDeCartasInicial(infoCartas);

export const crearTableroInicial = (): Tablero => ({
  cartas: cartas,
  estadoPartida: 'PartidaNoIniciada',
  numIntentos: 0,
});

export let tablero: Tablero = crearTableroInicial();
