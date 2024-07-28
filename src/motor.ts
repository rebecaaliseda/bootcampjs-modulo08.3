import { Carta, Tablero } from './modelo';

export const generarNumeroAleatorio = (idArray: number) =>
  Math.floor(Math.random() * (idArray + 1));

export const barajarCartas = (cartas: Carta[]): Carta[] => {
  for (let id = cartas.length - 1; id > 0; id--) {
    let idArrayAleatorio = generarNumeroAleatorio(id);
    [{ ...cartas[id] }, { ...cartas[idArrayAleatorio] }] = [cartas[idArrayAleatorio], cartas[id]];
  }
  return cartas;
};

export const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number): boolean => {
  return tablero.estadoPartida !== 'DosCartasLevantadas' && !tablero.cartas[indice].estaVuelta
    ? true
    : false;
};

export const voltearLaCartaA = (tablero: Tablero, id: number) => {
  tablero.indiceCartaVolteadaA = id;
  tablero.estadoPartida = 'UnaCartaLevantada';
  tablero.cartas[id].estaVuelta = true;
};

export const voltearLaCartaB = (tablero: Tablero, id: number) => {
  tablero.indiceCartaVolteadaB = id;
  tablero.estadoPartida = 'DosCartasLevantadas';
  tablero.cartas[id].estaVuelta = true;
};

export const voltearLaCarta = (tablero: Tablero, id: number): void => {
  if (tablero.estadoPartida === 'CeroCartasLevantadas') {
    voltearLaCartaA(tablero, id);
  } else if (tablero.estadoPartida === 'UnaCartaLevantada') {
    voltearLaCartaB(tablero, id);
  }
};

export const reasignarIndiceCartas = (tablero: Tablero): void => {
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
};

export const contarDesdeCeroNumIntentos = (tablero: Tablero) => (tablero.numIntentos = 0);

export const contarNumIntentos = (tablero: Tablero) => ++tablero.numIntentos;

export const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
  tablero.estadoPartida = 'CeroCartasLevantadas';
  tablero.cartas[indiceA].estaVuelta = true;
  tablero.cartas[indiceB].estaVuelta = true;
  reasignarIndiceCartas(tablero);
  contarNumIntentos(tablero);
};

export const parejaNoEncontrada = (tablero: Tablero, indiceA: number, indiceB: number): void => {
  tablero.cartas[indiceA].encontrada = false;
  tablero.cartas[indiceB].encontrada = false;
  tablero.estadoPartida = 'CeroCartasLevantadas';
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;
  reasignarIndiceCartas(tablero);
  contarNumIntentos(tablero);
};

export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
  if (tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto) {
    parejaEncontrada(tablero, indiceA, indiceB);
    return true;
  } else {
    parejaNoEncontrada(tablero, indiceA, indiceB);
    return false;
  }
};

export const esPartidaCompleta = (tablero: Tablero): boolean =>
  tablero.cartas.every((carta) => carta.encontrada);

export const iniciaPartida = (tablero: Tablero): void => {
  const cartasBarajadas = barajarCartas(tablero.cartas);
  reasignarIndiceCartas(tablero);
  contarDesdeCeroNumIntentos(tablero);
  tablero.cartas.forEach((carta) => {
    carta.estaVuelta = false;
    carta.encontrada = false;
  });
  tablero.estadoPartida = 'CeroCartasLevantadas';
  tablero.cartas = [...cartasBarajadas];
};
