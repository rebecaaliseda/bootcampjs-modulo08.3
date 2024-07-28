import 'vitest';
import {
  contarNumIntentos,
  barajarCartas,
  voltearLaCarta,
  esPartidaCompleta,
  sePuedeVoltearLaCarta,
} from './motor';

import { cartas, tablero, Tablero } from './modelo';

describe('contarNumIntentos', () => {
  it('Deberá devolver 1', () => {
    //arrange
    const numEsperado: number = 1;
    //act
    contarNumIntentos(tablero);
    const result = tablero.numIntentos;
    //assert
    expect(result).toBe(numEsperado);
  });
});

describe('voltearLaCarta', () => {
  const tablero: Tablero = {
    cartas: barajarCartas(cartas),
    estadoPartida: 'CeroCartasLevantadas',
    numIntentos: 0,
  };

  it('Deberá devolver "UnaCartaLevantada"', () => {
    //Arrange
    const estadoEsperado = 'UnaCartaLevantada';
    const id = 7;
    //Act
    voltearLaCarta(tablero, id);
    const result = tablero.estadoPartida;

    //Asssert
    expect(result).toBe(estadoEsperado);
  });
  it('Deberia devolver "DosCartasLevantadas"', () => {
    //Arrange
    const estadoEsperado = 'DosCartasLevantadas';
    const id = 11;

    //Act
    voltearLaCarta(tablero, id);
    const result = tablero.estadoPartida;

    //Asssert
    expect(result).toBe(estadoEsperado);
  });
});

describe('sePuedeVoltearLaCarta', () => {
  it('Deberá devolver el boolean a true', () => {
    //Arrange
    const id: number = 3;
    const resultadoEsperado: boolean = true;
    tablero.cartas[id - 1].encontrada = false;
    tablero.cartas[id - 1].estaVuelta = false;
    //Act
    const result = sePuedeVoltearLaCarta(tablero, id);
    //Assert
    expect(result).toBe(resultadoEsperado);
  });

  it('Deberá devolver el boolean a false', () => {
    //Arrange
    const id: number = 7;
    const resultadoEsperado: boolean = false;
    tablero.cartas[id - 1].encontrada = true;
    tablero.cartas[id - 1].estaVuelta = true;
    //Act
    const result = sePuedeVoltearLaCarta(tablero, id);
    //Assert
    expect(result).toBe(resultadoEsperado);
  });
});

describe('esPartidaCompleta', () => {
  it('Deberá devolver el boolean a true', () => {
    //Arrange
    tablero.cartas.forEach((carta) => {
      carta.encontrada = true;
    });
    const resultadoEsperado: boolean = true;
    //Act
    const result: boolean = esPartidaCompleta(tablero);
    //Assert
    expect(result).toBe(resultadoEsperado);
  });

  it('Deberá devolver el boolean a false', () => {
    //Arrange
    tablero.cartas.forEach((carta) => {
      carta.encontrada = false;
    });
    tablero.cartas[1].encontrada = true;
    const resultadoEsperado: boolean = false;
    //Act
    const result = esPartidaCompleta(tablero);
    //Assert
    expect(result).toBe(resultadoEsperado);
  });
});
