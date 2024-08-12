import { Tablero, tablero, Carta } from './modelo';
import {
  iniciaPartida,
  sePuedeVoltearLaCarta,
  voltearLaCarta,
  sonPareja,
  esPartidaCompleta,
} from './motor';

export const crearTablero = () => {
  for (let i = 0; i < tablero.cartas.length; i++) {
    crearDivs(tablero, i);
  }
};

export const crearDivs = (tablero: Tablero, indice: number) => {
  const idImagen = `[data-indice-imagen='${indice}']`;
  const idCarta = `[data-indice-array='${indice}']`;
  const cartaDiv = document.querySelector(`div${idCarta}`);
  const img = document.querySelector(`img${idImagen}`);
  if (cartaDiv && cartaDiv instanceof HTMLDivElement && img && img instanceof HTMLImageElement) {
    cartaDiv.addEventListener('click', () => {
      if (tablero.estadoPartida !== 'PartidaNoIniciada') {
        handler(tablero, indice, img);
      }
    });
  }
};

export const handler = (tablero: Tablero, indice: number, img: HTMLImageElement) => {
  if (sePuedeVoltearLaCarta(tablero, indice)) {
    ocultarMensaje();
    voltearLaCarta(tablero, indice);
    crearImagenCarta(tablero, indice, img);
    esSegundaCarta(tablero);
  } else {
    mostrarMensajeCartaYaVolteada(tablero, indice);
  }
};

export const mostrarMensajeCartaYaVolteada = (tablero: Tablero, indice: number) => {
  if (
    (tablero.cartas[indice].estaVuelta && tablero.estadoPartida == 'UnaCartaLevantada') ||
    (tablero.cartas[indice].estaVuelta && tablero.estadoPartida == 'DosCartasLevantadas')
  ) {
    mostrarMensaje('Carta ya volteada, pulse otra');
  }
};
export const crearImagenCarta = (tablero: Tablero, indice: number, img: HTMLImageElement) => {
  let urlImagen = tablero.cartas[indice].imagen;
  img.src = urlImagen;
  img.style.display = 'block';
  img.style.transform = 'rotateY(180deg)';
  img.style.transformStyle = 'preserve-3d';
  img.style.backgroundColor = 'rgb(215 123 209)';
  img.style.backfaceVisibility = 'visible';
};

export const esSegundaCarta = (tablero: Tablero) => {
  const indiceA = tablero.indiceCartaVolteadaA;
  const indiceB = tablero.indiceCartaVolteadaB;
  if (
    indiceA !== undefined &&
    indiceB !== undefined &&
    tablero.estadoPartida === 'DosCartasLevantadas'
  ) {
    if (sonPareja(indiceA, indiceB, tablero)) {
      mostrarMensajeSiPartidaCompleta(tablero);
    } else {
      voltearCartasParejaIncorrecta(tablero.cartas);
    }
    mostrarNumIntentos(tablero.numIntentos);
  }
};

export const mostrarMensajeSiPartidaCompleta = (tablero: Tablero) => {
  if (esPartidaCompleta(tablero)) {
    mostrarMensaje('¡Lo lograste, fin de la partida!🕺🥳');
  }
};

export const mostrarMensaje = (mensaje: string) => {
  const idMensaje = document.getElementById('idMensaje');
  if (idMensaje && idMensaje instanceof HTMLDivElement) {
    idMensaje.style.display = 'block';
    idMensaje.innerHTML = mensaje;
  }
};

export const ocultarMensaje = (): void => {
  const idMensaje = document.getElementById('idMensaje');
  if (idMensaje && idMensaje instanceof HTMLDivElement) {
    idMensaje.style.display = 'none';
  }
};

export const voltearCartas = (cartas: Carta[]) => {
  setTimeout(() => {
    for (let i = 0; i < cartas.length; i++) {
      voltearCarta(i);
    }
  }, 100);
};

export const voltearCarta = (indice: number) => {
  const idImagen = `[data-indice-imagen='${indice}']`;
  const img = document.querySelector(`img${idImagen}`);
  if (idImagen && img instanceof HTMLImageElement) {
    img.style.transform = '';
    img.style.transition = '';
    img.style.backgroundColor = '#67b4fc';
    img.style.backfaceVisibility = 'hidden';
  }
};

export const voltearCartasParejaIncorrecta = (cartas: Carta[]) => {
  setTimeout(() => {
    for (let i = 0; i < cartas.length; i++) {
      if (!cartas[i].encontrada && !cartas[i].estaVuelta) {
        voltearCarta(i);
      }
    }
  }, 500);
};

export const cambiarAparienciaTablero = () => {
  const botonEmpezarPartida = document.getElementById('iniciarPartidaBoton');
  if (botonEmpezarPartida && botonEmpezarPartida instanceof HTMLButtonElement) {
    botonEmpezarPartida.style.backgroundColor = 'rgb(111, 4, 141)';
  }
  const app = document.getElementById('app');
  if (app && app instanceof HTMLElement) {
    app.style.backgroundColor = 'white';
    app.style.borderImageSource = 'linear-gradient(indigo, purple, hotpink)';
    app.style.borderImageSlice = '1 1 1 1';
    app.style.borderImageWidth = '0.75rem';
  }
  const cartas: NodeListOf<HTMLElement> = document.querySelectorAll('.carta');
  const images: NodeListOf<HTMLElement> = document.querySelectorAll('.img-carta');

  cartas.forEach((carta) => {
    carta.style.height = '120px';
  });

  images.forEach((img) => {
    img.style.height = '120px';
  });
};

export const mostrarNumIntentos = (intentos: number): void => {
  const idNumIntentos = document.getElementById('idNumIntentos');
  if (idNumIntentos && idNumIntentos instanceof HTMLElement) {
    idNumIntentos.innerHTML = intentos.toString();
  }
};

export const accionesIniciarPartida = (tablero: Tablero): void => {
  iniciaPartida(tablero);
  cambiarAparienciaTablero();
  voltearCartas(tablero.cartas);
  ocultarMensaje();
  mostrarNumIntentos(tablero.numIntentos);
};
